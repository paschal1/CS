import { Navigate, createBrowserRouter } from "react-router-dom";
import Check from "./Pages/Check/Check";
import Admin from "./Pages/Admin/Admin";
import Register from "./Pages/Register/Register";
import Notfound from "./Pages/Register/Notfound";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import AdminRegister from "./Pages/AdminRegister/AdminRegister";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AdminForgotPassword from "./Pages/AdminForgotPassword/AdminForgotPassword";
import AdminPasswordReset from "./Pages/AdminPasswordReset/AdminPasswordReset";
import Courses from "./Pages/Courses/Courses";
import Students from "./Pages/Students/Students";
import StudentAdmin from "./Pages/StudentAdmin/StudentAdmin"
import Layout from "./Layout";
import GusetLayout from "./GuestLayout";
import Result from "./Pages/Results/Results";



const router = createBrowserRouter([
    {
        path: '/',
        element: <GusetLayout />,
        children: [

            {
                path: '/',
                element: <Home />

            },

            {
                path: '/register',
                element: <Register />

            },
             {
                path: '/login',
                element: <Login />

            },

            {
                path: '*',
                element: <Notfound />

            },



        ],
    },

    {

        path: '/',
        element: <Layout />,
        children: [



            {
                path: '/',
                element: <Navigate to="/check_result" />

            },

             {
                path: '/check_result',
                element: <Check />

            },
            {
                path: '/admin',
                element: <Admin />

            },

            // {
            //     path: '/admin/register',
            //     element: <AdminRegister/>

            // },
            // {
            //     path: '/admin/register/login',
            //     element: <AdminLogin />

            // },
            {
                path: '/admin/register/login/forgotpass',
                element: <AdminForgotPassword />

            },
            {
                path: '/admin/register/login/forgotpass/passwordrest',
                element: <AdminPasswordReset />

            },
            {
                path: '/result',
                element: <Result />

            },
            {
                path: '/course',
                element: <Courses />

            },
            {
                path: '/student',
                element: <Students />

            },

            {
                path: '/studentadmin',
                element: <StudentAdmin />

            },



        ]






    },

])

export default router;


// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Check from "./Pages/Check/Check";
// import Register from "./Pages/Register/Register";
// // import User from "./Pages/User/User";
// import NotFound from "./Pages/Register/NotFound";

// const AppRouter = () => {
//   return (
//     <Router>
//       {/* <Switch> */}
//         <Route path="/login" component={Check} />
//         <Route path="/register" component={Register} />
//         {/* <Route path="/user" component={User} /> */}
//         <Route path="*" component={NotFound} />
//       {/* </Switch> */}
//     </Router>
//   );
// };

// export default AppRouter;
