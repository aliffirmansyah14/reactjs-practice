import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import { ThemeProvider } from "./context/theme-context";
import { lazy, Suspense } from "react";
import Loadingspinner from "./components/shared/loading-spinner";
const FormOtpPage = lazy(() => import("@/pages/form-otp"));
const CounterBoxPage = lazy(() => import("@/pages/counter-box"));
const TimelinePage = lazy(() => import("@/pages/timeline"));

const App = () => {
	return (
		<ThemeProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/form-otp"
					element={
						<Suspense fallback={<Loadingspinner />}>
							<FormOtpPage />
						</Suspense>
					}
				/>
				<Route
					path="/counter-box"
					element={
						<Suspense fallback={<Loadingspinner />}>
							<CounterBoxPage />
						</Suspense>
					}
				/>
				<Route
					path="/timeline"
					element={
						<Suspense fallback={<Loadingspinner />}>
							<TimelinePage />
						</Suspense>
					}
				/>
			</Routes>
		</ThemeProvider>
	);
};

export default App;
