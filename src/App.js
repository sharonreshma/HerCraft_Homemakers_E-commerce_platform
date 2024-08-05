import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { Element } from 'react-scroll'; // Import Element
import AdminEventPage from './admin/AdminEventPage';

export const AuthContext = React.createContext();

function App() {
  const [role, setRole] = useState(null);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      <Router>
        <Routes>
          <Route path="/signup" element={<NoNavbar element={<SignUp />} />} />
          <Route path="/login" element={<NoNavbar element={<Login />} />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product/*" element={
              <>
                <ProductsPage />
                <Footer />
              </>
            } />
            <Route path="admin" element={
              role === 'admin' ? (
                <>
                  <AdminNavbar />
                  <AdminDashboard />
                  <Footer />
                </>
              ) : (
                <>
                  <HomePage />
                  <Deals />
                  <Feature />
                  <EventPage />
                  <Footer />
                </>
              )
            } />
            <Route path="admin/categories" element={
              role === 'admin' ? (
                <>
                  <AdminNavbar />
                  <CategoriesPage />
                  <Footer />
                </>
              ) : (
                <>
                  <HomePage />
                  <Deals />
                  <Feature />
                  <EventPage />
                  <Footer />
                </>
              )
            } />
            <Route path="admin/product" element={
              role === 'admin' ? (
                <>
                  <AdminNavbar />
                  <AdminProductsPage />
                  <Footer />
                </>
              ) : (
                <>
                  <HomePage />
                  <Deals />
                  <Feature />
                  <EventPage />
                  <Footer />
                </>
              )
            } />
            <Route path="admin/orders" element={
              role === 'admin' ? (
                <>
                  <AdminNavbar />
                  <AdminOrdersPage />
                  <Footer />
                </>
              ) : (
                <>
                  <HomePage />
                  <Deals />
                  <Feature />
                  <EventPage />
                  <Footer />
                </>
              )
            } />
            <Route path="admin/feedback" element={
              role === 'admin' ? (
                <>
                  <AdminNavbar />
                  <AdminFeedback />
                  <Footer />
                </>
              ) : (
                <>
                  <HomePage />
                  <Deals />
                  <Feature />
                  <EventPage />
                  <Footer />
                </>
              )
            } />
            <Route path="admin/users" element={
              role === 'admin' ? (
                <>
                  <AdminNavbar />
                  <User />
                  <Footer />
                </>
              ) : (
                <>
                  <HomePage />
                  <Deals />
                  <Feature />
                  <EventPage />
                  <Footer />
                </>
              )
            } />
            <Route path="admin/events" element={
              role === 'admin' ? (
                <>
                  <AdminNavbar />
                  <AdminEventPage />
                  <Footer />
                </>
              ) : (
                <>
                  <HomePage />
                  <Deals />
                  <Feature />
                  <EventPage />
                  <Footer />
                </>
              )
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
  const { role } = React.useContext(AuthContext);

  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/signup' && (role === 'admin' ? <AdminNavbar /> : <Navbar />)}
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <Deals />
            <Feature />
            <EventPage /> {/* Ensure EventPage appears after Feature */}
            <Footer />
          </>
        } />
        <Route path="about" element={<AboutPage />} />
        <Route path="product/*" element={<><ProductsPage /><Footer/></>} />
        <Route path="contact" element={<><Contact /><Footer/></>} />
        <Route path="admin" element={
          role === 'admin' ? (
            <>
              <AdminDashboard />
              <Footer />
            </>
          ) : (
            <>
              <HomePage />
              <Deals />
              <Feature />
              <EventPage />
              <Footer />
            </>
          )
        } />
        <Route path="admin/categories" element={
          role === 'admin' ? (
            <>
              <CategoriesPage />
              <Footer />
            </>
          ) : (
            <HomePage />
          )
        } />
        <Route path="admin/product" element={
          role === 'admin' ? (
            <>
              <AdminProductsPage />
              <Footer />
            </>
          ) : (
            <>
              <HomePage />
              <Deals />
              <Feature />
              <EventPage />
              <Footer />
            </>
          )
        } />
        <Route path="admin/feedback" element={
          role === 'admin' ? (
            <>
              <AdminFeedback />
              <Footer />
            </>
          ) : (
            <>
              <HomePage />
              <Deals />
              <Feature />
              <EventPage />
              <Footer />
            </>
          )
        } />
        <Route path="admin/orders" element={
          role === 'admin' ? (
            <>
              <AdminOrdersPage />
              <Footer />
            </>
          ) : (
            <>
              <HomePage />
              <Deals />
              <Feature />
              <EventPage />
              <Footer />
            </>
          )
        } />
          <Route path="admin/events" element={
          role === 'admin' ? (
            <>
              <AdminEventPage />
              <Footer />
            </>
          ) : (
            <>
              <HomePage />
              <Deals />
              <Feature />
              <EventPage />
              <Footer />
            </>
          )
        } />
        <Route path="admin/users" element={
          role === 'admin' ? (
            <>
              <User />
              <Footer />
            </>
          ) : (
            <>
              <HomePage />
              <Deals />
              <Feature />
              <EventPage />
              <Footer />
            </>
          )
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
