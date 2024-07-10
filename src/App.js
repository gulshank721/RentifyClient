import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PropertyPage from "./pages/PropertyPage";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import SellerDashboardPage from "./pages/SellerDashBoardPage";
import ProfilePage from "./pages/ProfilePage";
import { PropertyProvider } from "./context/propertiesContext";

const ProtectedRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const navigate = useNavigate();

  // if (!auth.user) {
  //   console.log("login redirect");
  //   <Navigate to='/login'/>
  //   return null; // Return null to prevent rendering the protected content
  // }else{
  //   return (
  //     <div>
  //       {children}
  //     </div>
  //   );
  // }

  return !auth.user ? <Navigate to="/login" /> : { children };
};

// export default ProtectedComponent;

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <PropertyProvider>
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
                    <ProtectedRoute>
                      <SellerDashboardPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </PropertyProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
