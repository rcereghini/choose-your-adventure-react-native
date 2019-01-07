
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

//
// Initial State 
// 

const initialState = {
    favoriteAnimal: "duck",
    selectedItem: null,
    authenticated: true,
    userName: '',
}

// 
// Reducer...
// 


const reducer = (state = initialState, action) => {
    switch(action.type){
        case "setFavoriteAnimal": return { ...state, favoriteAnimal: action.value};
        case "userAuthenticated": return { ...state, authenticated: action.value};
        case "setSelectedItem": return { ...state, selectedItem: action.value}
        case "setUserName": return { ...state, userName: action.value}

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

const setSelectedItem = (selectedItem) => {
    return {
        type: "setSelectedItem",
        value: selectedItem
    }
}

const setUserName = (name) => {
    return {
        type: "setUserName",
        value: name
    }
}

export { setFavoriteAnimal, userAuthenticated, setSelectedItem, setUserName }