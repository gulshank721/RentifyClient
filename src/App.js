import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, redirect, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PropertyPage from "./pages/PropertyPage";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import SellerDashboardPage from "./pages/SellerDashBoardPage";
import ProfilePage from "./pages/ProfilePage";


const ProtectedComponent = ({ children }) => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const navigate = useNavigate();


  if (!auth.user) {
    console.log("login redirect");
    navigate('/login');
    return null; // Return null to prevent rendering the protected content
  }

  return (
    <div>
      {children}
    </div>
  );
};

// export default ProtectedComponent;

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} /> 
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/properties/:id" element={<PropertyPage />} />
              <Route
                path="/seller-dashboard"
                element={
                  <ProtectedComponent>
                    <SellerDashboardPage />
                  </ProtectedComponent>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
