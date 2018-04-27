import {MESSAGE_ADD, MESSAGE_REMOVE} from "../../shared/constants/actions";


export const messageShow = payload =>
  dispatch =>
    dispatch({
      payload,
      type: MESSAGE_ADD
    });

export const messageRemove = payload =>
  dispatch =>
    dispatch({
      payload,
      type: MESSAGE_REMOVE
    });
