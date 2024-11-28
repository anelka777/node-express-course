document.getElementById("fetchProducts").addEventListener('click', () => {
    fetch('/api/v1/products')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch products.')
            }
            return response.json();
        })
        .then((data) => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';

            data.forEach((product) => {
                const productDiv = document.createElement('div');
                productDiv.textContent = `${product.name} - $${product.price}`;
                productList.appendChild(productDiv)
            });
        })
        .catch((error) => {
            console.error(error);
        });
});