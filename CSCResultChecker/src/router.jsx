import { Navigate, createBrowserRouter } from "react-router-dom";
import Check from "./Pages/Check/Check";
import Board from "./Pages/Board/Board";
import Register from "./Pages/Register/Register";
import Notfound from "./Pages/Register/Notfound";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Layout from "./Layout";
import GusetLayout from "./GuestLayout";

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
