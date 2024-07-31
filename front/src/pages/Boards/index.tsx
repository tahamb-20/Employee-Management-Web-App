/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import TacheService from "@/services/Tache";

const Tasks = () => {
	const [columns, setColumns] = useState<Columns>({
		EN_ATTENTE: { name: "EN ATTENTE", items: [] },
		EN_COURS: { name: "EN COURS", items: [] },
		TERMINEE: { name: "TERMINEE", items: [] }
	});
	const userInfo =JSON.parse(localStorage.getItem("userInfo"))
    const role = localStorage.getItem("role")
	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const result = await TacheService.getTachesByUserId(userInfo.id);
				// Assuming result is an array of tasks, update the columns state accordingly
				const newColumns = { ...columns };
				newColumns.EN_ATTENTE.items = result.filter(task => task.etattache === "EN_ATTENTE");
				newColumns.EN_COURS.items = result.filter(task => task.etattache === "EN_COURS");
				newColumns.TERMINEE.items = result.filter(task => task.etattache === "TERMINEE");
				setColumns(newColumns);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		};

		fetchTasks();
	}, []); // Empty dependency array ensures the effect runs only once on component mount

	 
	return (
		<>
			<DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns, userInfo.id)}>
				<div className="w-full  h-screen	flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
					{Object.entries(columns).map(([columnId, column]: any) => (
						<div
							className="w-full  h-screen	flex flex-col gap-0"
							key={columnId}
						>
							<Droppable
								droppableId={columnId}
								key={columnId}
							>
								{(provided: any) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex flex-col h-screen md:w-[290px] w-[250px] gap-3 items-center py-5"
									>
										<div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
											{column.name}
										</div>
										{column.items.map((task: any, index: any) => (
											<Draggable
												key={task.idtache.toString()}
												draggableId={task.idtache.toString()}
												index={index}
											>
												{(provided: any) => (
													<>
														<Task
															provided={provided}
															task={task}
														/>
													</>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						 
						</div>
					))}
				</div>
			</DragDropContext>

		 
		</>
	);
};

export default Tasks;
