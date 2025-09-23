import ToggleButton from "@/components/shared/toggle-button";
import { Link } from "react-router-dom";

const links = [
	{
		href: "/form-otp",
		name: "Form otp",
	},
	{
		href: "/counter-box",
		name: "Counter Box",
	},
	{
		href: "/timeline",
		name: "Timeline",
	},
];

const Home = () => {
	return (
		<div className="container mx-auto h-[100svh] flex justify-center items-center">
			<div className="w-md space-y-2">
				<div className="text-center space-y-2">
					<h1 className="text-2xl font-semibold">Iseng aja</h1>
					<ToggleButton />
				</div>
				<ul role="list-link">
					{links.map(link => (
						<li className="font-semibold " key={link.name}>
							<Link to={link.href}>
								- <span className="hover:underline">{link.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Home;
