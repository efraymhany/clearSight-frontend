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

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Doctors from "./pages/Doctors";
// import Register from "./pages/Register";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Login from "./pages/Login";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Services from "./pages/Services";
// import PatientHistory from "./pages/PatientHistory";
// import PatientProfile from "./pages/MyProfile";
// import EditPatientProfile from "./pages/EditProfile";
// import PatientsList from "./pages/PatientsList";
// import DoctorProfile from "./pages/DoctorProfile";
// import EditDoctorProfile from "./pages/DoctorEditProfile";
// import DoctorsList from "./pages/DoctorsList";
// import DoctorSearch from "./pages/SearchDoctorName";
// import AccessList from "./pages/DoctorAccessPatient";
// import { AppContext } from "./context/AppContext";
// import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
// import DoctorPatientHistory from "./pages/DoctorHistory";
// import UploadScanImage from "./pages/ScanDoctor";
// import GrantAccessPage from "./pages/GrantAccess";
// import RevokeAccessPage from "./pages/RevokeAccessPage";
// import DoctorDetails from "./pages/jf";
// import GlaucomaPage from "./pages/Dieses/Glaucoma";
// import DiabeticRetinopathy from "./pages/Dieses/DiabeticRetinopathy";
// import AdminLogin from "./pages/AdminLoign";
// import AdminDoctorsList from "./pages/admin/AdminDoctorList";
// // import ActivateDoctorsList from "./pages/admin/AdminDoctorsList2";
// import ActivateDoctorsList from "./pages/admin/AdminDoctorsList2";
// import AdminActivateDoctor from "./pages/admin/ActivateDoctor";
// import AdminPendingDoctors from "./pages/admin/RejectDoctor";
// import NotFound from "./pages/NotFound";

// const App = () => {
//   // const { token, userData } = useContext(AppContext);

//   return (
//     <div className="mx-4 sm:mx-[10%]">
//       <ToastContainer />
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/doctorsList" element={<DoctorsList />} />
//         <Route path="/doctorSearch" element={<DoctorSearch />} />
//         {/* <Route path="/patientHistory" element={<PatientHistory />} /> */}

//         <Route path="/services" element={<Services />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/glaucomaPage" element={<GlaucomaPage />} />
//         <Route path="/diabeticRetinopathy" element={<DiabeticRetinopathy />} />
//         <Route path="/adminLogin" element={<AdminLogin />} />
//         <Route path="/adminDoctorsList" element={<AdminDoctorsList />} />
//         <Route path="/adminActivateDoctor" element={<AdminActivateDoctor />} />
//         <Route path="/adminPendingDoctors" element={<AdminPendingDoctors />} />
//         <Route path="*" element={<NotFound />} />

//         <Route
//           path="/admin/activate-doctor/:id"
//           element={<ActivateDoctorsList />}
//         />

//         {/* Protected routes for Patient only */}

//         <Route
//           path="/patientProfile"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Patient"]}>
//               <PatientProfile />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/editPatientProfile"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Patient"]}>
//               <EditPatientProfile />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/patientHistory"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Patient"]}>
//               <PatientHistory />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/grant-access/:doctorId"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Patient"]}>
//               <GrantAccessPage />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/revoke-access/:doctorId"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Patient"]}>
//               <RevokeAccessPage />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/doctorDetails"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Patient"]}>
//               <DoctorDetails />
//             </ProtectedRouteByRole>
//           }
//         />

//         {/* Protected routes for Doctor only */}
//         <Route
//           path="/patientsList"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Doctor"]}>
//               <PatientsList />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/doctorProfile"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Doctor"]}>
//               <DoctorProfile />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/editDoctorProfile"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Doctor"]}>
//               <EditDoctorProfile />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/doctorsList"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Doctor"]}>
//               <DoctorsList />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/doctorSearch"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Doctor"]}>
//               <DoctorSearch />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/accessList"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Doctor"]}>
//               <AccessList />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/doctorPatientHistory"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Doctor"]}>
//               <DoctorPatientHistory />
//             </ProtectedRouteByRole>
//           }
//         />
//         <Route
//           path="/uploadScanImage"
//           element={
//             <ProtectedRouteByRole allowedRoles={["Doctor"]}>
//               <UploadScanImage />
//             </ProtectedRouteByRole>
//           }
//         />
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// export default App;
////////////////
// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import DoctorsList from "./pages/DoctorsList";
import DoctorSearch from "./pages/SearchDoctorName";
import Services from "./pages/Services";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PatientHistory from "./pages/PatientHistory";
import PatientProfile from "./pages/MyProfile";
import EditPatientProfile from "./pages/EditProfile";
import PatientsList from "./pages/PatientsList";
import DoctorProfile from "./pages/DoctorProfile";
import EditDoctorProfile from "./pages/DoctorEditProfile";
import AccessList from "./pages/DoctorAccessPatient";
import PatientHistory2 from "./pages/DoctorHistory";
import UploadScanImage from "./pages/ScanDoctor";
import GrantAccessPage from "./pages/GrantAccess";
import RevokeAccessPage from "./pages/RevokeAccessPage";
import DoctorDetails from "./pages/jf";
import GlaucomaPage from "./pages/Dieses/Glaucoma";
import DiabeticRetinopathy from "./pages/Dieses/DiabeticRetinopathy";

