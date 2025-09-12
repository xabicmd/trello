<!-- svelte-ignore a11y_no_static_element_interactions -->
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

<div class="card" data-card-id={id} on:click={handleClick} on:keydown={(e) => e.key === "Enter" && handleClick()}>
  <h3>{title}</h3>
  <p>{description}</p>
  {#if responsable}
    <p>👤 {responsable}</p>
  {/if}
  <div class="card-meta">
    <span class="tipo-{tipo}">{tipo}</span>
    {#if comentarios.length > 0}
      <span>💬 {comentarios.length}</span>
    {/if}
  </div>
</div>

<style>
  :root {
    --color-tag-tarea-bg: #e3f2fd;
    --color-tag-tarea-text: #1976d2;
    --color-tag-bug-bg: #ffebee;
    --color-tag-bug-text: #d32f2f;
    --color-tag-mejora-bg: #e8f5e8;
    --color-tag-mejora-text: #388e3c;
    --color-tag-investigacion-bg: #fff3e0;
    --color-tag-investigacion-text: #f57c00;
  }

  .card {
    background: var(--color-bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    border: 1px solid var(--color-border-secondary);
    transition: var(--transition-base);
  }

  .card:hover {
    background: var(--color-bg-card-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  h3 {
    font-size: var(--font-size-sm);
    margin: 0 0 0.5rem 0;
    color: var(--color-text-primary);
  }

  p {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin: 0 0 0.5rem 0;
  }

  p:last-of-type {
    color: var(--color-text-primary);
    margin: 0.25rem 0 0 0;
    font-weight: 500;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    gap: 0.5rem;
  }

  .card-meta span[class^="tipo-"] {
    font-size: var(--font-size-xs);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    text-transform: capitalize;
  }

  .tipo-tarea {
    background: var(--color-tag-tarea-bg);
    color: var(--color-tag-tarea-text);
  }

  .tipo-bug {
    background: var(--color-tag-bug-bg);
    color: var(--color-tag-bug-text);
  }

  .tipo-mejora {
    background: var(--color-tag-mejora-bg);
    color: var(--color-tag-mejora-text);
  }

  .tipo-investigacion {
    background: var(--color-tag-investigacion-bg);
    color: var(--color-tag-investigacion-text);
  }

  .card-meta span:not([class^="tipo-"]) {
    font-size: var(--font-size-xs);
  }
</style>
