import { DispatchAction, UsersListItem } from '@modules/chat/common';

const usersListReducer = (state: UsersListItem[], action: DispatchAction) => {
	switch (action.type) {
		case 'push': {
			const contains = state.find((item) => item.username === action.payload.username);
			if (contains) return state;
			return [...state, action.payload];
		}
		case 'removeByUsername': {
			const username = action.payload;
			const idx = state.findIndex((item) => item.username === username);
			return [...state.slice(0, idx), ...state.slice(idx + 1)];
		}
		case 'clear':
			return [];
	}

	return state;
};

export default usersListReducer;
