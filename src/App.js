import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './components/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Services from './components/Services';
import Feature from './components/Feature';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Collaborators from './components/Collaborators';
import Deals from './components/Deals';
import About from './components/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Contact from './components/Contact';
import ProductsPage from './components/Product';
import TestimonialPage from './components/Testimonials';
import AdminDashboard from './admin/AdminDashboard';
import CategoriesPage from './admin/Cat';
import AdminNavbar from './admin/Adminnavbar';
import AdminProductsPage from './admin/AdminProductsPage';
import User from './admin/User';
import AdminOrdersPage from './admin/AdminOrdersPage';
import AdminFeedback from './admin/AdminFeedback';
import EventPage from './components/EventPage';
import { Element } from 'react-scroll';
import AdminEventPage from './admin/AdminEventPage';
import PaymentPage from './components/PaymentPage';
import OrderSuccess from './components/OrderSuccess';
import Profile from './components/Profile';
import BlogPage from './components/Blog';
import AdminBlogPage from './admin/AdminBlogPage';

export const AuthContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      <Router>
        <Routes>
          <Route path="/signup" element={<NoNavbar element={<SignUp />} />} />
          <Route path="/login" element={<NoNavbar element={<Login />} />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<><HomePage /></>} />
            <Route path="about" element={<AboutPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="paymentpage" element={<PaymentPage />} />
            <Route path="ordersuccess" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="product/*" element={
              <>
                <ProductsPage />
                <Footer />
              </>
            } />
            <Route path="admin" element={
              <>
                <AdminNavbar />
                <AdminDashboard />
                <Footer />
              </>
            } />
            <Route path="admin/categories" element={
              <>
                <AdminNavbar />
                <CategoriesPage />
                <Footer />
              </>
            } />
            <Route path="admin/product" element={
              <>
                <AdminNavbar />
                <AdminProductsPage />
                <Footer />
              </>
            } />
            <Route path="admin/orders" element={
              <>
                <AdminNavbar />
                <AdminOrdersPage />
                <Footer />
              </>
            } />
            <Route path="admin/feedback" element={
              <>
                <AdminNavbar />
                <AdminFeedback />
                <Footer />
              </>
            } />
            <Route path="admin/users" element={
              <>
                <AdminNavbar />
                <User />
                <Footer />
              </>
            } />
            <Route path="admin/blogs" element={
              <>
                <AdminNavbar />
                <AdminBlogPage />
                <Footer />
              </>
            } />
            <Route path="admin/events" element={
              <>
                <AdminNavbar />
                <AdminEventPage />
                <Footer />
              </>
            } />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <Deals />
            <Feature />
            <EventPage />
            <Footer />
          </>
        } />
        <Route path="about" element={<AboutPage />} />
        <Route path="/blogs" element={<><BlogPage /><Footer/></>} />
        <Route path="product/*" element={<><ProductsPage /><Footer/></>} />
        <Route path="contact" element={<><Contact /><Footer/></>} />
        <Route path="paymentpage" element={<PaymentPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="ordersuccess" element={<OrderSuccess />} />
        <Route path="admin" element={
          <>
            <AdminNavbar />
            <AdminDashboard />
            <Footer />
          </>
        } />
        <Route path="admin/categories" element={
          <>
            <CategoriesPage />
            <Footer />
          </>
        } />
        <Route path="admin/product" element={
          <>
            <AdminNavbar />
            <AdminProductsPage />
            <Footer />
          </>
        } />
         <Route path="admin/blogs" element={
          <>
            <AdminNavbar />
            <AdminBlogPage />
            <Footer />
          </>
        } />
        <Route path="admin/feedback" element={
          <>
            <AdminNavbar />
            <AdminFeedback />
            <Footer />
          </>
        } />
        <Route path="admin/orders" element={
          <>
            <AdminNavbar />
            <AdminOrdersPage />
            <Footer />
          </>
        } />
        <Route path="admin/events" element={
          <>
            <AdminNavbar />
            <AdminEventPage />
            <Footer />
          </>
        } />
        <Route path="admin/users" element={
          <>
            <AdminNavbar />
            <User />
            <Footer />
          </>
        } />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};

const AboutPage = () => {
  return (
    <>
      <About />
      <Element name="services">
        <Services />
      </Element>
      <TestimonialPage />
      <Collaborators />
      <Footer />
    </>
  );
};


const NoNavbar = ({ element }) => {
  return (
    <>
      {element}
    </>
  );
};

export default App;
