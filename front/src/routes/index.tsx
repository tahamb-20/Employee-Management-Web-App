import { Navigate, RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Conges from "../pages/Conges";
import Utilisateur from "../pages/Utilisateur";
import Societe from "../pages/Societe";
import Presence from "../pages/Presence";
import Home from "../pages/Home";
import Taches from "@/pages/Taches";
import SignIn from "@/pages/sign/SignIn";
import SignUp from "@/pages/sign/SignUp";
import Profile from "@/pages/Profile";

const routes: RouteObject[] = [
	{
		path: "dashboard",
		element: <Layout />,
		children: [
			{
				children: [
					{
						path: "Tasks",
						element: <Boards />,
					},
					{
						path: "Utilisateurs",
						element: <Utilisateur />,
					},
					{
						path: "Taches",
						element: <Taches />,
					},
					{
						path: "Conges",
						element: <Conges />,
					},
					{
						path: "Societe",
						element: <Societe />,
					},
					{
						path: "Presence",
						element: <Presence />,
					},
					{
						path: "Home",
						element: <Home />,
					},
					{
						path: "Profile",
						element: <Profile />,
					},
					
					{
						path: "*",
						element: <p>There's nothing here: 404!</p>,
					},
				],
			},
		],
	},
	{
		path: "sign-in",
		element: <SignIn />,
	},
	{
		path: "sign-up",
		element: <SignUp />,
	},
	  { path: "*", element: <Navigate to="/sign-in" replace /> },

];

export default routes;
