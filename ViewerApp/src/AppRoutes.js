import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import  Home  from "./components/Home";
import Profile from "./components/Profile";

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
        path: '/fetch-data',
        element: <FetchData />
    }
];

export default AppRoutes;
