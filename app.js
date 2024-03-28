async function getProducts() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "Error loading products!";
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear loading message

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const imageElement = document.createElement("img");
    imageElement.src = "https://placehold.co/600x400"; // Use placeholder if no image
    productElement.classList.add("product__img");

    const titleElement = document.createElement("h2");
    titleElement.textContent = product.title;
    productElement.classList.add("product__title");

    const priceTitle = document.createElement("p");
    priceTitle.textContent = 'Price:'
    productElement.classList.add("product__price--title");

    const priceValue = document.createElement("p");
    priceValue.textContent = `$${product.price}`;
    productElement.classList.add("product__price--value");


    const descriptionElement = document.createElement("p");
    productElement.classList.add("product__description");
    const maxLength = 80;
    const description = product.description;

    if (description.length > maxLength) {
      const truncatedDescription = description.substring(0, maxLength);
      const remainingDescription = description.substring(maxLength);

      descriptionElement.textContent = truncatedDescription;

      const readMoreButton = document.createElement("button");
      readMoreButton.textContent = "Read more...";
      readMoreButton.addEventListener("click", function () {
        descriptionElement.textContent = description;
        readMoreButton.style.display = "none";
      });

      descriptionElement.appendChild(readMoreButton);
    } else {
      descriptionElement.textContent = description;
    }

    // const likeButton = document.createElement("button");
    // likeButton.textContent = isLiked(product.id) ? "Unlike" : "Like";
    // likeButton.addEventListener("click", () => toggleLike(product.id));

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("product__button");
    addToCartButton.textContent = "Add To Cart";
    
    // Add the product elements to the product container
    productElement.appendChild(imageElement);
    productElement.appendChild(titleElement);
    productElement.appendChild(descriptionElement);
    productElement.appendChild(priceTitle);
    productElement.appendChild(priceValue);
    // productElement.appendChild(likeButton);
    productContainer.appendChild(productElement);
    productElement.appendChild(addToCartButton);
  });
}

function toggleLike(productId) {
  const likedProducts = getLikedProducts();
  const isLiked = likedProducts.includes(productId);

  if (isLiked) {
    likedProducts.splice(likedProducts.indexOf(productId), 1);
  } else {
    likedProducts.push(productId);
  }

  localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  displayProducts(getProducts()); // Re-render products with updated like buttons
}

function isLiked(productId) {
  const likedProducts = getLikedProducts();
  return likedProducts.includes(productId);
}

function getLikedProducts() {
  const storedProducts = localStorage.getItem("likedProducts");
  return storedProducts ? JSON.parse(storedProducts) : [];
}

async function main() {
  const products = await getProducts();
  displayProducts(products);
}

main();


// fetch("https://api.escuelajs.co/api/v1/products")
//   .then((res) => res.json())
//   .then((data) => {
//     const productsContainer = document.querySelector(".products");

//     data.forEach((product) => {
//       const productElement = document.createElement("div");
//       productElement.classList.add("product");

//       // Insert product image
//       const productImg = document.createElement("div");
//       productImg.classList.add("product__img");
//       productImg.style.backgroundImage = `url(${product.images.length > 0 ? product.images[0] : 'https://placehold.co/600x400'})`;
//       productElement.appendChild(productImg);

//       // Insert product title
//       const productTitle = document.createElement("h2");
//       productTitle.classList.add("product__title");
//       productTitle.textContent = product.title;
//       productElement.appendChild(productTitle);

//       // Insert product description
//       const productDescription = document.createElement("p");
//       productDescription.classList.add("product__description");
//       productDescription.textContent = product.description;
//       productElement.appendChild(productDescription);

//       // Insert product price
//       const productPriceContainer = document.createElement("div");
//       productPriceContainer.classList.add("product__price");

//       const productPriceTitle = document.createElement("p");
//       productPriceTitle.classList.add("product__price--title");
//       productPriceTitle.textContent = "Price:";
//       productPriceContainer.appendChild(productPriceTitle);

//       const productPriceValue = document.createElement("h3");
//       productPriceValue.classList.add("product__price--value");
//       productPriceValue.textContent = `$${product.price}`;
//       productPriceContainer.appendChild(productPriceValue);

//       productElement.appendChild(productPriceContainer);

//       // Insert product categories (assuming it's a single category for now)
//       const productCategories = document.createElement("div");
//       productCategories.classList.add("product__categories");
//       const categoryImage = document.createElement("img");
//       categoryImage.src = product.category.image;
//       categoryImage.alt = product.category.name;
//       productCategories.appendChild(categoryImage);
//       productElement.appendChild(productCategories);

//       // Insert Add to Cart button
//       const addToCartButton = document.createElement("button");
//       addToCartButton.classList.add("product__button");
//       addToCartButton.textContent = "Add To Cart";
//       productElement.appendChild(addToCartButton);

//       productsContainer.appendChild(productElement);
//     });
//   })
//   .catch((error) => console.log(error));
