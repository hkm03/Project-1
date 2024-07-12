document.addEventListener("DOMContentLoaded", function () {
    showProducts('Men');
});

async function showProducts(category) {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        
        const categoryData = data.categories.find(cat => cat.category_name === category);

        if (categoryData) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            categoryData.category_products.forEach(product => {
                createProductCard(product);
            });

            // Update tab button styles
            updateTabButtonStyles(category);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateTabButtonStyles(category) {
    document.querySelectorAll('#tabs button').forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    });

    const clickedButton = document.querySelector(`#tabs button.${category.toLowerCase()}`);
    if (clickedButton) {
        clickedButton.style.backgroundColor = 'black';
        clickedButton.style.color = 'white';
    }
}


function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.className = 'product-image';

    if (product.badge_text !== null) {
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.innerText = product.badge_text;
        productCard.appendChild(badge);
    }
    
    const title = document.createElement('h3');
    title.innerText = `${product.title}`

    const vendor = document.createElement('p');
    vendor.innerText = `• ${product.vendor}`;
    title.style.float = 'left';
    vendor.style.marginLeft = '105px';

    const price = document.createElement('p');
    price.innerText = ` Rs ${product.price}.00`;

    const compareAtPrice = document.createElement('p');
    compareAtPrice.innerText = `${product.compare_at_price}.00`;

    const discount = document.createElement('p');
    const discountPercentage = calculateDiscountPercentage(product.price, product.compare_at_price);
    discount.innerText = ` ${discountPercentage}% off`;

    price.style.display = 'inline-block';
    price.style.marginRight = '6px';
    compareAtPrice.style.display = 'inline-block';
    compareAtPrice.style.marginRight = '6px';
    compareAtPrice.style.textDecoration = 'line-through';
    compareAtPrice.style.color = 'grey';
    discount.style.display = 'inline-block';
    discount.style.color = 'red';

    const addToCartButton = document.createElement('button');
    addToCartButton.className="button";
    addToCartButton.innerText = 'Add to Cart';


    productCard.appendChild(productImage);
    productCard.appendChild(title);
    productCard.appendChild(vendor);
    productCard.appendChild(price);
    productCard.appendChild(compareAtPrice);
    productCard.appendChild(discount);
    productCard.appendChild(addToCartButton);


    document.getElementById('product-container').appendChild(productCard);
}

function calculateDiscountPercentage(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
}