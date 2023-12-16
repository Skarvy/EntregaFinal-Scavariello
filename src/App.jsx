
import ShopComponentContext from "./context/ShopContext"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer" 


function App() { 
  
  return (
    <>
        <ShopComponentContext>  
           <Navbar/>           
          <Footer/>     
      </ShopComponentContext>
  
    </>
  )
}

export default App
