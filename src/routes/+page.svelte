<script>
  import Board from "$lib/components/Board.svelte"
</script>

<main>
  <Board />
</main>

<style>
  main {
    width: 100%;
    height: 100vh;
    overflow-x: auto;
  }

  :root {
    /* Colors */
    --color-bg-main: #1a1b1e;
    --color-bg-column: #2c2e33;
    --color-bg-card: #3a3d45;
    --color-bg-card-hover: #454952;
    --color-border-primary: #3f4149;
    --color-border-secondary: #4a4d57;
    --color-text-primary: #e4e5e7;
    --color-text-secondary: #a1a2a6;

    --color-tag-tarea-bg: #e3f2fd;
    --color-tag-tarea-text: #1976d2;
    --color-tag-bug-bg: #ffebee;
    --color-tag-bug-text: #d32f2f;
    --color-tag-mejora-bg: #e8f5e8;
    --color-tag-mejora-text: #388e3c;
    --color-tag-investigacion-bg: #fff3e0;
    --color-tag-investigacion-text: #f57c00;

    /* Typography */
    --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
      "Helvetica Neue", sans-serif;
    --font-size-xs: 0.7rem;
    --font-size-sm: 0.9rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.1rem;

    /* Border Radius */
    --radius-sm: 0.3rem;
    --radius-md: 0.5rem;
    --radius-xl: 5rem;

    /* Shadows */
    --shadow-sm: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.3);
    --shadow-md: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.4);

    /* Animation */
    --transition-base: all 0.2s ease;
  }
</style>
