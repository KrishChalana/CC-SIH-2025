import React, { useState, useEffect } from "react";
import "./Home.css";
import { Proportions } from "lucide-react";

// Fake intersection data
const fakeData = {
  A: [
    { name: "North", signal: "green", time: 20, score: 80, vehicles: 5 },
    { name: "East", signal: "yellow", time: 0, score: 60, vehicles: 3 },
    { name: "South", signal: "red", time: 0, score: 45, vehicles: 4 },
    { name: "West", signal: "red", time: 0, score: 30, vehicles: 2 },
  ],
  B: [
    { name: "North", signal: "red", time: 0, score: 25, vehicles: 6 },
    { name: "East", signal: "green", time: 25, score: 90, vehicles: 4 },
    { name: "South", signal: "yellow", time: 0, score: 65, vehicles: 5 },
    { name: "West", signal: "red", time: 0, score: 35, vehicles: 3 },
  ],
  C: [
    { name: "North", signal: "yellow", time: 0, score: 55, vehicles: 2 },
    { name: "East", signal: "red", time: 0, score: 40, vehicles: 3 },
    { name: "South", signal: "green", time: 30, score: 85, vehicles: 6 },
    { name: "West", signal: "red", time: 0, score: 25, vehicles: 1 },
  ],
};

export default function LaneStatus({ ChangeLane }) {
  const [intersection, setIntersection] = useState("A");
  const [lanes, setLanes] = useState(fakeData["A"]);

  useEffect(() => {
    const newLaneNames = lanes.map((_, idx) => `TS-${intersection}0${idx + 1}`);
    ChangeLane(newLaneNames);
  }, [lanes, intersection, ChangeLane]);

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLanes((prev) =>
        prev.map((lane) =>
          lane.signal === "green" && lane.time > 0
            ? { ...lane, time: lane.time - 1 }
            : lane
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeIntersection = (id) => {
    setIntersection(id);
    setLanes(fakeData[id]);
  };

  return (
    <div className="inter-font text-gray-800 p-6 min-h-screen">
      

      {/* Intersection Controls */}
      <div className="flex justify-center mb-8">
        <select
          value={intersection}
          onChange={(e) => changeIntersection(e.target.value)}
          className="border-2 border-indigo-200 rounded-lg px-4 py-2 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="A">Intersection A</option>
          <option value="B">Intersection B</option>
          <option value="C">Intersection C</option>
        </select>
      </div>

      {/* Road intersection layout */}
      <div className="relative w-[420px] h-[420px] mx-auto bg-gray-50 border-4 border-gray-300 rounded-xl shadow-md">
        {/* Vertical road */}
        <div className="absolute top-0 bottom-0 left-1/2 w-24 -translate-x-1/2 bg-gray-200"></div>

        {/* Horizontal road */}
        <div className="absolute left-0 right-0 top-1/2 h-24 -translate-y-1/2 bg-gray-200"></div>

        {lanes.map((lane, idx) => {
          const positions = [
            { top: "20px", left: "50%", transform: "translateX(-50%)" }, // North
            { right: "20px", top: "50%", transform: "translateY(-50%)" }, // East
            { bottom: "20px", left: "50%", transform: "translateX(-50%)" }, // South
            { left: "20px", top: "50%", transform: "translateY(-50%)" }, // West
          ];

          const colors = {
            green: "bg-green-500 shadow-md shadow-green-300",
            yellow:
              "bg-yellow-300 border border-yellow-600 shadow-md shadow-yellow-200",
            red: "bg-red-400 shadow-md shadow-red-200",
          };

          return (
            <div
              key={lane.name}
              className="absolute flex flex-col items-center text-center p-2"
              style={{ ...positions[idx] }}
            >
              {/* Signal light */}
              <div
                className={`w-10 h-10 rounded-full ${colors[lane.signal]} mb-3 border-2 border-white`}
              ></div>

              {/* Vehicles (small circles) */}
              <div className="flex gap-1 flex-wrap justify-center max-w-[80px] mb-3">
                {Array.from({ length: lane.vehicles }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-blue-400 shadow-sm"
                  ></div>
                ))}
              </div>

              {/* Timer */}
              {lane.signal === "green" && (
                <div className="text-sm font-bold text-green-700 mb-1">
                  {lane.time}s
                </div>
              )}

              {/* Score */}
              <div className="text-xs font-medium text-gray-700 mb-1">
                Score: <span className="text-indigo-600">{lane.score}</span>
              </div>

              {/* Lane ID */}
              <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md shadow-sm">
                TS-{intersection}0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="text-center mt-12 flex flex-wrap justify-center gap-6">
        <span className="inline-flex items-center text-sm">
          <span className="w-4 h-4 bg-green-500 rounded-full mr-2 shadow-sm"></span>
          Green Lane (Go)
        </span>
        <span className="inline-flex items-center text-sm">
          <span className="w-4 h-4 bg-yellow-300 border border-yellow-600 rounded-full mr-2 shadow-sm"></span>
          Priority Lane (Next)
        </span>
        <span className="inline-flex items-center text-sm">
          <span className="w-4 h-4 bg-red-400 rounded-full mr-2 shadow-sm"></span>
          Red Lane (Wait)
        </span>
        <span className="inline-flex items-center text-sm">
          <span className="w-3 h-3 bg-blue-400 rounded-full mr-2 shadow-sm"></span>
          Vehicle
        </span>
      </div>
    </div>
  );
}
