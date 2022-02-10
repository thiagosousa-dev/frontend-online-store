export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const searchEndPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const request = await fetch(searchEndPoint);
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategory(categoryId) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const requestJson = await request.json();
  return requestJson.results;
}

export async function getProductsFromAndQuery(query) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductFromId(id) {
  const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const requestJson = await request.json();
  return requestJson;
}
