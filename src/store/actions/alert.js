import { v4 as uuid } from 'uuid';
import * as actionTypes from './types';

export function setAlert(msg, alertType, timeout = 5000){
    return function(dispatch){
    const id = uuid();
    dispatch({
      type: actionTypes.SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(
      () => dispatch({ type: actionTypes.REMOVE_ALERT, payload: id }),
      timeout
    );
  }
}
