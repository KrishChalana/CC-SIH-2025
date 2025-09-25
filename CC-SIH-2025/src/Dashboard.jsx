import TrafficTable from "./components/Table"
import Card from "./components/card";
import DoodleButton from "./components/doodleButton"
import { FaTrafficLight } from "react-icons/fa";
import { Progress } from "./components/ui/progress"
export default function Dashboard()
{
    return(
        <>
        <nav className={`montserrat-font  relative top-0 left-0 right-0 z-50 transition-all duration-400 backdrop-blur-xl `}>
        <div className="container mx-auto px-4 py-4 flex justify-center gap-20 items-center">
          <div className="flex items-center space-x-3">
            <div className="text-3xl text-gray-800">🚦</div>
            <span className="text-xl font-bold text-gray-800">Traffic-Slashers</span>
          </div>
          <div className="flex space-x-6">
            <a href="#home" text="Home" />
            <a href="#dashboard" text="Dashboard" />
            <a href="#comparison" text="Comparison" />
            <a href="#features" text="Features" />
               <a href="/main" className='bg-yellow-400 relative px-4 py-3 text-black border-2 border-black  shadow-lg shadow-black transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer'> Get started </a>
          </div>
        </div>
      </nav>
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