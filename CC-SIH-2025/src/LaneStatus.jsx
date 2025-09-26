import React, { useState, useEffect } from "react";
import "./Home.css"
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

export default function LaneStatus() {
  const [intersection, setIntersection] = useState("A");
  const [lanes, setLanes] = useState(fakeData["A"]);

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
    <div className="inter-font bg-white text-gray-800 p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Traffic Management Dashboard
      </h1>

      {/* Intersection Controls */}
      <div className="flex justify-center mb-6">
        <select
          value={intersection}
          onChange={(e) => changeIntersection(e.target.value)}
          className="border rounded px-4 py-2 bg-gray-50 text-gray-700"
        >
          <option value="A">Intersection A</option>
          <option value="B">Intersection B</option>
          <option value="C">Intersection C</option>
        </select>
      </div>

      {/* Road intersection layout */}
      <div className="relative w-[400px] h-[400px] mx-auto bg-gray-100 border-4 border-gray-300">
        {/* Vertical road */}
        <div className="absolute top-0 bottom-0 left-1/2 w-24 -translate-x-1/2 bg-white"></div>

        {/* Horizontal road */}
        <div className="absolute left-0 right-0 top-1/2 h-24 -translate-y-1/2 bg-white"></div>

        {lanes.map((lane, idx) => {
          const positions = [
            { top: "20px", left: "50%", transform: "-translate-x-1/2" }, // North
            { right: "20px", top: "50%", transform: "-translate-y-1/2" }, // East
            { bottom: "20px", left: "50%", transform: "-translate-x-1/2" }, // South
            { left: "20px", top: "50%", transform: "-translate-y-1/2" }, // West
          ];

          const colors = {
            green: "bg-green-500",
            yellow: "bg-yellow-300 border border-gray-400",
            red: "bg-gray-300",
          };

          return (
            <div
              key={lane.name}
              className="absolute flex flex-col items-center"
              style={{ ...positions[idx] }}
            >
              {/* Signal light */}
              <div
                className={`w-10 h-10 rounded-full ${colors[lane.signal]} mb-2`}
              ></div>

              {/* Vehicles (small circles) */}
              <div className="flex gap-1 flex-wrap justify-center max-w-[80px] mb-2">
                {Array.from({ length: lane.vehicles }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-blue-400"
                  ></div>
                ))}
              </div>

              {/* Timer */}
              {lane.signal === "green" && (
                <div className="text-sm font-semibold">{lane.time}s</div>
              )}

              {/* Score */}
              <div className="text-xs text-gray-600">Score: {lane.score}</div> 
              <div className="text-xs text-gray-700">TS-B0{idx+1}</div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="text-center mt-10 space-x-6">
        <span className="inline-flex items-center">
          <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
          Green Lane (Go)
        </span>
        <span className="inline-flex items-center">
          <span className="w-4 h-4 bg-yellow-300 border border-gray-400 rounded-full mr-2"></span>
          Priority Lane (Next)
        </span>
        <span className="inline-flex items-center">
          <span className="w-4 h-4 bg-gray-300 rounded-full mr-2"></span>
          Red Lane (Wait)
        </span>
        <span className="inline-flex items-center">
          <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
          Vehicle
        </span>
      </div>
    </div>
  );
}