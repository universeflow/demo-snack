import type { PageLoad } from './$types';
import { getMisionSection } from '$lib/get-nosotros-content';

export const load: PageLoad = async () => {
	const items = await getMisionSection();
	const mision = items && items.length > 0 ? items[0] : null;
	return { mision };
};