<script lang="ts">
  import { createEventDispatcher } from "svelte"

  export let id: string
  export let title: string
  export let description: string
  export let responsable: string = ""
  export let tipo: string = "tarea"
  export let comentarios: Comment[] = []

  type Comment = {
    id: string
    autor: string
    texto: string
    fecha: string
  }

  const dispatch = createEventDispatcher()

  function handleClick() {
    dispatch("click")
  }
</script>

<div
  data-card-id={id}
  on:click={handleClick}
  on:keydown={(e) => e.key === "Enter" && handleClick()}
  role="button"
  tabindex="0"
>
  <h3>{title}</h3>
  <p class="description">{description}</p>
  {#if responsable}
    <p class="responsable">👤 {responsable}</p>
  {/if}
  <div class="card-meta">
    <span class="tipo tipo-{tipo}">{tipo}</span>
    {#if comentarios.length > 0}
      <span class="comentarios">💬 {comentarios.length}</span>
    {/if}
  </div>
</div>

<style>
  div {
    background: var(--color-bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    border: 1px solid var(--color-border-secondary);
    transition: var(--transition-base);
  }

  div:hover {
    background: var(--color-bg-card-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  div h3 {
    font-size: var(--font-size-sm);
    margin: 0 0 0.5rem 0;
    color: var(--color-text-primary);
  }

  div p {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin: 0;
  }

  .description {
    margin-bottom: 0.5rem !important;
  }

  .responsable {
    font-size: var(--font-size-xs);
    color: var(--color-text-primary);
    margin: 0.25rem 0 !important;
    font-weight: 500;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    gap: 0.5rem;
  }

  .tipo {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-weight: 500;
    text-transform: capitalize;
  }

  .tipo-tarea {
    background: #e3f2fd;
    color: #1976d2;
  }

  .tipo-bug {
    background: #ffebee;
    color: #d32f2f;
  }

  .tipo-mejora {
    background: #e8f5e8;
    color: #388e3c;
  }

  .tipo-investigacion {
    background: #fff3e0;
    color: #f57c00;
  }

  .comentarios {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }
</style>
