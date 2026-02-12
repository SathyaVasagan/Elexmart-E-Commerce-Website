// Simple relevance score: title match > brand > category > description
export const relevanceScore = (product, q) => {
  if (!q) return 0
  const needle = q.toLowerCase()
  const title = product.title.toLowerCase()
  const brand = product.brand.toLowerCase()
  const cat = product.category.toLowerCase()
  const desc = product.description.toLowerCase()
  let score = 0
  if (title.includes(needle)) score += 5
  if (brand.includes(needle)) score += 3
  if (cat.includes(needle)) score += 2
  if (desc.includes(needle)) score += 1
  return score
}

export const sortByQuery = (products, q) => {
  if (!q) return products
  return [...products].sort((a,b) => relevanceScore(b,q) - relevanceScore(a,q))
}
