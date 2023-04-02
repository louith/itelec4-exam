function Cart({ cart, setCart }) {
    const initVal = 0;
    let totalPrice = cart.reduce((acc, currVal) => acc + currVal.qty * currVal.price, initVal);
    function interactCart(){
      document.getElementById('cart').classList.toggle('active')
    }
    function removeItemFromCart(product){
      setCart(cart.filter((p) => p.id !== product.id))
    }
    function editItemQty(e, product){
      if (e.target.innerText === '+') {
          setCart(
              cart.map((p) => {
                  if (p.id === product.id) {
                      return {
                          ...p,
                          qty: p.qty + 1
                      }
                  }
                  else {
                      return p
                  }
              })
          )
      }
      else {
          if (cart.filter((p) => p.id === product.id)[0].qty - 1 > 0) {
              setCart(
                  cart.map((p) => {
                      if (p.id === product.id) {
                          return {
                              ...p,
                              qty: p.qty - 1
                          }
                      }
                      else {
                          return p
                      }
                  })
              )
          }
          else {
              setCart(cart.filter((p) => p.id !== product.id))            
          }
      }
    }
    return (
      <div id="cart" className="cart fixed top-0 right-0 w-[25%] h-full bg-[white] p-5 z-10 overflow-y-scroll">
          <div className="flex justify-between items-center mb-5">
              <p className="text-black text-[25px] font-[Montserrat]">YOUR CART</p>
              <div className="h-8 w-8 rounded-full bg-slate-800 text-center pt-1">
              <p className="text-slate-100">{cart.length}</p>
              </div>
              <i className="fa-solid fa-xmark text-[black] cursor-pointer" onClick={() => interactCart()}></i>
          </div>        
          {cart.map((product) => {
              return (
                  <div key={product.id} className="py-4 border-t-[1px] border-black space-y-5">
                      <div className="flex space-x-8 items-center">
                          <img src={product.imgPath} alt="" className="cart-item rounded-[20px] w-[40%]" />
                          <div className="space-y-2">
                              <p className="text-black font-bold font-[Inter] uppercase">{product.name}</p>
                              <p className="text-black">Price: {product.price.toFixed(2)}</p>
                              <p className="text-black">Quantity:</p>
                              <div className="flex items-center space-x-4">
                                  <button className="text-black px-3 py-1 bg-[grey]" onClick={(e) => editItemQty(e, product)}>-</button>
                                  <p className="text-black">{product.qty}</p>
                                  <button className="text-black px-3 py-1 bg-[grey]" onClick={(e) => editItemQty(e, product)}>+</button>
                              </div>
                          </div>
                      </div>
                      <div className="flex justify-end">
                          <button className="border-[2px] rounded-full border-[#475467] text-black px-4 py-2" onClick={() => removeItemFromCart(product)}><i className="fa-solid fa-trash text-black"></i></button>
                      </div>
                  </div>                    
              )
          })}
          <div className="border-t-[1px] my-7 border-black flex justify-between font-[Montserrat]">
              <p className="text-black text-[25px]">Total:</p>
              <p className="text-black text-[25px]">Php {totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-center">
              <button className="w-[80%] py-2 text-black text-center border-[1px] border-[#0A4508] rounded-full" onClick={() => alert('Checkout Successful!')}>PROCEED TO CHECKOUT</button>
          </div>
          
      </div>   
    )
  }
  
  export default Cart