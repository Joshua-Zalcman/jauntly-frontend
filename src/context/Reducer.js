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
		case 'LOGOUT_USER':
			return {
				...state,
				cart: state.cart.filter((item) => item._id !== action.payload),
			};
		default:
			return state;
	}
};
