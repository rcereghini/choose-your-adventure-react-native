
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

//
// Initial State 
// 

const initialState = {
    favoriteAnimal: "duck",
    inventory: ["Traveler's Scarf"],
    itemToAdd: "Beginner's Luck",
    authenticated: true
}

// 
// Reducer...
// 


const reducer = (state = initialState, action) => {
    switch(action.type){
        case "setFavoriteAnimal": return { ...state, favoriteAnimal: action.value};
        case "userAuthenticated": return { ...state, authenticated: action.value};

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
        type: `userAuthenticated`,
        value: userId
    }
}

export { setFavoriteAnimal, userAuthenticated }