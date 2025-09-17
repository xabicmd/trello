<!-- svelte-ignore a11y_no_static_element_interactions -->
<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import type { CardType, CommentType } from "../types/types"

  export let isOpen = false
  export let card: CardType | null = null

  const dispatch = createEventDispatcher()

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
    if (nuevoComentario.texto && card) {
      const comment: CommentType = {
        id: crypto.randomUUID(),
        autor: "Usuario", // Temporal hasta implementar login
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
  <div class="modal-backdrop" on:click={handleBackdropClick} on:keydown={(e) => e.key === "Escape" && closeModal()}>
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h2>{card?.title || "Nueva Tarea"}</h2> -->
        <input id="title" type="text" bind:value={formData.title} placeholder="Nombre de la tarea" required />
        <button on:click={closeModal}>✕</button>
      </div>

      <form on:submit|preventDefault={handleSubmit} class="modal-form">
        <div class="form-row">
          <div class="input-with-icon">
            <span>👤</span>
            <input id="responsable" type="text" bind:value={formData.responsable} placeholder="Responsable" />
          </div>

          <div class="input-with-icon">
            <span>🏷️</span>
            <select id="tipo" bind:value={formData.tipo}>
              <option value="tarea">Tarea</option>
              <option value="bug">Bug</option>
              <option value="mejora">Mejora</option>
              <option value="investigacion">Investigación</option>
            </select>
          </div>
        </div>

        <textarea id="description" bind:value={formData.description} placeholder="Descripción de la tarea" rows="3"
        ></textarea>

        <div class="form-actions">
          <button type="button" on:click={closeModal}>Cancelar</button>
          <button type="submit">Guardar</button>
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
                <p>{comment.texto}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Formulario para nuevo comentario -->
      <div class="new-comment-section">
        <div class="comment-form">
          <textarea bind:value={nuevoComentario.texto} placeholder="Escribe tu comentario..." rows="2"></textarea>
          <button type="button" on:click={addComment}>Agregar Comentario</button>
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
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: var(--color-bg-main);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    max-width: 50%;
    width: 100%;
    max-height: 95vh;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border-primary);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border-primary);
  }

  .modal-header input {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: var(--font-size-lg);
    font-weight: 600;
    border: 1px solid var(--color-bg-main);
    border-radius: var(--radius-xl);
    background: var(--color-bg-main);
    color: var(--color-text-primary);
    transition: var(--transition-base);
  }

  .modal-header button {
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: var(--color-text-secondary);
    padding: 0.25rem;
    border-radius: var(--radius-xl);
    transition: var(--transition-base);
  }

  .modal-header button:hover {
    background: var(--color-bg-card-hover);
    color: var(--color-text-primary);
  }

  .modal-form {
    padding: 0 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .modal-form > textarea {
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-with-icon span {
    position: absolute;
    left: 0.75rem;
    z-index: 1;
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
  }

  .modal-form input,
  .modal-form textarea,
  .input-with-icon input,
  .input-with-icon select {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    background: var(--color-bg-card);
    transition: var(--transition-base);
    font-family: inherit;
    color: var(--color-text-primary);
  }

  .modal-form input#responsable,
  .modal-form select {
    background-color: unset;
    border-radius: var(--radius-xl);
  }

  .modal-form input:focus,
  .modal-form textarea:focus,
  .input-with-icon input:focus,
  .input-with-icon select:focus {
    outline: none;
    background: var(--color-bg-main);
    box-shadow: 0 0 0 2px var(--color-border-secondary);
  }

  .modal-form textarea {
    padding-left: 0.75rem;
    resize: vertical;
    min-height: 10rem;
  }

  .input-with-icon select {
    cursor: pointer;
    background: transparent;
  }

  .form-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .form-actions button {
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-xl);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-base);
    border: none;
    font-size: var(--font-size-sm);
  }

  .form-actions button[type="submit"] {
    background: var(--color-border-secondary);
    color: var(--color-text-primary);
  }

  .form-actions button[type="submit"]:hover {
    background: var(--color-bg-card-hover);
  }

  .form-actions button[type="button"] {
    background: var(--color-bg-card);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-primary);
  }

  .form-actions button[type="button"]:hover {
    background: var(--color-bg-card-hover);
  }

  .comment-form button {
    background: var(--color-border-secondary);
    color: var(--color-text-primary);
    padding: 0.5rem 1rem;
    font-size: var(--font-size-xs);
    border-radius: var(--radius-xl);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-base);
    border: none;
  }

  .comment-form button:hover {
    background: var(--color-bg-card-hover);
  }

  .comments-section {
    padding: 1.5rem;
    border-top: 1px solid var(--color-border-primary);
    flex-shrink: 0;
  }

  .comments-section h3 {
    margin: 0 0 1rem 0;
    color: var(--color-text-primary);
    font-size: var(--font-size-lg);
  }

  .comments-list {
    max-height: 12.5rem;
    overflow-y: auto;
    margin-bottom: 1rem;
  }

  .comment {
    background: var(--color-bg-card);
    border-radius: var(--radius-sm);
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    border: 1px solid var(--color-border-primary);
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .comment-header strong {
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
  }

  .comment-date {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
  }

  .comment p {
    margin: 0;
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
    line-height: 1.4;
  }

  .new-comment-section {
    padding: 1.5rem;
    border-top: 1px solid var(--color-border-primary);
    flex-shrink: 0;
  }

  .comment-form {
    display: grid;
    gap: 0.75rem;
  }

  textarea {
    background: var(--color-bg-main);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    padding: 0.75rem;
    font-family: inherit;
    font-size: var(--font-size-sm);
    resize: vertical;
    width: 100%;
    min-height: 5rem;
    transition: var(--transition-base);
  }

  textarea:focus {
    outline: none;
    border-color: var(--color-border-secondary);
    box-shadow: 0 0 0 2px var(--color-border-secondary);
  }

  textarea::placeholder {
    color: var(--color-text-secondary);
  }
</style>
