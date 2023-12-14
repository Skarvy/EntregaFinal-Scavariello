
import ShopComponentContext from "./context/ShopContext"
import Newnavbar from "./components/navbar/Newnavbar"
import Footer from "./components/footer/Footer" 

function App() { 
  
  return (
    <>
        <ShopComponentContext>  
           <Newnavbar/>
          <Footer/>     
      </ShopComponentContext>
  
    </>
  )
}

export default App
