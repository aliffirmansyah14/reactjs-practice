import { useEffect, useState } from "react";

const usePersistState = <T>(key: string, initialValue: T) => {
	const [data, setData] = useState<T>(() => {
		const cache = localStorage.getItem(key);
		return cache ? JSON.parse(cache) : initialValue;
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error("Error setting localStorage data:", error);
		}
	}, [data]);

	return [data, setData] as const;
};
export default usePersistState;
