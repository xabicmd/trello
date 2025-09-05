<script lang="ts">
  import { createEventDispatcher } from "svelte"

  export let isOpen = false
  export let card: Card | null = null

  const dispatch = createEventDispatcher()

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

  let formData = {
    title: "",
    description: "",
    responsable: "",
    tipo: "tarea",
  }

  let nuevoComentario = {
    autor: "",
    texto: "",
  }

  $: if (card) {
    formData = {
      title: card.title,
      description: card.description,
      responsable: card.responsable || "",
      tipo: card.tipo || "tarea",
    }
  }

  function closeModal() {
    isOpen = false
    dispatch("close")
  }

  function handleSubmit() {
    if (card) {
      const updatedCard = {
        ...card,
        ...formData,
      }
      dispatch("save", updatedCard)
      closeModal()
    }
  }

  function addComment() {
    if (nuevoComentario.autor && nuevoComentario.texto && card) {
      const comment: Comment = {
        id: crypto.randomUUID(),
        autor: nuevoComentario.autor,
        texto: nuevoComentario.texto,
        fecha: new Date().toLocaleString("es-ES"),
      }

      const updatedCard = {
        ...card,
        comentarios: [...(card.comentarios || []), comment],
      }

      dispatch("save", updatedCard)

      // Reset form
      nuevoComentario = {
        autor: "",
        texto: "",
      }
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }
</script>

{#if isOpen}
  <div
    class="modal-backdrop"
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === "Escape" && closeModal()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h2>Editar Tarea</h2>
        <button
          class="close-button"
          on:click={closeModal}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>

      <form on:submit|preventDefault={handleSubmit} class="modal-form">
        <div class="form-group">
          <label for="title">Nombre de la tarea</label>
          <input
            id="title"
            type="text"
            bind:value={formData.title}
            placeholder="Ingresa el nombre de la tarea"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea
            id="description"
            bind:value={formData.description}
            placeholder="Describe la tarea en detalle"
            rows="3"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="responsable">Responsable</label>
            <input
              id="responsable"
              type="text"
              bind:value={formData.responsable}
              placeholder="Nombre del responsable"
            />
          </div>

          <div class="form-group">
            <label for="tipo">Tipo</label>
            <select id="tipo" bind:value={formData.tipo}>
              <option value="tarea">Tarea</option>
              <option value="bug">Bug</option>
              <option value="mejora">Mejora</option>
              <option value="investigacion">Investigación</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" on:click={closeModal} class="btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn-primary"> Guardar </button>
        </div>
      </form>

      <!-- Sección de comentarios -->
      {#if card?.comentarios && card.comentarios.length > 0}
        <div class="comments-section">
          <h3>Comentarios</h3>
          <div class="comments-list">
            {#each card.comentarios as comment}
              <div class="comment">
                <div class="comment-header">
                  <strong>{comment.autor}</strong>
                  <span class="comment-date">{comment.fecha}</span>
                </div>
                <p class="comment-text">{comment.texto}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Formulario para nuevo comentario -->
      <div class="new-comment-section">
        <h3>Agregar Comentario</h3>
        <div class="comment-form">
          <div class="form-group">
            <input
              type="text"
              bind:value={nuevoComentario.autor}
              placeholder="Tu nombre"
              class="comment-input"
            />
          </div>
          <div class="form-group">
            <textarea
              bind:value={nuevoComentario.texto}
              placeholder="Escribe tu comentario..."
              rows="2"
              class="comment-textarea"
            ></textarea>
          </div>
          <button type="button" on:click={addComment} class="btn-comment">
            Agregar Comentario
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background: var(--color-bg-main, #ffffff);
    border-radius: var(--radius-md, 8px);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border-primary, #e5e7eb);
  }

  .modal-header h2 {
    margin: 0;
    color: var(--color-text-primary, #111827);
    font-size: 1.25rem;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-text-secondary, #6b7280);
    padding: 0.25rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .close-button:hover {
    background: var(--color-bg-card-hover, #f3f4f6);
  }

  .modal-form {
    padding: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--color-text-primary, #111827);
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--color-border-primary, #d1d5db);
    border-radius: var(--radius-sm, 6px);
    font-size: 0.875rem;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: var(--color-primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .form-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border-primary, #e5e7eb);
  }

  .btn-primary,
  .btn-secondary,
  .btn-comment {
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-sm, 6px);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: var(--color-primary, #3b82f6);
    color: white;
  }

  .btn-primary:hover {
    background: var(--color-primary-hover, #2563eb);
  }

  .btn-secondary {
    background: var(--color-bg-card, #f9fafb);
    color: var(--color-text-primary, #111827);
    border: 1px solid var(--color-border-primary, #d1d5db);
  }

  .btn-secondary:hover {
    background: var(--color-bg-card-hover, #f3f4f6);
  }

  .btn-comment {
    background: var(--color-success, #10b981);
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .btn-comment:hover {
    background: var(--color-success-hover, #059669);
  }

  .comments-section {
    padding: 1.5rem;
    border-top: 1px solid var(--color-border-primary, #e5e7eb);
  }

  .comments-section h3 {
    margin: 0 0 1rem 0;
    color: var(--color-text-primary, #111827);
    font-size: 1.125rem;
  }

  .comments-list {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 1rem;
  }

  .comment {
    background: var(--color-bg-card, #f9fafb);
    border-radius: var(--radius-sm, 6px);
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .comment-header strong {
    color: var(--color-text-primary, #111827);
    font-size: 0.875rem;
  }

  .comment-date {
    color: var(--color-text-secondary, #6b7280);
    font-size: 0.75rem;
  }

  .comment-text {
    margin: 0;
    color: var(--color-text-primary, #111827);
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .new-comment-section {
    padding: 1.5rem;
    border-top: 1px solid var(--color-border-primary, #e5e7eb);
    background: var(--color-bg-card, #f9fafb);
  }

  .new-comment-section h3 {
    margin: 0 0 1rem 0;
    color: var(--color-text-primary, #111827);
    font-size: 1.125rem;
  }

  .comment-form {
    display: grid;
    gap: 0.75rem;
  }

  .comment-input,
  .comment-textarea {
    background: white;
  }

  @media (max-width: 640px) {
    .form-row {
      grid-template-columns: 1fr;
    }

    .modal-content {
      margin: 0.5rem;
    }
  }
</style>
