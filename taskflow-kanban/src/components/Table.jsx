import React from 'react'
import { useState } from 'react'


function Table() {
    let [arrayTasks, setArrayTasks] = useState([{name:"To Do", tasks:[]}]); 


   /*const createTask = () => {
        const todoTaskList = document.getElementById('todo_tasklist');
        const newTask = document.createElement("div");

        const taskName = document.getElementById("inputNewTask").value;
        const newTaskContent = document.createTextNode(taskName);
        newTask.appendChild(newTaskContent);
        todoTaskList.appendChild(newTask);
   }//*/

   const createColumn = () => {
        // ajout nouvelle colonne
        const columnName = document.getElementById("inputNewColumn").value;
        if (columnName.trim() === "") return;

        // Ajouter un objet, pas un tableau
        const newColumn = { name: columnName, tasks: [] };
        setArrayTasks([...arrayTasks, newColumn]);
        //console.log("Nouvelle liste ajoutée :", newColumn);
   }

  return (
    <div style={{display:'flex'}}>

        {/* Tableau */}
        <div style={{display:'flex'}}> 
            {arrayTasks.map(function(column, id) {
                return (
                    <div key={id}>
                         {column.name}
                    </div>
                )})
            }
        </div>
  
        <div>
            <div>Ajouter une colonne</div>
            <div style={{display:'flex'}}>
                <input type='text' id='inputNewColumn' />
                <div onClick={createColumn}>+</div>
            </div>
        </div>
    </div>
  )
}

export default Table