import Column from "@/components/shared/kanban-board/column";
import InputColumn from "@/components/shared/kanban-board/input-column";
import usePersistState from "@/hooks/usePersistState";
import React, { useState } from "react";

export type NoteItem = {
	id: string;
	content: string;
};
export type ColumnType = {
	name: string;
	items: Array<NoteItem>;
};

export type State = {
	todo: ColumnType;
	inProgress: ColumnType;
	done: ColumnType;
};

const initialState: State = {
	todo: {
		name: "To Do",
		items: [
			{
				id: "1",
				content: "Market research",
			},
			{ id: "2", content: "100% map exploration " },
		],
	},
	inProgress: {
		name: "Progress",
		items: [
			{
				id: "3",
				content: "Kanban board",
			},
		],
	},
	done: {
		name: "Done",
		items: [],
	},
};

const KanbanBoardPage = () => {
	const [columns, setColumns] = usePersistState<State>(
		"kanban-board",
		initialState
	);
	const [newTask, setNewTask] = useState<string>("");
	const [activeColumn, setActiveColumn] = useState<keyof State>("todo");
	const [dragItem, setDragItem] = useState<{
		columnId: keyof State;
		task: NoteItem;
	} | null>(null);

	const handleOnChangeInput = (value: string) => {
		setNewTask(value);
	};

	const handleOnChangeSelect = (id: keyof State) => {
		setActiveColumn(id);
	};

	const addNewTask = () => {
		if (newTask.trim() === "") return;
		const updateColumns = { ...columns };

		updateColumns[activeColumn].items.push({
			id: Date.now().toString(),
			content: newTask,
		});
		setColumns(updateColumns);
		setNewTask("");
	};

	const deleteTask = (columnId: keyof State, task: NoteItem) => {
		const updateColumns = { ...columns };
		updateColumns[columnId].items = updateColumns[columnId].items.filter(
			item => item.id !== task.id
		);

		setColumns(updateColumns);
	};

	const handleDragStart = (columnId: keyof State, task: NoteItem) => {
		setDragItem({ columnId, task });
	};

	const handleDragDrop = (e: React.DragEvent, columnId: keyof State) => {
		e.preventDefault();
		// jika gk ada drag item return
		if (!dragItem) return;
		const droppedItemId = e.dataTransfer.getData("text/plain");
		console.log(droppedItemId);

		const { columnId: prevColumnId, task } = dragItem;
		// kalo koloumnnya sama return
		console.log({ columnId, prevColumnId });
		if (prevColumnId === columnId) return;
		const updateColumns = { ...columns };
		// hapus data di column lama
		updateColumns[prevColumnId].items = updateColumns[
			prevColumnId
		].items.filter(item => item.id !== task.id);
		// push data ke column baru
		updateColumns[columnId].items.push(task);
		setColumns(updateColumns);
		setDragItem(null);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	return (
		<div className="container mx-auto min-h-[100svh] py-10 grid place-items-center px-4 md:px-none">
			<div className="space-y-7 w-full">
				<InputColumn
					onSubmit={addNewTask}
					onInputValueChange={handleOnChangeInput}
					onSelectValueChange={handleOnChangeSelect}
					value={newTask}
				/>
				<div className="grid gric-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{Object.keys(columns).map(column => (
						<Column
							key={column}
							id={column as keyof State}
							onDraggStart={task =>
								handleDragStart(column as keyof State, task)
							}
							onDraggEnd={handleDragDrop}
							onDraggOver={handleDragOver}
							onDelete={task => deleteTask(column as keyof State, task)}
							{...columns[column as keyof State]}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default KanbanBoardPage;
