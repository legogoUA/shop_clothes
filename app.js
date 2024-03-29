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
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const imageElement = document.createElement("img");
    imageElement.src = "https://placehold.co/600x400";
    imageElement.classList.add("product__img");
    
    const titleElement = document.createElement("h2");
    titleElement.textContent = product.title;
    titleElement.classList.add("product__title");
    
    const callToActionElement = document.createElement("div");
    callToActionElement.classList.add("product__calltoaction");

    const priceElement = document.createElement("div");
    priceElement.classList.add("product__price");
    
    const priceTitle = document.createElement("p");
    priceTitle.textContent = "Price:";
    priceTitle.classList.add("product__price--title");
    
    const priceValue = document.createElement("p");
    priceValue.textContent = `$ ${product.price}`;
    priceValue.classList.add("product__price--value");
    
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("product__description");
    const maxLength = 35;
    const description = product.description;
    
    if (description.length > maxLength) {
      const truncatedDescription = description.substring(0, maxLength);
      const remainingDescription = description.substring(maxLength);
      
      descriptionElement.textContent = truncatedDescription;
      
      const readMoreButton = document.createElement("button");
      readMoreButton.classList.add("product__desctiption--readmore");
      readMoreButton.textContent = "... Read more";
      readMoreButton.addEventListener("click", function () {
        descriptionElement.textContent = description;
        readMoreButton.style.display = "none";
      });
      
      descriptionElement.appendChild(readMoreButton);
    } else {
      descriptionElement.textContent = description;
    }

    const categoriesElement = document.createElement("button");
    categoriesElement.classList.add("product__categories");
    categoriesElement.textContent = product.category.name;
    

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("product__button");
    addToCartButton.textContent = "Add To Cart";
    
    priceElement.appendChild(priceTitle);
    priceElement.appendChild(priceValue);
    callToActionElement.appendChild(priceElement);
    callToActionElement.appendChild(addToCartButton);

    productElement.appendChild(imageElement);
    productElement.appendChild(titleElement);
    productElement.appendChild(descriptionElement);
    productElement.appendChild(categoriesElement);
    productElement.appendChild(callToActionElement);
    productContainer.appendChild(productElement);
  });
}

async function main() {
  const products = await getProducts();
  displayProducts(products);
}

main();
