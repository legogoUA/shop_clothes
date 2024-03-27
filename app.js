const listEl = document.querySelector('div');

fetch("https://api.escuelajs.co/api/v1/products")
  .then((res) => {
    return res.json();
  })
  .then(data => {
    data.forEach(title => {
      listEl.insertAdjecentHTML('beforeend', `<div>${post.title}</div>`);
    })
    // data.forEach((product) => {
    //   const productTitle = `<div>${product.title}</div>`;
    //   document.querySelector(".product__title").insertAdjacentHTML('beforeend', productTitle);
    // });
  })
  .catch((error) => console.log(error));
