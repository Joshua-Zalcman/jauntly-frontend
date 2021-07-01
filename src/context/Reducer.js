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
		default:
			return state;
	}
};
