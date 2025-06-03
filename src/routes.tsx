import { createBrowserRouter } from "react-router-dom";
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
const ApplicantFiles = lazy(() => import("./pages/applicant-files/ApplicantFiles.js"))
const RecruitmentCampaigns = lazy(() => import("./pages/recruitment-campaigns/RecruitmentCampaigns.js"))
const UpdateJob = lazy(() => import("./pages/job/update-job/UpdateJob.js"))
const ApplicantDetails = lazy(() => import("./pages/applicant-files/ApplicantDetails.js"))
import withProtected from "./shared/components/secure/withProtected";

const ProtectedLayout = withProtected(Layout)

export const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        element: <ProtectedLayout/>,
        // element: <Layout/>,
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
                id: 'update-job',
                path: 'update-job/:jobId',
                element: <UpdateJob/>,
            },
            {
                id: 'recruitment-campaigns',
                path: 'recruitment-campaigns',
                element: <RecruitmentCampaigns/>,
            },
            {
                id: "applicants",
                path: "applicants",
                element: <ApplicantFiles/>,
            },
            {
                id: "applicant-details",
                path: "profile/:profileId",
                element: <ApplicantDetails/>,
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