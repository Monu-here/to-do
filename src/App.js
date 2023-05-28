import React, { useState } from "react";
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan,
}
  from "@fortawesome/free-solid-svg-icons";


function App() {
  // Taslk (ToDo list) State
  const [toDo, setToDo] = useState([
    { "id": 1, "title": "Task 1", "status": false },
    { "id": 2, "title": "Task 2", "status": false },
  ]);
  // Temp state
  const [newTask, setNewTask] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  // Add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }

  }
  // Delete Task
  const deleteTask = (id) => {
    let newTask = toDo.filter(task => task.id !== id)
    setToDo(newTask);
  }
  // mark task as done or complete
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }
  // cancle Update 
  const cancleUpdate = () => {
    setUpdateData('');
  }
  //chnage task for update 
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false

    }
    setUpdateData(newEntry);
  }
  //chnage task for update 
  const updateTask = (e) => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData("");

  }
  return (
    <div className="continer App">
      <br />
      <br />

      <h2>TODO list using react</h2>
      <br />
      <br />

      {/* update task */}
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg" />
            </div>
            <div className="col-auto">
              <button onClick={updateTask} className="btn btn-lg btn-success mr-20">Update</button>
              <button className="btn btn-lg btn-warning mr-20">Cancle</button>
            </div>
          </div>
          <br />
        </>

      ) :
        (

          <>
            {/* Add Task */}
            <div className="row">
              <div className="col">
                <input value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="form-control form-control-lg" />
              </div>
              <div className="col-auto">
                <button onClick={addTask} className="btn btn-lg btn-success"> Add Task</button>
              </div>
            </div>
            <br />
          </>
        )
      }





      {/* dISPLAY TODO */}
      {toDo && toDo.length ? '' : 'No Task'}
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? 'done' : ""}>
                  <span className="taskNumber">{index + 1}
                  </span>
                  <span className="taskText">{task.title}
                  </span>
                  <div className="iconsWrap">
                    <span title="Completed / Not Completed" onClick={(e) => markDone(task.id)}>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    <span title="Edit" onClick={() => setUpdateData({
                      id: task.id,
                      title: task.title,
                      status: task.status ? true : false
                    })}>
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                    <span title="Delete"
                      onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>

                  </div>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }
    </div>

  );

}


export default App;
