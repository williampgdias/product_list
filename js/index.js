document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

// Function to fetch the Data from the JSON file
const fetchData = () => {
    fetch('/data.json')
        .then((response) => response.json())
        .then((data) => {
            displayData(data);
        })
        .catch((error) => console.error('Erro ao carregar dados', error));
};

// Function to show the data from the JSON File
const displayData = (data) => {
    const container = document.getElementById('data-container');

    data.forEach((product) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="products-container">
                <div class="cards-container">
                    <img class="desserts-image" src=${product.image.desktop}>
                </div>
                
                <div class="dessert-info">
                    <p class="product-category">
                        ${product.category}
                    </p>
                    <h2 class="product-name">
                        ${product.name}
                    </h2>
                    <p class="product-price">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
};
