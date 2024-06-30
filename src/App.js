import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PropertyPage from "./pages/PropertyPage";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import SellerDashboardPage from "./pages/SellerDashBoardPage";

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar/>}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/properties/:id" element={<PropertyPage />} />
              <Route path="/seller-dashboard" element={<SellerDashboardPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
