import { useEffect, useState } from "react";
import { db } from "../data/db";

export const useCarrito = () => {
  const init = () => {
    const localCarrito = localStorage.getItem("carrito");
    return localCarrito ? JSON.parse(localCarrito) : [];
  };
  const [data, setData] = useState([]);
  const [carrito, setCarrito] = useState(init);

  useEffect(() => {
    setData(db);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const hanldeAgregarCarrito = (item) => {
    const existe = carrito.find((carrito) => carrito.id === item.id);
    if (existe) {
      const actualizar = carrito.map((prevItem) => {
        if (prevItem.id === item.id && prevItem.cantidad < 5) {
          return {
            ...prevItem,
            cantidad: item.cantidad++,
          };
        }
        return prevItem;
      });
      setCarrito(actualizar);
    } else {
      item.cantidad = 1;
      setCarrito([...carrito, item]);
    }
  };

  const handleRemover = (id) => {
    const existe = carrito.filter((item) => item.id !== id);
    setCarrito(existe);
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
  };

  const handleIncrementar = (id) => {
    const existe = carrito.map((item) => {
      if (item.id === id && item.cantidad < 5) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        };
      }
      return item;
    });
    setCarrito(existe);
  };

  const handleDecrementar = (id) => {
    const existe = carrito.map((item) => {
      if (item.id === id && item.cantidad > 1) {
        return {
          ...item,
          cantidad: item.cantidad - 1,
        };
      }
      return item;
    });
    setCarrito(existe);
  };

  return {
    db,
    carrito,
    data,
    hanldeAgregarCarrito,
    handleRemover,
    handleVaciarCarrito,
    handleIncrementar,
    handleDecrementar,
  };
};
