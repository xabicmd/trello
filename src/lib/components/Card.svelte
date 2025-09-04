<script lang="ts">
  export let id: string
  export let title: string
  export let description: string
</script>

<div data-card-id={id}>
  <h3>{title}</h3>
  <p>{description}</p>
  <p>{id}</p>
</div>

<style>
  div {
    background: var(--color-bg-card);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-sm);
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    border: 0.0625rem solid var(--color-border-secondary);
    transition: var(--transition-base);
  }

  div:hover {
    background: var(--color-bg-card-hover);
    transform: translateY(-0.0625rem);
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
</style>
