// getting baskets from localStorage
const selectedProducts = document.getElementById('selected-products')
const getTable = document.querySelector('.table')

// const subtotal = document.getElementById('subtotal')
let baskets = JSON.parse(localStorage.getItem('cart')) || []

// update cart quantity
const updateQuantity = () => {
  quantity.innerText = baskets.map((product) => product.item).reduce((x,y) => x + y , 0);
}

updateQuantity() 
// fetching product data from fakeProduct api

const getProductCart = async ()=>{
  const url = 'https://fakestoreapi.com/products'
  const res =  await fetch(url)
  const data =  await res.json();
  return data;
  // displayProductCart(data)
}

const displayProductCart =  async ()=>{
  const productData = await getProductCart()
  if(baskets.length !== 0) {
    let count = 0
   return (selectedProducts.innerHTML = 
    baskets.map((products) =>{
      getTable.classList.remove('none')
      const {id , item} = products
      const search = productData.find((product)=> product.id === parseInt(id))  || []
       return `
       <tr>
       <td>${count = count+ 1}</td>
      <td>${search.title}</td>
      <td class="font-medium text-lg">$${search.price}</td>
      <td>
      <i onclick=decrement(${search.id}) class="fa-solid fa-minus border-2 border-slate-900 p-1 cursor-pointer"></i>
      <span class="px-2 font-medium" id="${search.id}">${item}</span>
      <i onclick=increment(${search.id}) class="fa-solid fa-plus border-2 border-slate-900 p-1 cursor-pointer"></i>
      </td>
      <td class="font-medium text-lg">
        $${parseInt(item * search.price)}
      </td>
       </tr> `
     
  }))
    //  const getGrandTotal =  localStorage.getItem('grandTotal')
    //  const getParseValue = JSON.parse(getGrandTotal)
    //  console.log(getParseValue.grandTotal);
    //       if(getGrandTotal){
    //         setInnerText('total', getParseValue.grandTotal)
    //       }else return;
     
 }
 else{
     document.getElementById('no-item').innerText = 'cart is empty'
     getTable.classList.add('none')
 }
 
}



// increment function

const increment =(id)=>{
  //  console.log(baskets);
  const search = baskets.find((product)=> parseInt(product.id) === id)
  // console.log(search);
  if(search === undefined){
   return;
  }else{
    search.item += 1
  }
  displayProductCart()
  setInnerText(id, search.item) 
  updateQuantity()
  calculateTotal(id)
  // applyCoupon()
  localStorage.setItem('cart', JSON.stringify(baskets))
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
   
    updateQuantity()
    baskets.filter((x) => x.item < 0 )
    // console.log(baskets);
    setInnerText(id, search.item)
    localStorage.setItem('cart', JSON.stringify(baskets))
    displayProductCart();
    calculateTotal(id)
    // applyCoupon()
    console.log(baskets);
  }




// set innerText function 
const setInnerText = (id , value)=>{
  const getId = document.getElementById(id)
  getId.innerText = value
}

// calculate total 

const calculateTotal = ()=>{
   if(baskets.length !== 0){
   
    let shipping = 0
     let amount = baskets.map(product =>{
       const {id} = product
      //  console.log(item, price);
       let filterData = baskets.find(product => product.id === id)
       return filterData.price * filterData.item;
     }).reduce((x,y) => (x +y) , 0);
    //  console.log(amount);
     setInnerText('subtotal' , amount)
     setInnerText('shipping' , amount  < 200 ? shipping : shipping = 15)
     const grandTotal = amount + shipping;
     setInnerText('total' , grandTotal )
     return grandTotal;
   }
  //  console.log(amount);
    
}
// apply coupon button

// const applyCoupon = () => {
//   //  console.log(calculateTotal());
//   let couponCode = 'n'
//   const coupon = document.getElementById('coupon').value
//   const couponMsg = document.getElementById('coupon-msg')
//   let couponMessage = 'coupon code applied'
//    if(couponCode === coupon){
//      const couponCodeDiscount = calculateTotal() * 10 / 100
//      const afterDiscount = calculateTotal() - couponCodeDiscount
//      couponMsg.innerText = couponMessage
//     //  localStorage.setItem('grandTotal' , JSON.stringify({grandTotal : afterDiscount , couponMsg :couponMessage}))
//      setInnerText('total' ,  afterDiscount)
//    }else return;
// }

const checkoutBtn =()=>{
      const grandTotal = calculateTotal()
      alert(`Thanks for shopping , Total billed amount $${grandTotal}  `)
}

calculateTotal()
displayProductCart()