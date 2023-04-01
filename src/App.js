import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { useLocalStorage } from 'usehooks-ts'
import initialProducts from "./data";
import { useEffect, useState } from "react";

function App() {
  let [cart, setCart] = useLocalStorage('cart', []) 
  let [products, setProducts] = useState(initialProducts)
  function addToCart(product){
    const isItemExisting = cart.filter((p) => p.id === product.id).length !== 0 ? true : false;    
    
    // adding a new item to cart
    if (!isItemExisting) { 
      setCart([...cart, {
        ...product,
        qty: 1
      }])
    }

    // update existing item to cart
    else { 
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
  }
  function filterSearch(query){   
    if (query) {
      const re = new RegExp(`^${query}`, 'mi')
      setProducts(initialProducts.filter((product) => re.test(product.name)))
    }
    else {
      setProducts(initialProducts)
    }
  }
  useEffect(() => {    
    if (cart.length === 0 && document.getElementById('cart').classList.contains('active')) {
        document.getElementById('cart').classList.toggle('active')
    }
  }, [cart])
  return (
    <div className="App">
      <Navbar cart={cart} />
      <Menu />
      <Cart cart={cart} setCart={setCart} />
      <section className="catalog px-20">
        <div className="flex justify-end items-center space-x-6">
          <form className="relative">
            <i className="fa-solid fa-magnifying-glass absolute top-[30%] left-[6%] text-[grey]"></i>
            <input type={'search'} placeholder='Search' onChange={(e) => filterSearch(e.target.value)} name="search_name" className="pl-10 py-2 rounded-full placeholder:font-[Peloric] text-[black]" />
          </form>          
        </div>
        <div className="grid grid-cols-3 w-[80%] gap-6 mx-auto text-center font-[Montserrat] mt-10 mb-32">
          {products.map(product => {
            return (
              <div key={product.id} className="px-4 py-2 space-y-2 bg-white rounded-3xl">
                  <img src={product.imgPath} alt="" className="h-[300px] border-b-1 border-black mx-auto"/>
                  <p className="text-[black] font-bold text-xl">{product.name}</p>
                  <p className="text-[black]">Php {product.price.toFixed(2)}</p>
                  <p className="text-[black]">{product.category}</p>
                  <button className="text-[black] border border-black rounded-3xl py-2 px-4" onClick={() => addToCart(product)}>ADD TO CART</button>
                </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
