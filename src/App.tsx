import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import ClerkLoginPage from './components/LoginPage/ClerkLoginPage';
import ClerkSignUpPage from './components/LoginPage/ClerkSignUpPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import ClerkProtectedRoute from './utils/Route/ClerkProtectedRoute';
import Admin from './components/Admin/Admin';
import UserProfile from './components/UserProfile/UserProfile';
import QuoteRequestPage from './components/QuoteRequest/QuoteRequestPage';
import MultiStepQuoteForm from './components/QuoteRequest/MultiStepQuoteForm';
import ServiceDetailsPage from './components/Services/ServiceDetailsPage';
import BlogPage from './components/Blog/BlogPage';
import { SignUp } from '@clerk/clerk-react';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/demande-devis" element={<QuoteRequestPage />} />
      <Route path="/devis-wizard" element={<MultiStepQuoteForm />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/services/:category" element={<ServiceDetailsPage />} />
      <Route path="/login/*" element={<ClerkLoginPage />} />
      <Route path="/signup/*" element={<ClerkSignUpPage />} />
      <Route path="/verify-email" element={<SignUp routing="path" path="/verify-email" />} />
      <Route
        path="/profile"
        element={
          <ClerkProtectedRoute>
            <UserProfile />
          </ClerkProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ClerkProtectedRoute requireAdmin={true}>
            <Admin />
          </ClerkProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
