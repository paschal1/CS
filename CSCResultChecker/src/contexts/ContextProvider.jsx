import { createContext, useContext } from "react";
import  { useState } from 'react';


const StateContext = createContext({
    // currentUser: null,

    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () =>{}
})

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        // name: "Paschal Nwokeocha",
        // email: "paschalnwokeocha@gmail.com",
        // address: "Choba extension East West Road",
    });
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');


    const setUserToken = (token) => {
       // _setUserToken(token)
        if (token) {
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
    }


    return (
        <StateContext.Provider value={{
            currentUser,
            userToken,
            setCurrentUser,
            setUserToken
        }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)

