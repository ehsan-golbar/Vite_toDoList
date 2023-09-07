import { useState, useEffect } from "react";

import "./index.css";
import ToDo from "./components/ToDo.jsx";
import GoogleSearch from "./components/GoogleSearch.jsx";
import DateTime from "./components/DateTime.jsx";
import IconLink from "./components/IconLink.jsx";
import Callender from "./components/Callender.jsx";
import dayjs from "dayjs";
import { data } from "autoprefixer";
import { stringify } from "postcss";

function App() {
  const [date, setDate] = useState(dayjs());

  return (
    <div className="lg:flex lg:flex-row lg:gap-x-5 lg:pl-14 lg:pr-14 lg:pt-5 lg:justify-around  ">
      {/* time section */}
      <div className="lg:flex lg:flex-col lg:gap-4 lg:w-min">
        <div className="lg:flex lg:flex-row lg:gap-x-4">
          {/*Clock*/}
          <div>
            <img
              className="lg:w-max rounded-3xl"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIriahCd4k7aypjqs81jemysyXcf8C6yFW6A&usqp=CAU"
              alt=""
            />
          </div>
          {/*weather*/}
          <div>
            <img
              className="rounded-3xl "
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
        </div>
        {/*today date */}
        <div className="">
          <img
            className="lg:w-full lg:h-44 rounded-3xl"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbNPH3g6gHXKzBPQn_PnYyr8bWw3hc4xfBmkVzQMNjO-P0mQmitiuqI7Z1AuBUQ6aciI&usqp=CAU"
            alt=""
          />
        </div>

        <div className="bg-white rounded-3xl">
          <Callender setDate={setDate} date={date}></Callender>
        </div>
      </div>
      {/*search*/}
      <div>
        <div className="lg:w-96">
          <GoogleSearch></GoogleSearch>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:pt-4">
          <div>
            <IconLink></IconLink>
          </div>
          <div>
            <IconLink></IconLink>
          </div>
          <div>
            <IconLink></IconLink>
          </div>
          <div>
            <IconLink></IconLink>
          </div>
          <div>
            <IconLink></IconLink>
          </div>
          <div>
            <IconLink></IconLink>
          </div>
        </div>
      </div>
      {/*to do */}
      <div className="">
        <ToDo selectedDate={date}></ToDo>
      </div>
    </div>
  );
}

export default App;
