import OtpInput from "@/components/shared/otp-input";

const FormOtp = () => {
	return (
		<div className="container mx-auto min-h-[100svh] py-10 grid place-items-center ">
			<OtpInput length={4} />
		</div>
	);
};

export default FormOtp;
