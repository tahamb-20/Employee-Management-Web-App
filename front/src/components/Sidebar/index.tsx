import { useEffect, useState } from "react";
import {
	AppsOutline,
	GridOutline,
	HomeOutline,
	LogOutOutline,
	NotificationsOutline,
	PeopleOutline,
	PieChartOutline,
} from "react-ionicons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
	const {pathname} = useLocation();
    const navigate = useNavigate();
	const role = localStorage.getItem("role")

	 useEffect(() => {
	  
	   if (!localStorage.getItem("accessToken")) {
		navigate("/sign-in")
	   }
 	}, [location]);
	const [activeNav, setActiveNav] = useState( )
	const navLinks = [
		{
			title: "Home",
			role:["ROLE_ADMIN","ROLE_EMPLOYE"],
			icon: (
				<HomeOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: activeNav  === "Home" || pathname.includes("Home"),
		},
		 
		{
			title: "Utilisateurs",
			role:["ROLE_ADMIN"],
			icon: (
				<AppsOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: activeNav === "Utilisateurs" || pathname.includes("Utilisateurs"),
		},
		{
			title: "Conges",
			role:["ROLE_ADMIN","ROLE_EMPLOYE"],
			icon: (
				<GridOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: activeNav === "Conges" || pathname.includes("Conges"),
		},
		 
		{
			title: "Presence",
			role:["ROLE_ADMIN"],
			icon: (
				<PeopleOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: activeNav ==="Presence" || pathname.includes("Presence"),
		},
		 
	];
	const logout = () => {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("userInfo")
		localStorage.removeItem("role")
		navigate("/sign-in")
	}
	return (
		<div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
			<div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
				<span className="text-orange-400 font-semibold text-xl md:block hidden">Employee MANAGEMENT</span>
 			</div>
			<div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
				{navLinks.map((link) => {
					 return link.role.includes(role) &&(
						<Link
							to={link.title}
							key={link.title}
							className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
								link.active ? "bg-orange-300" : "bg-transparent"
							}`}
							onClick={() => setActiveNav(link.title)}
						>
							{link.icon}
							<span className="font-medium text-[15px] md:block hidden">{link.title}</span>
						</Link>
					);
				})}
				<div onClick={() =>logout()} className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200">
					<LogOutOutline />
					<span className="font-medium text-[15px] md:block hidden" >Log Out</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
