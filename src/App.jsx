import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import DoctorsList from "./pages/patients/DoctorsList";
import Services from "./pages/patients/Services";
import Register from "./pages/auth/Register";
import About from "./pages/otherpages/About";
import Contact from "./pages/otherpages/Contact";
import Login from "./pages/auth/Login";
import PatientHistory from "./pages/patients/PatientHistory";
import PatientProfile from "./pages/patients/MyProfile";
import EditPatientProfile from "./pages/patients/EditProfile";
import PatientsList from "./pages/doctors/PatientsList";
import DoctorProfile from "./pages/doctors/DoctorProfile";
import EditDoctorProfile from "./pages/doctors/DoctorEditProfile";
import AccessList from "./pages/doctors/DoctorAccessPatient";
import PatientHistory2 from "./pages/doctors/DoctorHistory";
import UploadScanImage from "./pages/doctors/ScanDoctor";
import GrantAccessPage from "./pages/patients/GrantAccess";
import RevokeAccessPage from "./pages/patients/RevokeAccessPage";
import GlaucomaPage from "./pages/Dieses/Glaucoma";
import DiabeticRetinopathy from "./pages/Dieses/DiabeticRetinopathy";
import AdminLogin from "./pages/admin/AdminLoign";
import AdminDoctorsList from "./pages/admin/AdminDoctorList";
import ActivateDoctorsList from "./pages/admin/ActivateDoctorList";
import AdminActivateDoctor from "./pages/admin/ActivateDoctor";
import AdminPendingDoctors from "./pages/admin/RejectDoctor";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/otherpages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppContext } from "./context/AppContext";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
import DashboardLayout from "./pages/admin/DashboardLayout";
import Cataract from "./pages/Dieses/Cataract";
import DocPatientHistory from "./pages/doctors/DoctorHistory";
import ActivateAccount from "./pages/doctors/ActivateAccount";
// import ScanPatientPage from "./pages/ScanDoctor";
import ScanUpload from "./pages/doctors/ScanDoctor";
import ResetPassword from "./pages/auth/ResetPassowrd";
import GetCode from "./pages/auth/Getcode";

const App = () => {
  // const { userData } = useContext(AppContext);

  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />

        <Routes>
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
            <Route
              path="adminActivateDoctor"
              element={<AdminActivateDoctor />}
            />


            <Route path="adminPendingDoctors" element={<AdminPendingDoctors />} />
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
          <Route
            path="/getCode"
            element={
              <>
                <Navbar />
                <GetCode />
                <Footer />
              </>
            }
          />
          <Route
            path="/resetPassword"
            element={
              <>
                <Navbar />
                <ResetPassword />
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
          {/* <Route
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
          /> */}

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
