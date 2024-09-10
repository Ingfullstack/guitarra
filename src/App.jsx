import { useEffect, useState } from "react";
import Footer from "./Guitarras/components/Footer";
import Header from "./Guitarras/components/Header";
import ListadoGuitarras from "./Guitarras/components/ListadoGuitarras";
import { db } from "./Guitarras/data/db";
import { useCarrito } from "./Guitarras/hooks/useCarrito";

function App() {
  
  const { 
    carrito, 
    handleRemover,
     handleVaciarCarrito, 
     handleIncrementar,
    handleDecrementar,
    hanldeAgregarCarrito,
    data
  } = useCarrito()

  return (
    <>
      <Header
        carrito={carrito}
        handleRemover={handleRemover}
        handleVaciarCarrito={handleVaciarCarrito}
        handleIncrementar={ handleIncrementar }
        handleDecrementar={ handleDecrementar }
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item) => (
            <ListadoGuitarras
              key={item.id}
              item={item}
              hanldeAgregarCarrito={hanldeAgregarCarrito}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
