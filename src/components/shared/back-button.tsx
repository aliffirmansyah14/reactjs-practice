import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	return (
		<Button
			variant={"ghost"}
			onClick={handleGoBack}
			className="group hover:bg-background"
		>
			<ArrowLeft />
			<span className="group-hover:underline">kembali</span>
		</Button>
	);
};
export default BackButton;
