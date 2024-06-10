import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hook/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
            <ToastContainer
                position="top-right"
                style={{ top: "60px" }}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </BrowserRouter>
    </React.StrictMode>,
);
