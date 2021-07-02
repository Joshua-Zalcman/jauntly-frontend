import { useReducer, createContext } from 'react';
import {
	getToken,
	getUserFromToken,
	removeTokenFromStorage,
} from '../actions/token_actions';
import Reducer from './Reducer';

//initial state
const initialState = {
	userInfo: {},
	cart: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);

	//token actions
	//check for token and login
	function checkForToken() {
		const token = getToken();
		if (token) {
			const user = getUserFromToken();
			dispatch({
				type: 'CHECK_FOR_USER_TOKEN',
				payload: user,
			});
		}
	}
	//logout
	function logoutUser() {
		removeTokenFromStorage();
		const user = {};
		dispatch({
			type: 'LOGOUT_USER',
			payload: user,
		});
	}

	//cart actions
	//add to cart
	function addToCart(pack) {
		dispatch({
			type: 'ADD_TO_CART',
			payload: pack,
		});
		console.log(state);
	}
	//remove from cart
	function removeFromCart(id) {
		dispatch({
			type: 'REMOVE_FROM_CART',
			payload: id,
		});
	}

	//check for cart items in local storage

	// const setCartLocalStorage = () => {
	// 	localStorage.setItem('cartItems', JSON.stringify(state.cart));
	// };

	return (
		<GlobalContext.Provider
			value={{
				userInfo: state.userInfo,
				cart: state.cart,
				checkForToken,
				logoutUser,
				addToCart,
				removeFromCart,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
