import { Button } from "@/components/ui/button";
import { useState } from "react";

const Home = () => {
	const [count, setCount] = useState(0);
	return (
		<div className="max-w-md mx-auto py-10">
			<h1 className="font-semibold">Hello world !</h1>
			<Button onClick={() => setCount(count + 1)}>{count} likes</Button>
		</div>
	);
};

export default Home;
