import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './table.module.css';
import Header from "../Header/Header";


const ItemType = { TASK: "task" }; // Définition du type d'objet draggable

function Table() {

    const [arrayTasks, setArrayTasks] = useState([]);
    const [userID, setUserID] = useState();

    useEffect(() => {
        // On récupère l'ID utilisateur depuis le localStorage
        const user = localStorage.getItem("user");
        setUserID(user);
      }, []);
      
      useEffect(() => {
        if (userID) { // Permet d'éviter d'appeler l'API avec un ID "undefined"
          asyncCall();
        }
      }, [userID]);

    async function asyncCall() {
        const tasks = await getTasksData(); // récupère les taches de l'user
        //console.log("tasks value : ". tasks);
        getColumnsData(tasks);// récupère les colonnes de l'user
      }

    async function getTasksData() {

        let tempTasksArray = [];
        let urlAPI = "https://api-backend-taskflow.vercel.app/api/tasks/"+userID;

        try { // appel API
            const response = await fetch(urlAPI, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });         
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
      
          const json = await response.json();
          json.forEach(task => 
            tempTasksArray.push(task)
          );

        } catch (error) {
          console.error(error.message);
        }
        //console.log(tempTasksArray);
        return tempTasksArray;
    }
    
    async function getColumnsData(tasksArray) {
            
        let tempColumnsArray = [];
        const url = "https://api-backend-taskflow.vercel.app/api/columns/"+userID;

        try { // appel API
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            //console.log(json);
            let arrayTasksColumn = [];

            // pour chaque colonne, on renseigne les infos liées à celle-ci (id, nom, tâches présentes dans la colonne)
            json.forEach(column => {
                arrayTasksColumn = tasksArray.filter((task) => task.column_id == column._id); // tâches appartenant à la colonne actuelle
                let columnObject = {id:column._id,name: column.title,tasks: arrayTasksColumn}
                tempColumnsArray.push(columnObject); 
            });
        } catch (error) {
            console.error(error.message);
        }
        setArrayTasks(tempColumnsArray);
    }

    async function updateTask(task) {

        // update de la tâche dans la bdd (suite à son déplacement dans une aute colonne)
        const url = "https://api-backend-taskflow.vercel.app/api/tasks/"+task._id;
        try { // appel API
            const response = await fetch(url, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(task)
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
           
        } catch (error) {
            console.error(error.message);
        }
    }


    // Fonction pour déplacer une tâche d'une colonne à une autre
    const moveTask = (task, fromColumnIndex, toColumnIndex, columnId) => {
        const updatedTasks = [...arrayTasks];
    
        task.column_id = columnId; // update de la coloneID de la tâche suite à son déplacement de colonne
        updatedTasks[fromColumnIndex].tasks = updatedTasks[fromColumnIndex].tasks.filter(currentTask => currentTask !== task); // Supprimer la tâche de la colonne d'origine
        updatedTasks[toColumnIndex].tasks.push(task); // Ajout de la tâche à la nouvelle colonne
       
        updateTask(task); // update en bdd
        setArrayTasks(updatedTasks);
    };

    // Ajouter une nouvelle colonne
    const createColumn = () => {
        const columnName = document.getElementById("inputNewColumn").value;
        if (columnName.trim() === "") return;
        setArrayTasks([...arrayTasks, { name: columnName, tasks: [] }]);
        document.getElementById("inputNewColumn").value = "";
        addColumnToDatabase(columnName); // ajout en bdd
    };

    async function addColumnToDatabase (columnName) {
        let columnInfos = { title:columnName, user_id: userID};

        try { // appel API
            const urlAPI = 'https://api-backend-taskflow.vercel.app/api/columns/';
            const response = await fetch(urlAPI, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(columnInfos)
            });
    
            const data = await response.json();
            if (response.ok) {
                //console.log(data);
            } else {
                console.log('Erreur : ' + data.message);
            }
          } catch (err) {
            console.error('Erreur réseau :', err);
          }
    }

    // Ajouter une tâche dans une colonne
    const createTask = (columnIndex, columnId) => {
        const taskName = document.getElementById("inputNewTask" + columnIndex).value;
        if (taskName.trim() === "") return;

        const updatedTasks = [...arrayTasks];
        updatedTasks[columnIndex].tasks.push(taskName);

        setArrayTasks(updatedTasks);
        document.getElementById("inputNewTask" + columnIndex).value = "";

        addTaskToDatabase(taskName, columnId, userID); // ajout en bdd
    };

    async function addTaskToDatabase (taskName, columnID) {

        let taskInfos = { task:taskName, column_id: columnID, user_id: userID};

        try { // appel API
            const urlAPI = 'https://api-backend-taskflow.vercel.app/api/tasks';
            const response = await fetch(urlAPI, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(taskInfos)
            });
    
            const data = await response.json();
            if (response.ok) {
                //console.log(data);
            } else {
                console.log('Erreur : ' + data.message);
            }
          } catch (err) {
            console.error('Erreur réseau :', err);
          }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Header/>
            <div className={styles.tableContainer}>

                {/* Ajout de colonne */}
                <div className={styles.container_formAddColumns}>
                    <h4>Ajouter une colonne</h4>
                    <input type="text" id="inputNewColumn"  className={styles.input} placeholder="Nom de la colonne" />
                    <button className={styles.btnAdd} onClick={createColumn}>+</button>
                </div>

                <div className={styles.table_colummns}>
                    {arrayTasks.map((column, columnIndex) => (
                        <Column key={columnIndex} column={column} columnIndex={columnIndex} columnId={column.id} moveTask={moveTask} createTask={createTask} />
                    ))}
                </div>
            </div>
           
        </DndProvider>
    );
}

// Composant Column (Drop Target)
function Column({ column, columnIndex,columnId, moveTask, createTask }) {
    const [, drop] = useDrop({
        accept: ItemType.TASK,
        drop: (item) => moveTask(item.task, item.fromColumnIndex, columnIndex, columnId),
    });

    return (
        <div ref={drop} className={styles.column}>
            <h4>{column.name}</h4>

             {/* Ajout de tâche */}
             <div>
                <input className={styles.input}  type="text" id={"inputNewTask" + columnIndex} placeholder="Nouvelle tâche" />
                <button className={styles.btnAdd}  onClick={() => createTask(columnIndex, columnId)}>+</button>
            </div>

            {/* Liste des tâches */}
            <div className={styles.listTasks}>
                {column.tasks.map((task, taskIndex) => (
                    <Task key={taskIndex} task={task} columnIndex={columnIndex} columnId={columnId} />
                ))}
            </div>

        
        </div>
    );
}

// Composant Task (Drag Source)
function Task({ task, columnIndex, columnId }) {
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
            <p>{task.task}</p>
        </div>
    );
}

export default Table;

