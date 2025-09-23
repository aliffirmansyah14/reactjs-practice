import { useThemeContext } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import { memo } from "react";

const ToggleButton = () => {
	const { theme, setTheme } = useThemeContext();
	console.log("re render toggle");

	const handleClickToggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};
	return (
		<Button
			variant={"destructive"}
			onClick={handleClickToggleTheme}
			className="w-[100px]"
		>
			{theme === "dark" ? "Light" : "Dark"}
		</Button>
	);
};

export default ToggleButton;
