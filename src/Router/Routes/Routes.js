import { async } from "@firebase/util";
import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/checkout/:id',
                element:
                    <PrivateRoute>
                        <Checkout></Checkout>
                    </PrivateRoute>,
                loader: async ({ params }) => fetch(`https://genius-car-server-xi.vercel.app/services/${params.id}`)
            },
            {
                path: '/orders',
                element:
                    <PrivateRoute>
                        <Orders></Orders>
                    </PrivateRoute>,
            }
        ]
    }
]);