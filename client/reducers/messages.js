import {MESSAGE_ADD, MESSAGE_ADD_ALL, MESSAGE_REMOVE, MESSAGE_REMOVE_ALL} from "../../shared/constants/actions";


const messages = [];

export default function messagesReducer(state = messages, action) {
	switch (action.type) {
		case MESSAGE_ADD:
			return [...state, action.payload];
		case MESSAGE_ADD_ALL:
			return [...state, ...action.payload];
		case MESSAGE_REMOVE:
			return state.filter(message => message !== action.payload);
		case MESSAGE_REMOVE_ALL:
			return [];
		default:
			return state;
	}
}
