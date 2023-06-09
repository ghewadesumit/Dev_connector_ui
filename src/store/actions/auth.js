import axios from 'axios';
import { setAlert } from './alert';
import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';
import { baseUrl } from '../../constants/env';

//Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);

		try {
			const res = await axios.get(`${baseUrl}/api/auth`);

			dispatch({
				type: actionTypes.USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({ type: actionTypes.AUTH_ERROR });
		}
	}
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
	// Stating the data type to be sent
	const config = { headers: { 'Content-Type': 'application/json' } };

	// Preparing the data to be sent
	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post(`${baseUrl}/api/users`, body, config);

		dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: res.data });

		// dispatch(loadUser());

		dispatch(setAlert('Registeration Successful', 'success'));
	} catch (err) {
		// const errors = err.response.data.errors;

		// if () {
		// 	errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		// }

		dispatch(setAlert(err.message, 'danger'));

		dispatch({ type: actionTypes.REGISTER_FAIL });
	}
};

//Login User
export const login = (email, password) => async (dispatch) => {
	// Stating the data type to be sent
	const config = { headers: { 'Content-Type': 'application/json' } };

	// Preparing the data to be sent
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(`${baseUrl}/api/auth`, body, config);

		dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data });
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({ type: actionTypes.LOGIN_FAIL });
		// console.error(err.message);
	}
};

// Logout
export const logout = () => (dispatch) => {
	dispatch({ type: actionTypes.LOGOUT });
	dispatch({ type: actionTypes.CLEAR_PROFILE });
};
