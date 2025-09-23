import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

interface OtpProps {
	length: number;
}

const OtpInput = ({ length = 4 }: OtpProps) => {
	const inputRef = useRef<(HTMLInputElement | null)[]>([]);
	const [otp, setOtp] = useState<Array<String>>(new Array(length).fill(""));

	const handleOnKeyPress = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		// Menangani penghapusan
		if (e.key === "Backspace") {
			// Jika field saat ini TIDAK kosong, hapus nilainya
			if (otp[index]) {
				const newValue = [...otp];
				newValue[index] = "";
				setOtp(newValue);
			} else if (index > 0 && inputRef.current[index - 1]) {
				// Jika field saat ini kosong, pindahkan fokus ke belakang
				inputRef.current[index - 1]?.focus();
			}
		}
		// check apakah key backspace or otpnya gk kosong or inputnya bukan terakhir dan input ke -1 ada
		// if (
		// 	e.key === "Backspace" &&
		// 	!otp[index] &&
		// 	index > 0 &&
		// 	inputRef.current[index - 1]
		// ) {
		// 	// pindah ke belakangnya
		// 	inputRef.current[index - 1]?.focus();
		// }
	};
	const handleOnClick = (index: number) => {
		// pindah ke inputan kosong
		if (index > 0 && otp.indexOf("") < index) {
			inputRef.current[otp.indexOf("")]?.focus();
		}
		inputRef.current[index]?.setSelectionRange(1, 1);
	};
	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const value = e.target.value;
		if (isNaN(Number(value)) || value === "") return;

		const newValue = [...otp];
		// ambil value length terakhir 32 -> 2
		newValue[index] = value.substring(value.length - 1);
		setOtp(newValue);

		// check otp apakah sudah full keisi
		const isFinish = newValue.join("").length === length;
		if (isFinish) {
			submit();
			return;
		}

		// pindah ke next input
		if (
			value &&
			index < length - 1 &&
			// !otp[index + 1] &&
			inputRef.current[index + 1]
		) {
			inputRef.current[index + 1]?.focus();
		} else if (value) {
			inputRef.current[newValue.indexOf("")]?.focus();
		}
	};

	const submit = () => {
		if (otp.indexOf("") > 0) return;
		console.log(otp);
	};

	return (
		<div className="w-fit space-y-5 rounded-md shadow-xl pt-8  pb-12">
			<h1 className="text-3xl font-semibold text-center">Form OTP</h1>
			<div className="flex items-center gap-2 px-4">
				{Array.from({ length }).map((_, i) => (
					<input
						key={i}
						autoFocus={i === 0}
						type="text"
						ref={el => {
							inputRef.current[i] = el;
						}}
						className="size-10 border-3 dark:focus:border-white text-xl text-center"
						// maxLength={1}
						inputMode="numeric"
						pattern="(?:0|[1-9]\d*)"
						value={otp[i].toString()}
						onClick={() => handleOnClick(i)}
						onKeyDown={e => handleOnKeyPress(e, i)}
						onChange={e => handleOnChange(e, i)}
					/>
				))}
			</div>
			<div className="px-4">
				<Button className="w-full" onClick={() => submit()}>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default OtpInput;
