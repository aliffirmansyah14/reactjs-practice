import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { State } from "@/pages/kanban-board";

interface InputColumnProps extends React.ComponentProps<"input"> {
	onInputValueChange: (newTask: string) => void;
	onSelectValueChange: (id: keyof State) => void;
	onSubmit: () => void;
}

const InputColumn = ({
	onInputValueChange,
	onSelectValueChange,
	onSubmit,
	...props
}: InputColumnProps) => {
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onInputValueChange(e.target.value);
	};

	return (
		<div className="max-w-lg mx-auto bg-input/60 rounded-xl group border-1 border-transparent overflow-hidden">
			<form
				onSubmit={e => {
					e.preventDefault();
					onSubmit();
				}}
				className="flex gap-2 flex-wrap items-center bg-input/30"
			>
				<div className="flex-1 flex justify-between items-center">
					<Input
						type="text"
						placeholder="add todo"
						onChange={handleOnChange}
						className="h-10 rounded-md dark:outline-none border-none focus-visible:border-none focus-visible:ring-0 dark:bg-transparent "
						{...props}
					/>
					<div className="h-8 w-1 bg-primary "></div>
					<Select
						onValueChange={value => onSelectValueChange(value as keyof State)}
					>
						<SelectTrigger className="min-w-[125px] max-w-[125px] rounded-none py-2 focus-visible:ring-0 focus-visible:border-0 h-full dark:bg-transparent border-none">
							<SelectValue placeholder="Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Type</SelectLabel>
								<SelectItem value="todo">todo</SelectItem>
								<SelectItem value="inProgress">In Progress</SelectItem>
								<SelectItem value="done">Done</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<Button variant={"none"} className="h-full w-full sm:w-fit">
					Sumbit
				</Button>
			</form>
		</div>
	);
};

export default InputColumn;
