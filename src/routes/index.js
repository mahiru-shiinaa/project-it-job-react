import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/home";
import JobDetail from "../pages/JobDetail";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Search from "../pages/Search";
import PrivateRoutes from "../components/PrivateRoutes";
import Dashboard from "../pages/Dashborad";
import InfoCompany from "../pages/InfoCompany";
import JobManage from "../pages/JobManage";
import CreateJob from "../pages/JobManage/CreateJob";
import JobDetailAdmin from "../pages/JobDetail/JobDetailAdmin";
import CVManage from "../pages/CVManage";
import CVDetail from "../pages/CVManage/CVDetail";
import LayoutAdmin from "../layout/LayoutAdmin";
import Company from "../pages/Company";
import CompanyDetail from "../pages/Company/CompanyDetail";
import CheckEmailOtp from "../pages/Register/CheckEmailOtp";
import Forgot from "../pages/Forgot";
import ForgotOtp from "../pages/Forgot/ForgotOtp";
import ResetPassword from "../pages/Forgot/ResetPassword";
import Job from "../pages/Job";

export const routes = [
  /* Public */
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/logout",
        element: <Logout />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/companys/password/forgot",
        element: <Forgot />,
      },
      {
        path: "/companys/password/otp",
        element: <ForgotOtp />,
      },
      {
        path: "/companys/password/reset",
        element: <ResetPassword />,
      },
      {
        path: "/auth/check-email-otp",
        element: <CheckEmailOtp />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "jobs/info/:id",
        element: <JobDetail />,
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "jobs",
        element: <Job />,
      },
      {
        path: "/companys/info/:id",
        element: <CompanyDetail />
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
  /* End Public */

  /* Private */
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />,
          },
          {
            path: "info-company",
            element: <InfoCompany />,
          },
          {
            path: "job-manage",
            element: <JobManage />,
          },
          {
            path: "create-job",
            element: <CreateJob />,
          },
          {
            path: "detail-job/:id",
            element: <JobDetailAdmin />,
          },
          {
            path: "cv-manage",
            element: <CVManage />,
          },
          {
            path: "detail-cv/:id",
            element: <CVDetail />,
          },
        ],
      },
    ],
  },
];
