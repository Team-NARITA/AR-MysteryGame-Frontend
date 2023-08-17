import React from "react";
import {Route, Routes} from "react-router";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RouteAuthGuard } from "./pages/common/RouteAuthGuard";
import { AuthUserProvider } from "./network/auth/AuthUserProvider";

function App() {
    return (
        <AuthUserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RouteAuthGuard component={<HomePage />} redirect="/login" />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthUserProvider>
    );
}

export default App;
