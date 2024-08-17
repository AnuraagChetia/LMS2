import "./App.css";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//pages
import HomePage from "./pages/Home/HomePage";
import AuthPage from "./pages/Auth/AuthPage";
import MyLearningPage from "./pages/MyLearning/MyLearningPage";
import CoursesPage from "./pages/Courses/CoursesPage";
import SingleCoursePage from "./pages/Courses/SingleCoursePage";
import CartPage from "./pages/Cart/CartPage";
import CoursePlayerPage from "./pages/Courses/CoursePlayerPage";
import TeacherDashboardPage from "./pages/Dashboard/TeacherDashboardPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import AdminDashboard from "./components/Dashboards/AdminDashboard/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import React from "react";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import CareerPage from "./pages/Career/CareerPage";
import JobOpeningPage from "./pages/Career/JobOpeningPage";

function App() {
  const user = useSelector((state) => state.user);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/career",
      element: <CareerPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/career/:jobId",
      element: <JobOpeningPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/contact-us",
      element: <ContactPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/user/:page/:resetId?",
      element: <AuthPage />,
    },
    {
      path: "/my-courses",
      element: user.token == "" ? <AuthPage /> : <MyLearningPage />,
    },
    {
      path: "/courses/:category",
      element: <CoursesPage />,
    },
    {
      path: "/course/:courseId",
      element: <SingleCoursePage />,
    },
    {
      path: "/cart",
      element: user.token == "" ? <AuthPage /> : <CartPage />,
    },
    {
      path: "/:courseId",
      element: user.token == "" ? <AuthPage /> : <CoursePlayerPage />,
    },
    {
      path: "/dashboard/teacher/:tab?/:courseTitle?/:moduleTitle?/:lectureTitle?",
      element: user.token == "" ? <AuthPage /> : <TeacherDashboardPage />,
    },
    {
      path: "/dashboard/admin/:tab?/:subTab?/:jobId?",
      element: user.token == "" ? <AuthPage /> : <AdminDashboard />,
    },
    {
      path: "/user/settings/:tab?",
      element: user.token == "" ? <AuthPage /> : <SettingsPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
