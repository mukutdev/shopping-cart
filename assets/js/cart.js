// getting baskets from localStorage
const selectedProducts = document.getElementById('selected-products')
const getTable = document.querySelector('.table')
let baskets = JSON.parse(localStorage.getItem('cart')) || []
const displayProductCart = ()=>{
  if(baskets.length !== 0) {
    let count = 0
     baskets.map((products) =>{
         getTable.classList.remove('none')
         const {id , title , image , price , item} = products
         const tr = document.createElement('tr')
         tr.innerHTML = `
         <td>${count = count+ 1}</td>
         <td>${title}</td>
         <td class="font-medium text-lg">$${parseInt(price)}</td>
         <td>
         <i onclick=decrement(${id}) class="fa-solid fa-minus border-2 border-slate-900 p-1 cursor-pointer"></i>
         <span class="px-2 font-medium" id="${id}">${item}</span>
         <i onclick=increment(${id}) class="fa-solid fa-plus border-2 border-slate-900 p-1 cursor-pointer"></i>
         </td>
         <td class="font-medium text-lg" id="${id}">
           $${parseInt(item * price)}
         </td>
         `
         selectedProducts.appendChild(tr)
         
     })
     
 }
 else{
     document.getElementById('no-item').innerText = 'cart is empty'
     getTable.classList.add('none')
 }
 
}
displayProductCart()


// increment function

const increment =(id)=>{
  const search = baskets.find((product)=> parseInt(product.id) === id)
  if(search === undefined){
   return;
  }else{
    search.item += 1
  }
//  displayProductCart()
displayProductCart()
  localStorage.setItem('cart', JSON.stringify(baskets))
  setInnerText(id, search.item) 
  updateQuantity()
}
// decrement function

const decrement =(id)=>{
  const search = baskets.find((product)=> parseInt(product.id) === id)
  if(search === undefined){
    return;
  }else if(search.item === 0) return;
  else{
    search.item -= 1
  }
  // baskets = baskets.filter((product) => product.id !== id)
  //  displayProductCart()
    localStorage.setItem('cart', JSON.stringify(baskets))
    setInnerText(id, search.item) 
     updateQuantity()
}


// set innerText function 

const setInnerText = (id , value)=>{
  const getId = document.getElementById(id)
  console.log(id);
  const toInt = parseInt(getId)
  getId.innerText = value
}

// update cart quantity
const updateQuantity = () => {
  quantity.innerText = baskets.map((product) => product.item).reduce((x,y) => x + y , 0);
}


updateQuantity() 