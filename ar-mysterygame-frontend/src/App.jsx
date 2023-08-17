import React from "react";
import {Route, Routes} from "react-router";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RouteAuthGuard } from "./pages/common/RouteAuthGuard";
import { AuthUserProvider } from "./network/auth/AuthUserProvider";
import NaritalkPage from "./pages/NaritalkPage";

function App() {
    return (
        <BrowserRouter>
            <AuthUserProvider>
                <Routes>
                    <Route path="/" element={<RouteAuthGuard component={<HomePage />} redirect="/login" />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                </Routes>
            </AuthUserProvider>
        </BrowserRouter>
    );
}

export default App;
