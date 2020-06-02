import { combineReducers } from 'redux';
import user from './user_reducer';
import chat from './chat_reducer';
import movie from './movieReducer';
import genre from './genreReducer';

const rootReducer = combineReducers({
    user,
    chat,
    movie,
    genre,
});

export default rootReducer;