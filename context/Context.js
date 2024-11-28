import {createContext,useEffect,useReducer} from "react"
import Reducer from "./Reducer";

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    try {
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
};
const INITIAL_STATE = {
    user:getUserFromLocalStorage(),
    isFetching: false,
    error: false,
  };
export const Context=createContext(INITIAL_STATE);

export const ContextProvider= ({children})=>{
    const [state,dispatch] =useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user));

    },[state.user])
    
    return(
        <Context.Provider value={
            {user: state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
            }
        }>
            {children}
        </Context.Provider>
    )
}