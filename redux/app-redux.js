
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

//
// Initial State 
// 

const initialState = {
    favoriteAnimal: "duck",
    selectedItem: null,
    authenticated: true
}

// 
// Reducer...
// 


const reducer = (state = initialState, action) => {
    switch(action.type){
        case "setFavoriteAnimal": return { ...state, favoriteAnimal: action.value};
        case "userAuthenticated": return { ...state, authenticated: action.value};
        case "setSelectedItem": return { ...state, selectedItem: action.value}

        default: return state;
    }
    return state;

}

// 
//  Store ...
// 

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

// 
// Action Creators...
// 

const setFavoriteAnimal = (favoriteAnimal) => {
    return {
        type: "setFavoriteAnimal",
        value: favoriteAnimal
    }
}

const userAuthenticated = (userId) => {
    return {
        type: "userAuthenticated",
        value: userId
    }
}

const setSelectedItem = (item) => {
    return {
        type: "setSelectedItem",
        value: item
    }
}

export { setFavoriteAnimal, userAuthenticated, setSelectedItem }