import { useState, useEffect } from "react";
import "../index.css";
import dayjs from "dayjs";
import { supabase } from "../supabase";
import { func } from "prop-types";
//sdsdsd
function ToDo({ selectedDate }) {
  const [userTask, setUserTask] = useState("");
  const [myUser, setMyUser] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [todayDate, setTodayDate] = useState(selectedDate);

  async function fetchData() {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("date", selectedDate.format("DD MMMM YYYY"));

    setTaskList(tasks);
  }

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(error);
    console.log(data);
  };
  // async function signIn () {
  //   const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
  //   console.log(error)
  //   console.log(data)
  // }

  // useEffect(() => {
  //   const session = supabase.auth.getSession();
  //   setUser(session.user)
  //   console.log(session)
  // }, []);

  useEffect(() => {
    const getMyUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setMyUser(user);
    };
    getMyUser();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  async function insertData(newTask) {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        id: newTask.id,
        text: newTask.text,
        date: selectedDate.format("DD MMMM YYYY"),
        user_id: myUser.id,
      })
      .select();
  }

  async function deleteData(selectedId) {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", selectedId);
  }

  const creatTask = (task) => {
    const newTask = {
      id: Math.floor(Math.random() * 500),
      text: task,
    };
    if (task == "") {
      return;
    }

    setTaskList((prev) => {
      return [...prev, newTask];
    });
    setUserTask("");
    insertData(newTask);
  };
  const deleteTask = (id) => {
    setTaskList((prev) => {
      return prev.filter((task) => {
        return task.id !== id;
      });
    });

    deleteData(id);
  };

  const logout = async () => {
      
let { error } = await supabase.auth.signOut()
      
    setMyUser(null);
  };
  /*<button
  type="button"
  className=" mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  onClick={login }
>
  log in
</button> */

  return (
    <>
      {myUser !== null ? (
        <div className="grid justify-items-center bg-white rounded-3xl  ">
          <div className="p-3">
            <h1 className="text-5xl font-bold text-center"> To Do List </h1>

            <div className="flex justify-between pt-4">
            <h1 className="pt-6 font-bold">
              {selectedDate.format("DD MMMM YYYY")}
            </h1>
            {/* <h1>{myUser?.email}</h1> */}


            <button
              type="button"
              className=" mt-4 text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={logout}
            >
              log out
            </button>
            </div>

            <div className="flex space-x-5 mt-6">
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
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
              {taskList.map((task) => (
                <div className="p-1">
                  <li key={task.id} className="flex justify-between space-x-5">
                    <label className="text-2xl text-center break-words">
                      {task.text}
                    </label>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
                      onClick={() => deleteTask(task.id)}
                    >
                      <svg
                        className="w-6 h-6 text-white dark:text-white"
                        aria-hidden="true"
                        xmlns="https://www.w3.org/2000/svg"
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
      ) : (
        <div className="grid justify-items-center bg-white rounded-3xl  p-4 pl-5 ">
          <h1>To add new tasks, please log in</h1>
          <button
            type="button"
            className="p-3 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={login}
          >
            log in
          </button>
        </div>
      )}
    </>
  );
}

export default ToDo;
