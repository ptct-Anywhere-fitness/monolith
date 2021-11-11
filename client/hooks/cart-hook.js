import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// ==============================================

export const useCart = () => {
  // --------------------------------------------

  // const router = useRouter();

  const [cart, setCart] = useState([]);
  const [cart_total, setCartTotal] = useState(0);

  // --------------------------------------------

  // -Do On Page Load
  useEffect(() => {
    console.log('useEffect [] -- On Page Load');

    // Get cart from local-storage
    const current_cart = JSON.parse(localStorage.getItem('cart'));
    setCart(current_cart);
  }, []);

  // --------------------------------------------

  const deleteFromCart = (cart_idx) => {
    const cart_item = cart[cart_idx];

    console.log('deleteFromCart() -- cart_item: ', cart_item);

    const updated_cart = cart.filter((filter_item) => {
      return filter_item.product_id !== cart_item.product_id;
    });
    setCart(updated_cart);

    const new_cart_str = JSON.stringify(updated_cart);
    localStorage.setItem('cart', new_cart_str);
  };

  // --------------------------------------------

  const addToCart = (product) => {
    console.log('addToCart() -- cart: ', cart);

    let new_cart;

    if (cart) {
      const current_cart = [...cart];

      const already_in_cart_idx = cart.findIndex((cart_item) => {
        return cart_item.product_id === product.id;
      });

      if (already_in_cart_idx !== -1) {
        ++current_cart[already_in_cart_idx].quantity;
        new_cart = [...current_cart];
      } else {
        new_cart = [
          ...current_cart,
          { product_id: product.id, quantity: 1, product_price: product.price },
        ];
      }
    } else {
      new_cart = [
        { product_id: product.id, quantity: 1, product_price: product.price },
      ];
    }

    setCart(new_cart);

    const new_cart_str = JSON.stringify(new_cart);
    localStorage.setItem('cart', new_cart_str);
  };

  // --------------------------------------------

  // -Do Update of Cart (After Page Load)
  useEffect(() => {
    if (cart) {
      let total = 0;
      cart.forEach((cart_item) => {
        total += cart_item.product_price * cart_item.quantity;
      });

      console.log('useEffect [cart] if(mounted) -- cart: ', cart);

      setCartTotal(total);
    }
  }, [cart]);

  // --------------------------------------------

  return { cart, cart_total, addToCart, deleteFromCart };

  // --------------------------------------------
};

// ==============================================
