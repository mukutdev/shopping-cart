// fetching product data from fakeProduct api

const getProducts = async ()=>{
    const url = 'https://fakestoreapi.com/products'
    const res = await fetch(url)
    const data = await res.json();
    displayProducts(data)
 }

// displayProducts items

const displayProducts = async (products) =>{
   await products.forEach((product) =>{
        // destructuring product data
        const {id , title , price , category , image, rating :{rate}} = product
         
        // set product rating to integer value 
        const rating = (rate / 5) * 100
        // calculating star width 
        const percentage = `${Math.floor(rating / 10) * 10}%`

        // capturing product grid area from html
        const productGrid = document.getElementById('product-grid')

        // creating product card
        const productCard = document.createElement('div')
    
        // adding productCard className
        productCard.classList.add('card' ,'bg-base-100' , 'shadow-md' ,'rounded-md')

        // pushing product data to productCard

        productCard.innerHTML = `
        <figure><img class="w-full h-80 object-fill" src="${image}" alt="${title}" /></figure>
        <div class="card-body">
          <div class="badge bg-blue-600 border-0 text-white">${category}</div> 
          <h2 class="card-title tooltip text-left text-lg" data-tip="${title}">${title.length > 20 ? title.slice(0 , 20) + '...' : title}</h2>
          <h3 class="font-medium text-xl">${price}</h3>
          <div class="card-actions justify-between items-center">
             <div class="outer">
                <div class="inner" style="width:${percentage}">
                   
                </div>
              
             </div>
             <span>${rate}</span>
            <button onclick="addToCart(${id})" class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-5 font-semibold">Add to cart <i class="fa-solid fa-cart-shopping text-white text-lg"></i></button>
          </div>
        </div> 
        `
        // appending to productGrid
        productGrid.appendChild(productCard);
    })
}

// calling get products function
getProducts();