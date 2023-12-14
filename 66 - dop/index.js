import {getProducts, fetchSearchByProducts, fetchProductsByCategory, getCategories} from "./requests.js";

const products = document.querySelector('.js-products');
const select = document.querySelector('.js-select');
const search = document.querySelector('.js-search');

const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

function renderProducts(data) {
    products.innerHTML = '';
    for (const product of data) {
        products.insertAdjacentHTML('beforeend', `
                <div class="product">
                    <img class="product__img" src="${product.thumbnail}" alt="">
                    <div class="product__body">
                        <p class="product__price">${formatter.format(product.price)}</p>
                        <h2 class="product__title">${product.title}</h2>
                        <p class="product__descr">${product.description}</p>
                        <p class="product__brand">Brand: <span>${product.brand}</span></p>
                        <p class="product__category">Category: <span>${product.category}</span></p>
                        <!--изменено-->
                        <div class="product__spacer"></div>
                        <!--изменено-->
                        <div class="rating product__rating">
                            <svg class="rating__ico" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            <p class="rating__value">${product.rating}</p>
                        </div>
                    </div>
                </div>
            `);
    }
}

getProducts().then(data => renderProducts(data.products));

getCategories().then(data => {
    for (const category of data) {
        const htmlOptionElement = document.createElement('option');
        htmlOptionElement.value = category;
        htmlOptionElement.textContent = category;
        select.append(htmlOptionElement);
    }
});

select.addEventListener('change', e => {
    fetchProductsByCategory(select.value)
        .then(data => renderProducts(data.products));
});

search.addEventListener('change', e => {
    fetchSearchByProducts(search.value)
        .then(data => renderProducts(data.products));
});
