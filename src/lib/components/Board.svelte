<script lang="ts">
  import Card from "./Card.svelte"
  import CardModal from "./CardModal.svelte"

  type Column = {
    id: string
    title: string
    cards: Card[]
  }

  type Card = {
    id: string
    title: string
    description: string
    responsable: string
    tipo: string
    comentarios: Comment[]
  }

  type Comment = {
    id: string
    autor: string
    texto: string
    fecha: string
  }

  let columns: Column[] = [
    { id: "todo", title: "Por hacer", cards: [] },
    { id: "in-progress", title: "En progreso", cards: [] },
    { id: "review", title: "En revisión", cards: [] },
    { id: "done", title: "Completado", cards: [] },
  ]

  let draggedCardId: string | null = null
  let draggedFromColumnId: string | null = null
  let dropTargetIndex: number | null = null
  let isModalOpen = false
  let selectedCard: Card | null = null

  function handleDragStart(cardId: string, columnId: string) {
    draggedCardId = cardId
    draggedFromColumnId = columnId
  }

  function handleDragEnd() {
    draggedCardId = null
    draggedFromColumnId = null
    dropTargetIndex = null
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault()
  }

  function handleCardDragOver(event: DragEvent, cardIndex: number) {
    event.preventDefault()
    event.stopPropagation()
    dropTargetIndex = cardIndex
  }

  function handleColumnDragOver(event: DragEvent) {
    event.preventDefault()
    dropTargetIndex = null // Reset to end of column
  }

  function handleDrop(columnId: string) {
    if (draggedCardId && draggedFromColumnId) {
      const fromColumn = columns.find((col) => col.id === draggedFromColumnId)
      const toColumn = columns.find((col) => col.id === columnId)

      if (fromColumn && toColumn) {
        const cardIndex = fromColumn.cards.findIndex(
          (card) => card.id === draggedCardId
        )

        if (cardIndex !== -1) {
          const [card] = fromColumn.cards.splice(cardIndex, 1)

          if (columnId === draggedFromColumnId) {
            // Reordenar dentro de la misma columna
            const insertIndex =
              dropTargetIndex !== null
                ? dropTargetIndex
                : fromColumn.cards.length
            fromColumn.cards.splice(insertIndex, 0, card)
          } else {
            // Mover a otra columna
            const insertIndex =
              dropTargetIndex !== null ? dropTargetIndex : toColumn.cards.length
            toColumn.cards.splice(insertIndex, 0, card)
          }

          columns = [...columns]
        }
      }
    }

    draggedCardId = null
    draggedFromColumnId = null
    dropTargetIndex = null
  }

  function addCard(columnId: string) {
    const column = columns.find((col) => col.id === columnId)
    if (column) {
      const newCard: Card = {
        id: crypto.randomUUID(),
        title: "Nueva tarea",
        description: "Descripción de la tarea",
        responsable: "",
        tipo: "tarea",
        comentarios: [],
      }
      column.cards = [...column.cards, newCard]
      columns = [...columns]
    }
  }

  function openCardModal(card: Card) {
    selectedCard = card
    isModalOpen = true
  }

  function closeModal() {
    isModalOpen = false
    selectedCard = null
  }

  function saveCard(event: CustomEvent<Card>) {
    const updatedCard = event.detail
    const column = columns.find((col) =>
      col.cards.some((card) => card.id === updatedCard.id)
    )

    if (column) {
      const cardIndex = column.cards.findIndex(
        (card) => card.id === updatedCard.id
      )
      if (cardIndex !== -1) {
        column.cards[cardIndex] = updatedCard
        columns = [...columns]
      }
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="board">
  {#each columns as column}
    <section
      data-column-id={column.id}
      on:dragover={handleColumnDragOver}
      on:drop={() => handleDrop(column.id)}
    >
      <header>
        <h2>{column.title}</h2>
        <button type="button" on:click={() => addCard(column.id)}
          >+ Añadir tarjeta</button
        >
      </header>
      <div>
        {#each column.cards as card, index}
          <div
            class="card-wrapper"
            draggable="true"
            class:dragging={draggedCardId === card.id}
            on:dragstart={() => handleDragStart(card.id, column.id)}
            on:dragend={handleDragEnd}
            on:dragover={(e) => handleCardDragOver(e, index)}
          >
            <Card
              id={card.id}
              title={card.title}
              description={card.description}
              responsable={card.responsable}
              tipo={card.tipo}
              comentarios={card.comentarios}
              on:click={() => openCardModal(card)}
            />
          </div>
        {/each}
      </div>
    </section>
  {/each}
</div>

<CardModal
  bind:isOpen={isModalOpen}
  card={selectedCard}
  on:close={closeModal}
  on:save={saveCard}
/>

<style>
  .board {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    min-height: 100vh;
    background: var(--color-bg-main);
  }

  section {
    flex: 1;
    min-width: 17.5rem;
    background: var(--color-bg-column);
    border-radius: var(--radius-sm);
    padding: 0.5rem;
    border: 1px solid var(--color-border-primary);
  }

  header {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header h2 {
    font-size: var(--font-size-lg);
    margin: 0;
    color: var(--color-text-primary);
  }

  header button {
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    transition: var(--transition-base);
  }

  header button:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text-primary);
  }

  section > div {
    min-height: 6.25rem;
  }

  .card-wrapper {
    position: relative;
    margin-bottom: 0.5rem;
    transition: var(--transition-base);
  }

  .card-wrapper:hover {
    transform: translateY(-0.1rem);
  }

  .card-wrapper.dragging {
    opacity: 0.25;
    transform: rotate(1deg);
  }

  :global(.dragging .card-wrapper) {
    cursor: grabbing;
  }
</style>
