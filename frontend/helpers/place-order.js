const placeOrder = (items) => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // items: [
      //   { id: 1, quantity: 3 },
      //   { id: 2, quantity: 1 },
      // ],
      items,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
};

// ==============================================

export { placeOrder };
