
const plantsProductsDOM =  document.querySelector('.plants-products-center');

//getting the plants

class PlantsProducts {
async getPlantsProducts() {


    try {
 let result = await fetch('productsPlants.json');
 let data = await result.json();   //converting to a JavaScript object to access the data using Response.json()
 let products = data.items;
 plantsProducts = products.map(item=>  {
     const {title,price, size, description}  = item.fields;
     const {id} = item.sys;
     const imageTop = item.fields.image.url[0];
    const imageBottom = item.fields.image.url[1];

     return {title,price,size,description,id,imageTop,imageBottom}

 });
  return plantsProducts
} catch (error) {
    console.log(error);
}
}
}

// display products
class UI {
displayPlantProducts(plantsProducts) {
    let result  = '';
    plantsProducts.forEach(product => {
        result +=`
                    <!-- single product-->
            <div class="plant">
              <img
                src="${plantsProducts.imageBottom}"
                alt="plant"
              />
              <img
                src="${plantsProducts.imageTop}"
                alt="plant"
              />

              <h3>${plantsProducts.title}</h3>
              <p>
                ${plantsProducts.description}
              </p>
              <button class="bag-btn" data-id="${plantsProducts.id}">
                <img src="./assets/images/icons8-bag-48.png" />add
              </button>
            </div>
            <div class="plant">
            <!-- end of single product-->
        `;
    });

    plantsProductsDOM.innerHTML = result;
}
}