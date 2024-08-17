import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Signup from "../../components/Authentications/SIgnup";
import Login from "../../components/Authentications/Login";
import { useParams } from "react-router-dom";
import ForgetPassword from "../../components/Authentications/ForgetPassword";
import ResetPassword from "../../components/Authentications/ResetPassword";

const AuthPage = () => {
  const { page } = useParams();
  return (
    <>
      <Navbar />
      {page === "login" && <Login />}
      {page === "signup" && <Signup />}
      {page === "forget-password" && <ForgetPassword />}
      {page === "reset-password" && <ResetPassword />}
      {page !== "reset-password" &&
        page !== "login" &&
        page !== "signup" &&
        page !== "forget-password" && <Signup />}
      <Footer />
    </>
  );
};

export default AuthPage;
