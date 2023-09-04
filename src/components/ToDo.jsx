import { useState, useEffect } from "react";
import "../index.css";

function ToDo() {
  const initialTasks = () => {
    let getTasks = localStorage.getItem("taskdata");
    return getTasks ? JSON.parse(getTasks) : [];
  };

  const [userTask, setUserTask] = useState("");
  const [TasksList, setTasksList] = useState(initialTasks);

  useEffect(() => {
    console.log(TasksList);
    localStorage.setItem("taskdata", JSON.stringify(TasksList));
  }, [TasksList]);

  const creatTask = (task) => {
    const newTask = {
      id: Math.random(),
      taskName: task,
    };
    setTasksList([...TasksList, newTask]);
    setUserTask("");
  };

  const deleteTask = (id) => {
    const tempList = TasksList.filter((task) => task.id !== id);
    setTasksList(tempList);
  };

  return (
    <div className="grid justify-items-center bg-white rounded-3xl">
      <div className="p-3">
        <h1 className="text-6xl font-bold text-center"> To Do List </h1>

        <div className="flex space-x-5 mt-6">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
            placeholder="my new Task"
            required
            value={userTask}
            onChange={(e) => {
              setUserTask(e.target.value);
            }}
          />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              creatTask(userTask);
            }}
          >
            Add a new task
          </button>
        </div>
        <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {TasksList.map((task) => (
            <div className="p-1">
              <li key={task.id} className="flex justify-between space-x-5">
                <label className="text-2xl text-center break-words">
                  {task.taskName}
                </label>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
                  onClick={() => deleteTask(task.id)}
                >
                  <svg
                    className="w-6 h-6 text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </button>{" "}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDo;
