import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = { TASK: "task" }; // Définition du type d'objet draggable

function Table() {
    const [arrayTasks, setArrayTasks] = useState([
        { name: "To Do", tasks: ["Acheter du lait", "Faire du sport"] },
        { name: "In Progress", tasks: ["Développer une app React"] },
        { name: "Done", tasks: ["Lire un livre"] },
    ]);

    // Fonction pour déplacer une tâche d'une colonne à une autre
    const moveTask = (task, fromColumnIndex, toColumnIndex) => {
        const updatedTasks = [...arrayTasks];

        // Supprimer la tâche de la colonne d'origine
        updatedTasks[fromColumnIndex].tasks = updatedTasks[fromColumnIndex].tasks.filter(t => t !== task);

        // Ajouter la tâche à la nouvelle colonne
        updatedTasks[toColumnIndex].tasks.push(task);

        setArrayTasks(updatedTasks);
    };

    // Ajouter une nouvelle colonne
    const createColumn = () => {
        const columnName = document.getElementById("inputNewColumn").value;
        if (columnName.trim() === "") return;
        setArrayTasks([...arrayTasks, { name: columnName, tasks: [] }]);
        document.getElementById("inputNewColumn").value = "";
    };

    // Ajouter une tâche dans une colonne
    const createTask = (columnIndex) => {
        const taskName = document.getElementById("inputNewTask" + columnIndex).value;
        if (taskName.trim() === "") return;

        const updatedTasks = [...arrayTasks];
        updatedTasks[columnIndex].tasks.push(taskName);

        setArrayTasks(updatedTasks);
        document.getElementById("inputNewTask" + columnIndex).value = "";
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: "flex", gap: "20px" }}>
                {arrayTasks.map((column, columnIndex) => (
                    <Column key={columnIndex} column={column} columnIndex={columnIndex} moveTask={moveTask} createTask={createTask} />
                ))}
            </div>

            {/* Ajout de colonne */}
            <div>
                <h4>Ajouter une colonne</h4>
                <input type="text" id="inputNewColumn" placeholder="Nom de la colonne" />
                <button onClick={createColumn}>+</button>
            </div>
        </DndProvider>
    );
}

// Composant Column (Drop Target)
function Column({ column, columnIndex, moveTask, createTask }) {
    const [, drop] = useDrop({
        accept: ItemType.TASK,
        drop: (item) => moveTask(item.task, item.fromColumnIndex, columnIndex),
    });

    return (
        <div ref={drop} style={{ padding: "10px", border: "1px solid black", width: "200px", minHeight: "150px" }}>
            <h4>{column.name}</h4>

            {/* Liste des tâches */}
            <div>
                {column.tasks.map((task, taskIndex) => (
                    <Task key={taskIndex} task={task} columnIndex={columnIndex} />
                ))}
            </div>

            {/* Ajout de tâche */}
            <div>
                <input type="text" id={"inputNewTask" + columnIndex} placeholder="Nouvelle tâche" />
                <button onClick={() => createTask(columnIndex)}>+</button>
            </div>
        </div>
    );
}

// Composant Task (Drag Source)
function Task({ task, columnIndex }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType.TASK,
        item: { task, fromColumnIndex: columnIndex },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                padding: "5px",
                backgroundColor: isDragging ? "lightgray" : "#f0f0f0",
                margin: "5px 0",
                cursor: "grab",
            }}
        >
            {task}
        </div>
    );
}

export default Table;
