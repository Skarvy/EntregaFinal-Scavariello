import ItemListConteiner from "./components/ItemListConteiner";
import Navbar from "./components/navbar/Navbar"

function App() {
  const nombreUsuario = "Juan"; // Variable con el nombre del usuario
  
  return (
    <>
     <Navbar/>  
     <ItemListConteiner greeting={nombreUsuario}/>
     
    </>
  )
}

export default App