import AdminLogin from "./pages/admin/AdminLoign";
import AdminDoctorsList from "./pages/admin/AdminDoctorList";
import ActivateDoctorsList from "./pages/admin/AdminDoctorsList2";
import AdminActivateDoctor from "./pages/admin/ActivateDoctor";
import AdminPendingDoctors from "./pages/admin/RejectDoctor";
import AdminDashboard from "./pages/admin/AdminDashboard";

import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { AppContext } from "./context/AppContext";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
import DashboardLayout from "./pages/admin/DashboardLayout";
import Cataract from "./pages/Dieses/Cataract";
import DocPatientHistory from "./pages/DoctorHistory";
import ActivateAccount from "./pages/ActivateAccount";
// import ScanPatientPage from "./pages/ScanDoctor";
import ScanUpload from "./pages/ScanDoctor";

const App = () => {
  const { userData } = useContext(AppContext); // افتراضياً يوجد userData مع info role

  // إذا حبيت تتحكم بالتصميم حسب نوع المستخدم تقدر تستخدم userData.role
  // لكن هنا سنعرض بشكل عام كل شيء.

  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />

        <Routes>
          {/* صفحات خاصة بالأدمن بدون Navbar و Footer */}
          {/* <Route
            path="/adminDashboard"
            element={
              <ProtectedRouteByRole allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRouteByRole>
            }
          />

          <Route
            path="/adminDoctorsList"
            element={
              <ProtectedRouteByRole allowedRoles={["Admin"]}>
                <>
                  <DashboardLayout />
                  <AdminDoctorsList />
                  <DashboardLayout />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/adminActivateDoctor"
            element={
              <ProtectedRouteByRole allowedRoles={["Admin"]}>
                <AdminActivateDoctor />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/adminPendingDoctors"
            element={
              <ProtectedRouteByRole allowedRoles={["Admin"]}>
                <AdminPendingDoctors />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/admin/activate-doctor/:id"
            element={
              <ProtectedRouteByRole allowedRoles={["Admin"]}>
                <ActivateDoctorsList />
              </ProtectedRouteByRole>
            }
          /> */}
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRouteByRole allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRouteByRole>
            }
          >
            {/* الصفحة الرئيسية في لوحة التحكم */}
            <Route index element={<AdminDoctorsList />} />

            {/* الصفحات الفرعية */}
            <Route
              path="activate-doctor/:id"
              element={<ActivateDoctorsList />}
            />
            <Route path="active-doctors" element={<AdminActivateDoctor />} />
            <Route path="pending-doctors" element={<AdminPendingDoctors />} />
            <Route path="doctor-details/:id" element={<DoctorDetails />} />
          </Route>

          {/* صفحات المستخدمين (Patient و Doctor) مع Navbar و Footer */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/doctorsList"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor", "Patient"]}>
                <>
                  <Navbar />
                  <DoctorsList />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/doctorSearch"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor", "Patient"]}>
                <>
                  <Navbar />
                  <DoctorSearch />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <Services />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/cataract"
            element={
              <>
                <Navbar />
                <Cataract />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />

          {/* مرضى فقط */}
          <Route
            path="/patientProfile"
            element={
              <ProtectedRouteByRole allowedRoles={["Patient"]}>
                <>
                  <Navbar />
                  <PatientProfile />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/editPatientProfile"
            element={
              <ProtectedRouteByRole allowedRoles={["Patient"]}>
                <>
                  <Navbar />
                  <EditPatientProfile />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/patientHistory"
            element={
              <ProtectedRouteByRole allowedRoles={["Patient"]}>
                <>
                  <Navbar />
                  <PatientHistory />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/grant-access/:doctorId"
            element={
              <ProtectedRouteByRole allowedRoles={["Patient"]}>
                <>
                  <Navbar />
                  <GrantAccessPage />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/revoke-access/:doctorId"
            element={
              <ProtectedRouteByRole allowedRoles={["Patient"]}>
                <>
                  <Navbar />
                  <RevokeAccessPage />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/doctorDetails"
            element={
              <ProtectedRouteByRole allowedRoles={["Patient"]}>
                <>
                  <Navbar />
                  <DoctorDetails />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />

          {/* دكاترة فقط */}
          <Route
            path="/patientsList"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor"]}>
                <>
                  <Navbar />
                  <PatientsList />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/doctorProfile"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor"]}>
                <>
                  <Navbar />
                  <DoctorProfile />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/editDoctorProfile"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor"]}>
                <>
                  <Navbar />
                  <EditDoctorProfile />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/accessList"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor"]}>
                <>
                  <Navbar />
                  <AccessList />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/patient-history/:patientId"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor"]}>
                <>
                  <Navbar />
                  <PatientHistory2 />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/scan-upload/:patientId"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor"]}>
                <>
                  <Navbar />
                  <ScanUpload />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />

          <Route
            path="/activateAccount"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor"]}>
                <>
                  <Navbar />
                  <ActivateAccount />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/uploadScanImage"
            element={
              <ProtectedRouteByRole allowedRoles={["Doctor"]}>
                <>
                  <Navbar />
                  <UploadScanImage />
                  <Footer />
                </>
              </ProtectedRouteByRole>
            }
          />

          {/* الأمراض */}
          <Route
            path="/glaucomaPage"
            element={
              <>
                <Navbar />
                <GlaucomaPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/diabeticRetinopathy"
            element={
              <>
                <Navbar />
                <DiabeticRetinopathy />
                <Footer />
              </>
            }
          />

          {/* Admin Login */}
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* صفحة الخطأ */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <NotFound />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
