function Menu() { 
    function interactMenu(){
      document.getElementById('menu').classList.toggle('active')
    }
    return (
      <div id="menu" className="menu fixed top-0 right-0 bg-white rounded-bl-2xl p-5 z-10">
          <i className="fa-solid fa-xmark w-full text-right text-[black] cursor-pointer" onClick={() => interactMenu()}></i>
          <ul className="font-[Peloric]">
              <li className="text-black">SHOP</li>
              <li className="text-black">BLOG</li>
              <li className="text-black">ABOUT US</li>
              <li className="text-black">CONTACT</li>
              <li className="text-black">CART</li>
          </ul>
      </div>
    )
  }
  
  export default Menu