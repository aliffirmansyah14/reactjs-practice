const items = [
	{
		id: 1,
		date: "Mar 15, 2024",
		title: "Project Kickoff",
		description:
			"Initial team meeting and project scope definition. Established key milestones and resource allocation.",
		completed: true,
	},
	{
		id: 2,
		date: "Mar 22, 2024",
		title: "Design Phase",
		description:
			"Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
		completed: true,
	},
	{
		id: 3,
		date: "Apr 5, 2024",
		title: "Development Sprint",
		description:
			"Backend API implementation and frontend component development in progress.",
		completed: true,
	},
	{
		id: 4,
		date: "Apr 19, 2024",
		title: "Testing & Deployment",
		description:
			"Quality assurance testing, performance optimization, and production deployment preparation.",
		completed: false,
	},
];

interface TimeLineProps {
	orientation?: "horizontal" | "vertical";
}

const TimeLine = ({ orientation = "horizontal" }: TimeLineProps) => {
	return (
		<div
			className="px-2 group/timeline data-[orientation=vertical]:w-full data-[orientation=vertical]:flex data-[orientation=vertical]:flex-col overflow-hidden"
			data-orientation={orientation}
		>
			{items.map((item, index) => (
				<div
					key={item.id}
					className="group-data-[orientation=vertical]/timeline:even:ms-auto group-data-[orientation=vertical]/timeline:w-[calc(50%-1.5rem)] group-data-[orientation=horizontal]/timeline:ms-8 group-data-[orientation=horizontal]/timeline:sm:ms-32 odd:group-data-[orientation=vertical]/timeline:[&_[data-slot=separator]]:left-[calc(100%+1.5rem)] odd:group-data-[orientation=vertical]/timeline:[&_[data-slot=circle]]:left-[calc(100%+1rem)] even:group-data-[orientation=vertical]/timeline:[&_[data-slot=separator]]:-left-6 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=circle]]:-left-8  group-data-[orientation=horizontal]/timeline:[&_[data-slot=separator]]:-left-6 group-data-[orientation=horizontal]/timeline:[&_[data-slot=circle]]:-left-8 odd:group-data-[orientation=vertical]/timeline:text-right flex-1 flex flex-col gap-0.5 pb-12 relative group/timeline-item"
				>
					<div className="text-muted-foreground font-medium text-sm group-data-[orientation=horizontal]/timeline:sm:-left-32 group-data-[orientation=horizontal]/timeline:sm:absolute">
						{item.date}
					</div>
					<h3 className="text-sm font-semibold">{item.title}</h3>
					<div className="text-muted-foreground text-sm group-data-[orientation=vertical]/timeline:hidden">
						{item.description}
					</div>
					<div
						data-slot="separator"
						className={`w-[2px] absolute top-4 -translate-x-1/2 ${
							index === items.length - 1 ? "hidden" : "h-[calc(100%-1rem)]"
						} ${item.completed ? "bg-primary" : "bg-accent"}`}
					></div>
					<div
						data-slot="circle"
						className={`border-2 absolute  size-4 rounded-full ${
							item.completed ? "border-primary" : "border-accent"
						} `}
					></div>
				</div>
			))}
		</div>
	);
};

export default TimeLine;
