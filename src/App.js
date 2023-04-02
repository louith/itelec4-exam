import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { useLocalStorage } from 'usehooks-ts'
import initialProducts from "./data";
import { useEffect, useState } from "react";
import home_pic from './assets/img/home_pic.jpg';

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
      <Cart cart={cart} setCart={setCart} />

      <div className="flex justify-end items-center space-x-6 mr-8 mt-8">
          <form className="relative">
            <i className="fa-solid fa-magnifying-glass absolute top-[30%] left-[6%] text-[grey]"></i>
            <input type={'search'} placeholder='Search' onChange={(e) => filterSearch(e.target.value)} name="search_name" className="pl-10 py-2 rounded-full placeholder:font-[Peloric] text-[black]" />
          </form>          
        </div>

      <section>
      <div class="w-screen h-screen pt-16">
        <div class="flex flex-row text-amber-200 ml-24">
            <div class="">
                <p class="font-heading_2 text-3xl  pl-28">EXUDE YOUR</p>
                <div class="flex flex-row">
                    <p class="font-heading_2 text-4xl  italic">Personality</p>
                    <p class="font-heading_2 text-3xl pl-4 pt-2">&</p>
                    <p class="font-heading_2 text-4xl italic pl-4">Charm</p>
                </div> 
                <div class="flex flex-row">
                    <p class="font-heading_2 text-3xl pt-2  pl-4">WITH</p>
                    <p class="font-heading_2 text-4xl italic pl-4">Stud Earrings</p>
                </div>

            </div>
            
            <div class="h-1/3 w-1/3 ml-8">
                <img 
                src={home_pic}/>
            </div>

            <div class="h-96 w-52 mt-12 object-contain ml-20 flex flex-row items-end">
                <p class="font-normal">An inspirational jewelry brand symbolizing elegance &amp;  self-belief accentuating unique traits that make you YOU.</p>
            </div>
            
        </div>
      </div>
      </section>

     
        <div className="flex flex-col items-center rotate-2">
          <p className="text-5xl font-[Montserrat] py-4 px-16 place-self-center bg-white text-slate-900 w-1/3">   SHOP NOW</p>
        </div>

      {/* products display */}
      <section className="catalog px-20 mt-8">
        <div className="grid grid-cols-3 w-[80%] gap-6 mx-auto text-center font-[Montserrat] mt-10 mb-32 py-8">
          {products.map(product => {
            return (
              <div key={product.id} className="px-4 py-2 space-y-2 bg-white rounded-3xl flex flex-col">
                  <img src={product.imgPath} alt="" className="h-[300px] border-b-1 border-black mx-auto drop-shadow-lg py-8"/>
                  <p className="text-[black] font-bold text-xl uppercase">{product.name}</p>
                  <p className="text-[black]">Php {product.price.toFixed(2)}</p>
                  <p className="text-[black]">{product.category}</p>
                  <button className="text-[black] border border-black rounded-3xl py-2 px-4 mt-4" onClick={() => addToCart(product)}>
                  <i class="fa-sharp fa-solid fa-cart-plus text-black"></i>
                  </button>
                </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
