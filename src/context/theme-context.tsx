import usePersistState from "@/hooks/usePersistState";
import { createContext, use, useEffect, useMemo, useRef } from "react";

const KEY_THEME_LOCALSTORAGE = "theme";

interface ThemeContextType {
	theme: "light" | "dark" | null;
	setTheme: React.Dispatch<React.SetStateAction<ThemeContextType["theme"]>>;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: null,
	setTheme: () => {},
});

const useThemeContext = () => {
	const context = use(ThemeContext);
	if (context === undefined) {
		throw new Error("Component tidak ada didalam theme provider");
	}
	return context;
};

interface ThemeProviderProps {
	children: React.ReactNode;
}
const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const isFirstRender = useRef(true);
	const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [theme, setTheme] = usePersistState<ThemeContextType["theme"]>(
		KEY_THEME_LOCALSTORAGE,
		isDarkMode ? "dark" : "light"
	);
	useEffect(() => {
		if (isFirstRender.current)
			document.documentElement.classList.add(isDarkMode ? "dark" : "light");
		if (theme && !isFirstRender.current)
			document.documentElement.className = theme;
		isFirstRender.current = false;
	}, [theme]);
	const value = useMemo(() => ({ theme, setTheme }), [theme]);

	return <ThemeContext value={value}>{children}</ThemeContext>;
};

export { useThemeContext, ThemeProvider };
