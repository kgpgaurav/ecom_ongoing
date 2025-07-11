import React from 'react'
import { useEffect,useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

import HomePage from './pages/HomePage'
import Demo from './pages/demo'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
// import CartPage from "./pages/CartPage";
// import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
// import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from './components/Navbar'
import { useUserStore } from '../stores/useUserStore'
import { useCartStore } from '../stores/useCartStore'
// import LoadingSpinner from './components/LoadingSpinner'

const App = () => {
  const {user,checkAuth, checkingAuth} = useUserStore();
  const {getCartItems} = useCartStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log("user", user);

  useEffect(() => {
      if(!user) return;
      getCartItems();
  },[getCartItems,user])

  // if(checkingAuth) return <LoadingSpinner/>
  return (
    <div className="bg-gray-900 min-h-screen relative text-white overflow-hidden">

      {/* Background gradient */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
          </div>
        </div>
        {/* gradient is under the whole thing just under everything else */}
        <div className="relative z-50 pt-20">
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={!user? <LoginPage /> :  <Navigate to='/'/> } />
            <Route path="/signup" element={!user? <SignUpPage /> :  <Navigate to='/'/>} />
            <Route path="/category/:category" element={<CategoryPage/>} />
            <Route path="/admin-dashboard" element={user?.role==="admin"? <AdminPage/>: <Navigate to='/' />}/>
          </Routes>
        </div>
        <Toaster/>
    </div>
  );
}

export default App;