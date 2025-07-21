import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import LoginPage from './components/LoginPage/LoginPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/Route/ProtectedRoute';
import { ProductProvider } from './context/ProductContext'; // Import du contexte des produits
import Admin from './components/Admin/Admin';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
