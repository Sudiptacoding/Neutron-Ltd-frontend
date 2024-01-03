import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error/Error";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import AllContract from "../pages/AllContract/AllContract";
import AddContract from "../pages/AddContract/AddContract";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/registration",
                element: <Registration></Registration>,
            },
            {
                path: "/contractlist",
                element: <ProtectedRoute><AllContract></AllContract></ProtectedRoute>,
            },
            {
                path: "/addcontract",
                element: <ProtectedRoute><AddContract></AddContract></ProtectedRoute>,
            },
        ],
    },
]);
export default router;