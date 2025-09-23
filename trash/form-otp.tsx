import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface FormOtpProps {
	length: number;
}

const FormOtp = ({ length = 4 }: FormOtpProps) => {
	const inputRef = useRef<(HTMLInputElement | null)[]>([]);
	const [active, setActive] = useState(0);
	const [value, setValue] = useState<Array<Number | null>>(
		Array.from({ length }).map(_ => null)
	);

	useEffect(() => {
		inputRef.current[active]?.focus();
	}, [active]);

	// const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
	// 	if (e.key === "Backspace") {
	// 		if (value[0] === null) return;
	// 		const newValue = [...value];
	// 		setValue(newValue);
	// 		newValue[active] = null;
	// 		if (active < 0) return;
	// 		if (value[active] === null) {
	// 			setActive(prev => (prev === 0 ? 0 : prev - 1));
	// 		}
	// 		return;
	// 	}
	// };
	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const hasNext = index + 1 < length;

		const newValue = [...value];
		newValue[index] = Number(e.target.value) || null;
		setValue(newValue);
		if (!hasNext) {
			return;
		}
		if (Number(e.target.value)) {
			setActive(index + 1);
		}
	};

	const submit = () => {
		console.log(value);
	};

	return (
		<div className="container mx-auto min-h-[100svh] py-10 grid place-items-center ">
			<div className="w-fit space-y-5 rounded-md shadow-xl pt-8  pb-12">
				<h1 className="text-3xl font-semibold text-center">Form OTP</h1>
				<div className="flex items-center gap-2 px-4">
					{Array.from({ length }).map((_, i) => (
						<div key={i} className={`overflow-hidden grid place-items-center `}>
							<input
								type="text"
								tabIndex={active === i ? 0 : -1}
								ref={el => {
									inputRef.current[i] = el;
								}}
								className="size-10 border-3 dark:focus:border-white text-xl text-center"
								// maxLength={1}
								// onKeyDown={handleOnKeyPress}
								onFocus={() => setActive(i)}
								inputMode="numeric"
								pattern="(?:0|[1-9]\d*)"
								value={value[i]?.toString() || ""}
								disabled={active !== i && value[i] === null}
								onChange={e => handleOnChange(e, i)}
							/>
						</div>
					))}
				</div>
				<div className="px-4">
					<Button className="w-full" onClick={() => submit()}>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default FormOtp;
