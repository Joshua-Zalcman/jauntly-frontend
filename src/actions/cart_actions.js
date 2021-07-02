export const setCartLocalStorage = (cart) => {
	localStorage.setItem('cartItems', JSON.stringify(cart));
};
