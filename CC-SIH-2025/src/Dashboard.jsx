import TrafficTable from "./components/Table"
import Card from "./components/card";
import DoodleButton from "./components/doodleButton"
import { FaTrafficLight } from "react-icons/fa";
// import CongestionReport from "./Congestion_report";
import { Progress } from "./components/ui/progress"
import {Bell, ChevronDown, User} from 'lucide-react'
export default function Dashboard()
{
    return(
        <>
     <header className="inter-font flex justify-between items-center p-4 border-b border-gray-200">
    <div className="flex items-center space-x-8">
      <h1 className="text-xl font-bold text-gray-800">Traffic Control AI</h1>
      <nav className="hidden sm:flex space-x-6 text-sm">
        <a href="#" className="text-gray-500 hover:text-blue-600">Dashboard</a>
        <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Congestion Reports</a>
        <a href="#" className="text-gray-500 hover:text-blue-600">Incident Management</a>
        <a href="#" className="text-gray-500 hover:text-blue-600">Settings</a>
      </nav>
    </div>
    <div className="flex items-center space-x-4">
      <button className="p-2 rounded-full hover:bg-gray-100 relative">
        <Bell className="w-5 h-5 text-gray-600" />
        {/* Simple mock notification dot */}
        <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
      </button>
      <div className="flex items-center space-x-2">
        {/* Placeholder for user avatar/image */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600"/>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  </header>


 <div className="inter-font mt-3 mx-30">
     <h2 className="font-bold text-5xl">Dashboard</h2>
<h4>Real-Time Traffic monitoring and management</h4>

        <div className="grid grid-cols-2 gap-20">
         <div> {/*Col - 1 */} 
         
            <h4 className="mt-6">Interactive Traffic Flow</h4>

            <img src="map-image.png" className="rounded-md"  alt="Map" />

            <h3 className="text-xl font-bold my-5">Lane Status</h3>
            <TrafficTable/>
          

            </div>   


            <div className="mt-7"> {/*Col - 2 */}
             <h3 className="inter-font text-2xl m-2">Congestion Levels</h3>
                 <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <div className="p-6">
        <h2 className="text-md mb-2">City Wide</h2>
        <h2 className="text-3xl font-semibold mb-5 text-yellow-400">
          Moderate
        </h2>

        <Progress value={33}  className={"text-yellow-300 my-2"}/>
        <p className="text-gray-800 text-sm dark:text-gray-200 mb-4">
              58% of major routes experiencing <br /> slowdowns
        </p>

      </div>
    </div>
 



            <h3 className="inter-font text-xl m-2 ">Key Metrics</h3>
            <Card title={"Total Vehicles"} description={"12,456"}/>
               <Card title={"Avg Speed"} description={"45 mph"}/>
         
            <h3 className="inter-font text-xl m-2">Critical Events</h3>
            <Card title={"accident"}/>
               <Card title={"Total Vehicles"} description={"12,456"}/>
         
            <Card title={"Total Vehicles"} description={"12,456"}/>
         
           
           
            </div>


        </div>





        </div>
        
        </>
    )
}