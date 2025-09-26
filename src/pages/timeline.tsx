import BackButton from "@/components/shared/back-button";
import TimeLine from "@/components/shared/timeline";

const TimelinePage = () => {
	return (
		<div className="container mx-auto min-h-[100svh] py-10 grid place-items-center ">
			<div className="w-full sm:w-1/2">
				<BackButton />
				<TimeLine orientation="vertical" />
			</div>
		</div>
	);
};
export default TimelinePage;
