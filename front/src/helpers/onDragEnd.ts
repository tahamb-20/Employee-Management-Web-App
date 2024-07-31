import TacheService from "@/services/Tache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onDragEnd = async (result: any, columns: any, setColumns: any, userId:any) => {
	if (!result.destination) return;

	const { source, destination } = result;
	console.log("🚀 ~ onDragEnd ~ destination:", destination)
	// console.log("🚀 ~ onDragEnd ~ source:", columns[source.droppableId].items[source.index])

	if (source.droppableId !== destination.droppableId) {
		
		const sourceColumn = columns[source.droppableId];
		// console.log("🚀 ~ onDragEnd ~ sourceColumn:", sourceColumn)
		const destColumn = columns[destination.droppableId];
		// console.log("🚀 ~ onDragEnd ~ destColumn:", destColumn)
		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items];
		const [removed] = sourceItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems,
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems,
			},
		});
	} else {
		const column = columns[source.droppableId];
		const copiedItems = [...column.items];
		const [removed] = copiedItems.splice(source.index, 1);
		copiedItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems,
			},
		});
	}
	await TacheService.updateEtatTache(columns[source.droppableId].items[source.index].idtache,  destination.droppableId ).then(async ()=> 
		{
			const result = await TacheService.getTachesByUserId(userId);
			// Assuming result is an array of tasks, update the columns state accordingly
			columns.EN_ATTENTE.items = result.filter(task => task.etattache === "EN_ATTENTE");
			columns.EN_COURS.items = result.filter(task => task.etattache === "EN_COURS");
			columns.TERMINEE.items = result.filter(task => task.etattache === "TERMINEE");
			setColumns(columns);
		})
};
