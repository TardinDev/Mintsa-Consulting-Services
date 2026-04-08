import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from './components/Reusable-ui/LoadingSpinner';
import Homepage from './components/Homepage/Homepage';

// Lazy-loaded routes for code splitting
const ClerkLoginPage = React.lazy(() => import('./components/LoginPage/ClerkLoginPage'));
const ClerkSignUpPage = React.lazy(() => import('./components/LoginPage/ClerkSignUpPage'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage/ErrorPage'));
const Admin = React.lazy(() => import('./components/Admin/Admin'));
const UserProfile = React.lazy(() => import('./components/UserProfile/UserProfile'));
const QuoteRequestPage = React.lazy(() => import('./components/QuoteRequest/QuoteRequestPage'));
const MultiStepQuoteForm = React.lazy(() => import('./components/QuoteRequest/MultiStepQuoteForm'));
const ServiceDetailsPage = React.lazy(() => import('./components/Services/ServiceDetailsPage'));
const BlogPage = React.lazy(() => import('./components/Blog/BlogPage'));
const ClerkProtectedRoute = React.lazy(() => import('./utils/Route/ClerkProtectedRoute'));

const LazySignUp = React.lazy(() =>
  import('@clerk/clerk-react').then(mod => ({ default: mod.SignUp }))
);

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/demande-devis" element={<QuoteRequestPage />} />
        <Route path="/devis-wizard" element={<MultiStepQuoteForm />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/services/:category" element={<ServiceDetailsPage />} />
        <Route path="/login/*" element={<ClerkLoginPage />} />
        <Route path="/signup/*" element={<ClerkSignUpPage />} />
        <Route path="/verify-email" element={<LazySignUp routing="path" path="/verify-email" />} />
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
    </Suspense>
  );
};

export default App;
