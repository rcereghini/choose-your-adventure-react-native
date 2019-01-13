
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

//
// Initial State 
// 

const initialState = {
    favoriteAnimal: "duck",
    selectedItem: null,
    authenticated: true,
    // fireDisplayName: null,
    userUID: null,
    // userEmail: null,
    // userPhotoURL: null,
}

// 
// Reducer...
// 


const reducer = (state = initialState, action) => {
    switch(action.type){
        case "setFavoriteAnimal": return { ...state, favoriteAnimal: action.value};
        case "userAuthenticated": return { ...state, authenticated: action.value};
        case "setSelectedItem": return { ...state, selectedItem: action.value};
        case "setUserUID": return { ...state, userUID: action.value};
        // case "setFireDisplayName": return { ...state, fireDisplayName: action.value}
        // case "setEmail": return { ...state, userEmail: action.value}
        // case "setPhotoURL": return { ...state, userPhotoURL: action.value}
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

// const setFireDisplayName = (name) => {
//     return {
//         type: "setFireDisplay",
//         value: name
//     }
// }

const setUserUID = (uid) => {
    return {
        type: "setUserUID",
        value: uid
    }
}

// const setUserEmail = (email) => {
//     return {
//         type: "setUserEmail",
//         value: email
//     }
// }

// const setUserPhotoURL = (url) => {
//     return {
//         type: "setUserPhotoURL",
//         value: url
//     }
// }

export { 
    setFavoriteAnimal, 
    userAuthenticated, 
    setSelectedItem, 
    // setFireDisplayName, 
    setUserUID, 
    // setUserEmail, 
    // setUserPhotoURL 
}