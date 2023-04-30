import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import  Home  from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const AppRoutes = [
    {
        index: true,
        path: '/',
        element: <Home />
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp/>
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    }
];

export default AppRoutes;
