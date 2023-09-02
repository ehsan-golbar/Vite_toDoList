import { useState } from "react";

import "./index.css";
import ToDo from "./components/ToDo.jsx";

function App() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 ">
      <div className="h-28 bg-blue-500">
        <h1 className="bg-slate-600 text-center">Time </h1>
        <div className="grid grid-cols-2">
          <h1 className="bg-red-600 text-center">clock </h1>
          <h1 className="bg-yellow-600 text-center"> tempreture </h1>
          <h1 className="bg-gray-700 col-span-2 text-center">date of today</h1>
          <h1 className="bg-red-400 col-span-2 text-center">Calender</h1>
        </div>
      </div>
      <div className="h-28 bg-red-500">
        <h1 className="bg-slate-600 text-center">Search </h1>
        <div className="h--28 bg-yellow-400 text-center">
          <h1 className="">Google</h1>
          <h1>Icons Link</h1>
        </div>
      </div>
      <div className="h-28  text-center lg:col-span-1 md:col-span-2">
        <h1 className="bg-slate-600 ">To Do List </h1>
        <ToDo ></ToDo>
      </div>
    </div>
  );
}

export default App;
