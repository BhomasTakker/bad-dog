export async function getPageById(id: string): Promise<any> {
	const response = await fetch(`/api/page/${id}`);
	return await response.json();
}
export async function getPageByRoute(route: string): Promise<any> {
	if (!route) {
		return {};
	}
	console.log({ route });
	const response = await fetch(`/api/page/route/${route}`);
	return await response.json();
}
