import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    isLoggedIn: false,
    user: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUserInfo) {
            dispatch({ type: "LOGIN", payload: { user: storedUserInfo } });
        }
    }, []);
    const login = (user) => {
        console.log("Logged in user:", user);
        localStorage.setItem("userInfo", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: { user } });
    };
    const logout = () => {
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
    };

    return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
