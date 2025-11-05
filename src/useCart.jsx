import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");

    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [isConfirm, setIsConfirm] = useState(false);

  function getCartItem(name) {
    const cartItem = cart.find((item) => item.name === name);

    return cartItem;
  }

  function handleAddToCart(product) {
    const inCart = getCartItem(product.name);

    if (inCart) {
      return;
    }

    setCart((prevCart) => [...prevCart, product]);
  }

  function handleDecrement(name) {
    setCart((pr) =>
      pr.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }

  function handleIncrement(name) {
    setCart((pr) =>
      pr.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDeleteCart(name) {
    setCart((pr) => pr.filter((item) => item.name !== name));
  }

  // Effect for storing cart to localstorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function handleNewOrder() {
    setCart([]);
    setIsConfirm(false);
  }

  // Effect for closing confirm modal on Escape key press
  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        setIsConfirm(false);
      }
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, []);

  useEffect(() => {
    if (isConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [isConfirm]);

  function handleIsConfirm() {
    // console.log("confirmed");

    setIsConfirm((confirm) => !confirm);
  }

  function handleOverlayClick() {
    setIsConfirm(false);
  }

  let totalAmount = 0;

  cart.map((a) => (totalAmount += a.product.price * a.quantity), 0);

  // To wrap my app  with, without this, no access to the context.
  return (
    <CartContext.Provider
      value={{
        getCartItem,
        cart,
        handleAddToCart,
        handleDecrement,
        handleIncrement,
        handleDeleteCart,
        totalAmount,
        isConfirm,
        handleIsConfirm,
        handleOverlayClick,
        handleNewOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to be able to access or use what i stored in the context
export function useCart() {
  return useContext(CartContext);
}
