import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
const Layout = lazy(() => import("./layout/Layout.js"))
const AuthLayout = lazy(() => import("./layout/AuthLayout.js"))
const AccountLayout = lazy(() => import("./layout/AccountLayout.js"))
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.js"))
const Help = lazy(() => import("./pages/help/Help.js"))
const PersonalInfo = lazy(() => import("./pages/account-settings/personal-info/PersonalInfo.js"))
const ChangePassword = lazy(() => import("./pages/account-settings/change-password/ChangePassword.js"))
const Company = lazy(() => import("./pages/account-settings/company-info/CompanyInfo.js"))
const CreateJob = lazy(() => import("./pages/job/create-job/CreateJob.js"))
const NotFound = lazy(() => import("./pages/errors/NotFound"))
const Login = lazy(() => import("./pages/auth/login/Login.js"))
const Register = lazy(() => import("./pages/auth/register/Register.js"))
const CreatedJobs = lazy(() => import("./pages/job/created-jobs/CreatedJobs.js"))
const Services = lazy(() => import("./pages/services/Services.js"))
const CVsManagement = lazy(() => import("./pages/cv-management/CVSManagement.js"))
const RecruitmentCampaigns = lazy(() => import("./pages/recruitment-campaigns/RecruitmentCampaigns.js"))
// import withProtected from "./shared/components/secure/withProtected";

// const ProtectedLayout = withProtected(Layout)

export const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        // element: <ProtectedLayout/>,
        element: <Layout/>,
        children: [
            {
                id: 'dashboard',
                index: true,
                element: <Dashboard/>,
            },
            {
                id: 'services',
                path: 'services',
                element: <Services/>,
            },
            {
                id: 'create-job',
                path: 'create-job',
                element: <CreateJob/>,
            },
            {
                id: 'created-jobs',
                path: 'jobs',
                element: <CreatedJobs/>,
            },
            {
                id: 'recruitment-campaigns',
                path: 'recruitment-campaigns',
                element: <RecruitmentCampaigns/>,
            },
            {
                id: "cvs-management",
                path: "cvs-management",
                element: <CVsManagement/>,
            },
            {
                id: 'help',
                path: 'help',
                element: <Help/>,
            },
            {
                id: 'account-settings',
                path: 'account/settings',
                element: <AccountLayout/>,
                children: [
                    {
                        id: 'my-info',
                        index: true,
                        element: <PersonalInfo/>,
                    },
                    {
                        id: 'change-password',
                        path: "password",
                        element: <ChangePassword/>,
                    },
                    {
                        id: 'company-info',
                        path: "company",
                        element: <Company/>,
                    },
                ]
            },
                
        ]
    },
    {
        id: "auth",
        path: "/",
        element: <AuthLayout/>,
        children: [
            {
                id: "login",
                path: "login",
                element: <Login/>
            },
            {
                id: "register",
                path: "register",
                element: <Register/>
            },
        ]
    },
    {
        id: "not-found",
        path: "*",
        element: <NotFound/>
    },
])