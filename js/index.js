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
            <div class="products-container card-products">
                <div class="cards-container">
                    <img class="desserts-image" src=${product.image.desktop}>
                </div>

                <span class="card-button-container">
                    <button class="card-button">
                        <img src="../assets/images/icon-add-to-cart.svg">
                        <p class="card-text">Add to cart</p>
                    </button>
                </span>
                
                <div class="dessert-info">
                    <p class="product-category">
                        ${product.category}
                    </p>
                    <h2 class="product-name">
                        ${product.name}
                    </h2>
                    <p class="product-price">
                        $${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
        `;
        container.appendChild(div);
    });

    addItemsToCart();
};

function addItemsToCart() {
    const addCartButtons = document.querySelectorAll('.card-button-container');

    addCartButtons.forEach((buttonContainer) => {
        const button = buttonContainer.querySelector('.card-button');

        button.addEventListener('click', () => {
            replaceButton(buttonContainer);
            incrementCart();
        });
    });
}

function incrementCart() {
    const incrementButton = document.getElementById('cart-number');
    let currentCount = parseInt(incrementButton.innerHTML) || 0;
    currentCount++;
    incrementButton.innerHTML = currentCount;
}

function decrementCart() {
    const decrementButton = document.getElementById('cart-number');
    let currentCount = parseInt(decrementButton.innerHTML) || 0;
    currentCount--;
    decrementButton.innerHTML = currentCount;
}

// Function to replace the "add to cart" button with another button
function replaceButton(buttonContainer) {
    const quantityButton = document.createElement('div');
    quantityButton.classList.add('item-cart-container');
    quantityButton.innerHTML = `
        <div class="item-cart">
            <img class='btn-quantity decrement-quantity' src="../assets/images/icon-decrement-quantity.svg">
            <p class="cart-quantity">1</p>
            <img class='btn-quantity increment-quantity' src="../assets/images/icon-increment-quantity.svg">
        </div>
    `;

    // Replace the old button with a new component
    buttonContainer.replaceWith(quantityButton);

    const incrementButton = quantityButton.querySelector('.increment-quantity');
    const decrementButton = quantityButton.querySelector('.decrement-quantity');
    const quantitySpan = quantityButton.querySelector('.cart-quantity');

    let quantity = 1;

    incrementButton.addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = quantity;
        incrementCart();
    });

    decrementButton.addEventListener('click', () => {
        if (quantity > 0) {
            quantity--;
            quantitySpan.textContent = quantity;
            decrementCart();
        }

        if (quantity === 0) {
            quantityButton.replaceWith(buttonContainer);
        }
    });
}
