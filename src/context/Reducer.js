export default (state, action) => {
	switch (action.type) {
		case 'CHECK_FOR_USER_TOKEN':
			return {
				...state,
				userInfo: action.payload,
			};
		case 'LOGOUT_USER':
			return {
				...state,
				userInfo: action.payload,
			};
		case 'ADD_TO_CART':
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter((item) => item.pack._id !== action.payload),
			};
		case 'EMPTY_CART':
			return {
				...state,
				cart: action.payload,
			};
		default:
			return state;
	}
};
