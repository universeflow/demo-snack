<script lang="ts">
	// mision viene del load() en +page.ts
	export let data: { mision: { id: number; titulo?: string; descripcion?: string } | null };

	const mision = data?.mision ?? null;
	const titulo = mision?.titulo ?? 'Misión';
	const descripcion = mision?.descripcion ?? '';
</script>

<section class="mision-container">
	<div class="card">
		<h2 class="card-title">{titulo}</h2>
		{#if descripcion}
			<p class="card-desc">{descripcion}</p>
		{:else}
			<p class="card-desc">Sin descripción disponible.</p>
		{/if}

		<div class="badge-box" aria-hidden="true">
			<ul class="badge-list">
				<li>SNACK PRO</li>
			</ul>
		</div>
	</div>
</section>

<style>
	/* Estilos básicos; ajusta según tu tema/global CSS */
	.mision-container {
		padding: 2rem;
		display: flex;
		justify-content: center;
	}
	.card {
		width: 100%;
		max-width: 720px;
		background: #0f0f10;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 0 0 1px rgba(200,30,30,0.06) inset;
		color: #e6e6e6;
	}
	.card-title {
		color: #ff4b4b; /* rojo similar a imagen */
		font-size: 1.75rem;
		margin: 0 0 1rem 0;
	}
	.card-desc {
		font-size: 1.1rem;
		line-height: 1.9;
		color: #dcdcdc;
		margin: 0 0 2rem 0;
	}
	.badge-box {
		border: 1px solid rgba(200,30,30,0.08);
		padding: 0.75rem 1rem;
		border-radius: 6px;
		display: inline-block;
	}
	.badge-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.badge-list li {
		color: #ff4b4b;
		font-family: monospace;
		letter-spacing: 2px;
	}
</style>
