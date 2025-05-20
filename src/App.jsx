// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Doctors from "./pages/Doctors";
// import Register from "./pages/Register";
// import About from "./pages/About";
// // import MyProfile from "./pages/MyProfile";
// import Contact from "./pages/Contact";
// // import MyAppointments from "./pages/MyAppointments";
// // import Appointment from "./pages/Appointment";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Login from './pages/Login';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Services from "./pages/Services";
//  import PatientHistoryPage from "./pages/History";
// import PatientProfile from "./pages/MyProfile";
// import EditProfile from "./pages/EditProfile";
// import PatientsList from "./pages/DoctorsApi";
// import DoctorProfile from "./pages/DoctorProfile";
// import EditDoctorProfile from "./pages/DoctorEditProfile";
// import DoctorsList from "./pages/DoctorsList";
// import DoctorSearch from "./pages/SearchDoctorName";
// import AccessList from "./pages/DoctorAccessPatient";


// const App = () => {
//   return (
//     <div className="mx-4 sm:mx-[10%]">
//       <ToastContainer/>
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/patientHistoryPage" element={<PatientHistoryPage />} />
//         <Route path="/patientProfile" element={<PatientProfile />} />
//         <Route path="/editProfile" element={<EditProfile />} />
//         <Route path="/patientsList" element={<PatientsList />} />
//         <Route path="/doctorProfile" element={<DoctorProfile />} />
//         <Route path="/editDoctorProfile" element={<EditDoctorProfile />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/doctorsList" element={<DoctorsList />} />
//         <Route path="/doctorSearch" element={<DoctorSearch />} />
//         <Route path="/accessList" element={<AccessList />} />






//       </Routes>
//       <Footer/>
//     </div>
//   );
// };

// export default App;
///////////////////////////////

import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from "./pages/Services";
import PatientHistoryPage from "./pages/History";
import PatientProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import PatientsList from "./pages/PatientsList";
import DoctorProfile from "./pages/DoctorProfile";
import EditDoctorProfile from "./pages/DoctorEditProfile";
import DoctorsList from "./pages/DoctorsList";
import DoctorSearch from "./pages/SearchDoctorName";
import AccessList from "./pages/DoctorAccessPatient";
import { AppContext } from "./context/AppContext";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";

const App = () => {
  const { token, userData } = useContext(AppContext);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctorsList" element={<DoctorsList />} />
        <Route path="/doctorSearch" element={<DoctorSearch />} />

        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes for Patient only */}
        <Route
          path="/patientHistoryPage"
          element={
            <ProtectedRouteByRole allowedRoles={["Patient"]}>
              <PatientHistoryPage />
            </ProtectedRouteByRole>
          }
        />
        <Route
          path="/patientProfile"
          element={
            <ProtectedRouteByRole allowedRoles={["Patient"]}>
              <PatientProfile />
            </ProtectedRouteByRole>
          }
        />
        <Route
          path="/editProfile"
          element={
            <ProtectedRouteByRole allowedRoles={["Patient"]}>
              <EditProfile />
            </ProtectedRouteByRole>
          }
        />

        {/* Protected routes for Doctor only */}
        <Route
          path="/patientsList"
          element={
            <ProtectedRouteByRole allowedRoles={["Doctor"]}>
              <PatientsList />
            </ProtectedRouteByRole>
          }
        />
        <Route
          path="/doctorProfile"
          element={
            <ProtectedRouteByRole allowedRoles={["Doctor"]}>
              <DoctorProfile />
            </ProtectedRouteByRole>
          }
        />
        <Route
          path="/editDoctorProfile"
          element={
            <ProtectedRouteByRole allowedRoles={["Doctor"]}>
              <EditDoctorProfile />
            </ProtectedRouteByRole>
          }
        />
        <Route
          path="/doctorsList"
          element={
            <ProtectedRouteByRole allowedRoles={["Doctor"]}>
              <DoctorsList />
            </ProtectedRouteByRole>
          }
        />
        <Route
          path="/doctorSearch"
          element={
            <ProtectedRouteByRole allowedRoles={["Doctor"]}>
              <DoctorSearch />
            </ProtectedRouteByRole>
          }
        />
        <Route
          path="/accessList"
          element={
            <ProtectedRouteByRole allowedRoles={["Doctor"]}>
              <AccessList />
            </ProtectedRouteByRole>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
