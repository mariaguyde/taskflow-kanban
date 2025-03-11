import React, { useEffect } from 'react';
import { useState } from 'react';


function Table() {

    let [arrayTasks, setArrayTasks] = useState([{name:"To Do", tasks:[]}]); 

    const createTask = (column) => {
        const taskName = document.getElementById("inputNewTask" + column.name).value;
        if (taskName.trim() === "") return;

        let copytasks = arrayTasks;
        copytasks.forEach(columnItem => {
            if (columnItem.name == column.name) {
                columnItem.tasks.push(taskName); // add new task
            }
        });//*/

        setArrayTasks([...copytasks]);
        document.getElementById("inputNewTask" + column.name).value = "";
            
    }

    const createColumn = () => {
        // add new column
        const columnName = document.getElementById("inputNewColumn").value;
        if (columnName.trim() === "") return;

        const newColumn = { name: columnName, tasks: [] };
        setArrayTasks([...arrayTasks, newColumn]);
    }

  return (
    <div style={{display:'flex'}}>

        {/* Table */}
        <div style={{display:'flex'}}> 
            {arrayTasks.map(function(column, id) {
                return (
                    <div key={id}>
                        <div>{column.name}</div>

                        {/* Add a new task */}
                        <div>
                            <div>Ajouter une tâche</div>
                            <div style={{display:'flex'}}>
                                <input type='text' id={'inputNewTask'+ column.name} />
                                <div onClick={() => createTask(column)}>+</div>
                            </div>
                        </div>

                        {/* List of tasks */}
                        <div>
                            {column.tasks.map(function(task, idTask) {
                                return(
                                    <div key={idTask+"_task"}>{task}</div>
                                );
                            })}
                        </div>
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