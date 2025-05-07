import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Register from "./pages/Register";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from './pages/Login';
import MyProfile2 from './pages/EditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from "./pages/EditProfile";
import Services from "./pages/Services";
import PatientHistory from "./pages/History";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/services" element={<Services />} />

        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myProfile2" element={<MyProfile2 />} />
        <Route path="/editProfile" element={<EditProfile />} />

        <Route path="/patientHistory" element={<PatientHistory />} />


      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
