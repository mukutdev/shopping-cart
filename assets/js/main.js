// variables

const quantity = document.getElementById('quantity')
const productGrid = document.getElementById('product-grid')

// fetching product data from fakeProduct api

const getProducts = async ()=>{
    const url = 'https://fakestoreapi.com/products'
    const res = await fetch(url)
    const data = await res.json();
    displayProducts(data)
 }

//  baskets

let baskets = JSON.parse(localStorage.getItem('cart')) || [] ;

console.log(baskets);

// displayProducts items

const displayProducts = async (products) =>{
   await products.forEach((product) =>{
        // destructuring product data
        const {id , title , price , category , image, rating :{rate}} = product
         
        // set product rating to integer value 
        const rating = (rate / 5) * 100
        // calculating star width 
        const percentage = `${Math.floor(rating / 10) * 10}%`
        // creating product card
        const productCard = document.createElement('div')
    
        // adding productCard className
        productCard.classList.add('card' ,'bg-base-100' , 'shadow-md' ,'rounded-md')

        // pushing product data to productCard

        productCard.innerHTML = `
        <figure><img class="w-full h-80 object-fill" src="${image}" alt="${title}" /></figure>
        <div class="card-body">
          <div class="badge bg-blue-600 border-0 text-white">${category}</div> 
          <h2 class="card-title tooltip text-left text-lg" data-tip="${title}">${title.length > 26 ? title.slice(0 , 26) + '...' : title}</h2>
          <h3 class="font-medium text-xl">$${parseInt(price)}</h3>
          <div class="card-actions justify-between items-center">
             <div class="outer">
                <div class="inner" style="width:${percentage}"></div>
             </div>
             <span>${rate}</span>
           
             <button onclick="addToCart('${id}', '${title.includes("'") ? title.replace("'" , ""): title}' , ' ${price}', '${image}')" class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-5 font-semibold">Add to cart <i class="fa-solid fa-cart-shopping text-white text-lg"></i></button>
          </div>
        </div> 
        `
        // appending to productGrid
        productGrid.appendChild(productCard);
    })
}

// addToCart function
const addToCart = (id , title , price , image) => {
    // checking if selected item is already in cart or not
    let searchProduct = baskets.find((product)=> product.id === id); 
    if(searchProduct === undefined){
         // pushing item to cart
         baskets.push({
            id :id,
            title :title,
            price :price,
            image :image,
            item : 1,
        })

    }
     else{
       return ;
    }

     // saving data to localStorage
     localStorage.setItem('cart', JSON.stringify(baskets))

     // updating cart quantity
     updateQuantity()
    
}

// update quantity value

const updateQuantity = () => {
    console.log(baskets.length);
    quantity.innerText = baskets.map((product) => product.item).reduce((x,y) => x + y , 0);
}



// calling necessary function

getProducts();    // display product function
updateQuantity()  // update quantity value