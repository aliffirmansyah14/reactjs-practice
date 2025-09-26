import { cn } from "@/lib/utils";
import type { ColumnType, NoteItem, State } from "@/pages/kanban-board";
import { X } from "lucide-react";

interface ColumnProps extends ColumnType {
	id: keyof State;
	onDraggStart: (task: NoteItem) => void;
	onDraggEnd: (e: React.DragEvent, columnId: keyof State) => void;
	onDraggOver: (e: React.DragEvent) => void;
	onDelete: (task: NoteItem) => void;
}

const styleColumn = {
	todo: { style: "bg-blue-800" },
	inProgress: { style: "bg-yellow-600" },
	done: { style: "bg-green-700" },
};
const Column = ({
	items,
	name,
	id,
	onDelete,
	onDraggStart,
	onDraggOver,
	onDraggEnd,
}: ColumnProps) => {
	return (
		<div
			className="border bg-input/30 rounded-lg pb-4 h-[300px] flex flex-col gap-2 overflow-hidden"
			onDrop={e => onDraggEnd(e, id)}
			onDragOver={e => onDraggOver(e)}
			draggable={false}
		>
			<div
				className={cn(
					"px-4 py-3 bg-blue-600 font-semibold text-sm md:text-lg",
					styleColumn[id].style
				)}
			>
				{name}
			</div>
			<div className="px-4 flex flex-col gap-2 overflow-auto flex-1">
				{items.length === 0 ? (
					<div className="text-center text-sm italic h-full grid place-content-center">
						Add task
					</div>
				) : (
					items.map((item, index) => (
						<div
							key={index}
							className="bg-input px-4 py-3 text-sm font-medium cursor-grab flex justify-between items-center"
							onDragStart={e => {
								e.dataTransfer.setData("text/plain", id);
								onDraggStart(item);
							}}
							draggable
						>
							<span>{item.content}</span>
							<button
								onClick={e => {
									e.stopPropagation();
									onDelete(item);
								}}
								className="[&_svg]:size-5 p-1 hover:bg-accent active:bg-accent rounded-full hover:cursor-pointer"
							>
								<X />
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Column;
