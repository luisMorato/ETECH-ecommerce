import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx';
import './index.css';

import { AuthProvider } from './Context/AuthContext.tsx';
import { LoginModalContextProvider } from './Context/LoginModalContext';
import { RegisterModalContextProvider } from './Context/RegisterModalContext.tsx';
import { SearchContextProvider } from './Context/SearchContext.tsx';
import { ChatBoxModalContextProvider } from './Context/ChatBoxContext.tsx';

//Public
import Home from './Routes/Home.tsx';
import ProductsPage from './Routes/ProductsPage.tsx';
import Search from './Routes/Search.tsx';
import IndividualProduct from './Routes/IndividualProduct.tsx';

//Private
import Profile from './Routes/Private/Profile.tsx';
import Checkout from './Routes/Private/Checkout.tsx';
import ProtectedRoute from './Routes/ProtectedRoute.tsx';
import ErrorBoundary from './Routes/_ErrorBoundary.tsx';

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/products",
      element: <ProductsPage />
    },
    {
      path: "/products/:productId",
      element: <IndividualProduct />
    },
    {
      path: "/profile/:userToken",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      //If no userToken was provided, in this case, it's need to be redirected to the homepage
      path: "/profile",
      element: <Navigate to="/"></Navigate>
    },
    {
      path: "/checkout/:userToken",
      element: (
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      )
    },
    {
      //If no userToken was provided, in this case, it's need to be redirected to the homepage
      path: "/checkout",
      element: <Navigate to="/" />
    },
    {
      path: "/search",
      element: <Search />
    },
    {
      path: "/error",
      element: <ErrorBoundary />,
    },
    {
      path: "*",
      element: <Navigate to="/error" />,
    }
  ]
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer 
      pauseOnHover
    />
    <AuthProvider>
      <RegisterModalContextProvider>
      <LoginModalContextProvider>
          <ChatBoxModalContextProvider>
            <SearchContextProvider>
              <RouterProvider router={router}/>
            </SearchContextProvider>
          </ChatBoxModalContextProvider>
      </LoginModalContextProvider>
      </RegisterModalContextProvider>
    </AuthProvider>
  </React.StrictMode>,
);
