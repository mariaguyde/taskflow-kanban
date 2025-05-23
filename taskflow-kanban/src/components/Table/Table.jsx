import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './table.module.css';


const ItemType = { TASK: "task" }; // Définition du type d'objet draggable

function Table() {
    const [arrayTasks, setArrayTasks] = useState([
        { name: "To Do", tasks: ["Rédiger le compte de rendu de la réunion", "Mettre en place les tests"] },
        { name: "In Progress", tasks: ["Développer le produit"] },
        { name: "Done", tasks: ["Rédiger le cahier de charges"] },
    ]);

    // TODO rendre le tableau SCROLLABLE horizontalement

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
            <div className={styles.tableContainer}>

                {/* Ajout de colonne */}
                <div className={styles.container_formAddColumns}>
                    <h4>Ajouter une colonne</h4>
                    <input type="text" id="inputNewColumn"  className={styles.input} placeholder="Nom de la colonne" />
                    <button className={styles.btnAdd} onClick={createColumn}>+</button>
                </div>

                <div className={styles.table_colummns}>
                    {arrayTasks.map((column, columnIndex) => (
                        <Column key={columnIndex} column={column} columnIndex={columnIndex} moveTask={moveTask} createTask={createTask} />
                    ))}
                </div>
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
        <div ref={drop} className={styles.column}>
            <h4>{column.name}</h4>

             {/* Ajout de tâche */}
             <div>
                <input className={styles.input}  type="text" id={"inputNewTask" + columnIndex} placeholder="Nouvelle tâche" />
                <button className={styles.btnAdd}  onClick={() => createTask(columnIndex)}>+</button>
            </div>

            {/* Liste des tâches */}
            <div className={styles.listTasks}>
                {column.tasks.map((task, taskIndex) => (
                    <Task key={taskIndex} task={task} columnIndex={columnIndex} />
                ))}
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
                padding: "1px 10px",
                backgroundColor: isDragging ? "lightgray" : "white",
                margin: "5px 0",
                cursor: "grab",
            }}
        >
            <p>{task}</p>
        </div>
    );
}

export default Table;
