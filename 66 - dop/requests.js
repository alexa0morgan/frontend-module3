export function getProducts() {
    return fetch('https://dummyjson.com/products/').then(v => v.json());
}

export function getCategories() {
    return fetch('https://dummyjson.com/products/categories').then(v => v.json());
}

export function fetchSearchByProducts(word) {
    return fetch(`https://dummyjson.com/products/search?q=${word}`).then(v => v.json());
}

export function fetchProductsByCategory(category) {
    return fetch(`https://dummyjson.com/products/category/${category}`).then(v => v.json());
}