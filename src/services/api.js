export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let searchEndPoint = '';
  if (categoryId && query) {
    searchEndPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  } else if (!categoryId && query) {
    searchEndPoint = `https://api.mercadolibre.com/sites/MLB/search?category=ID&q=${query}`;
  } searchEndPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const request = await fetch(searchEndPoint);
  const requestJson = await request.json();
  return requestJson;
}

getProductsFromCategoryAndQuery('MLB1368');

/* export async function getProductsFromCategory(categoryId) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const requestJson = await request.json();
  return requestJson.results;
}

export async function getProductsFromAndQuery(query) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?ID&q=${query}`);
  const requestJson = await request.json();
  return requestJson.results;
} */
