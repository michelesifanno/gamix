import {
    createBrowserRouter,
  } from "react-router-dom";
  import Root from '../pages/Root';
  import Migliori from '../pages/Migliori';
  import Creatori from '../pages/Creatori';
  import Piattaforme from "../pages/Piattaforme";
  import Generi from "../pages/Generi";
  import Genere from "../pages/Genere";
  import Games from "../pages/Games";
  import Nuovi from "../pages/Nuovi";
  import SignIn from "../pages/SignIn";
  import SignUp from "../pages/SignUp";
  import Account from "../pages/Account";
  import Profile from "../pages/Profile";
  import Negozi from "../pages/Negozi";
  import Negozio from "../pages/Negozio";
  import ProtectedRoute from "../components/ProtectedRoutes";
  import NotFoundRoute from "../pages/NotFoundRoute";
  import SingleGame from "../pages/SingleGame";
  import Sign from "../pages/Sign";
  import Search from "../pages/Search";
  import Piattaforma from "../pages/Piattaforma";
  import Creatore from "../pages/Creatore";
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Games />
        },
        {
          path: "/gioco/:slug",
          element: <SingleGame />,
        },
        {
          path: "/search",
          element: <Search />
        },
        {
          path: "migliori",
          element: <Migliori />,
        },
        {
          path: "creatori",
          element: <Creatori />,
        },
        {
          path: "creatore/:slug",
          element: <Creatore />,
        },
        {
          path: "nuove-uscite",
          element: <Nuovi />,
        },
        {
          path: "piattaforme",
          element: <Piattaforme />,
        },
        {
          path: "piattaforma/:slug",
          element: <Piattaforma />,
        },
        {
          path: "generi",
          element: <Generi />,
        },
        {
          path: "/genere/:slug",
          element: <Genere />,
        },
        {
          path: "negozi",
          element: <Negozi />,
        },
        {
          path: "/negozio/:slug",
          element: <Negozio />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/account",
          element: <Account />
        },
        {
          path: "/profile",
          element: <Profile />
        }
      ],
    },
    {
      path: "/",
      element: <Sign />,
      children: [
        {
          path: "login",
          element: <SignIn />,
        },
        {
          path: "register",
          element: <SignUp />,
        },
      ],
    },
  
    {
      path: "*",
      element: <NotFoundRoute />
    }
  ]);
  
  export default router;