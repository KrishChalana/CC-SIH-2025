import "./Dashboard.css"
import DropDown from "./components/Dropdown"
import DoodleButton from "./components/doodleButton"
import { MdOutlineAccessTime } from 'react-icons/md';
import { FaRegBell } from 'react-icons/fa';
import DoodleCard from "./components/doodleCard";

export default function Dashboard() {
    return (


        <>
            <div className="flex w-[100vw] h-[100vh]">
                <div className="p-2 flex flex-col schoolbell-regular bg-yellow-400 h-[100vh] w-54">
                    <h1 className="text-4xl m-10 ">R.O.A.D.S</h1>
                    <DropDown text="Choose The approach" title="All Approaches" values={["hello", "yello", "mellow"]} />
                    <DropDown text="Lane:" title="All Approaches" values={["hello", "yello", "mellow"]} />
                    <DropDown text="Time Window" title="All Approaches" values={["hello", "yello", "mellow"]} />
                    <DoodleButton text="Apply" onClick={() => { }} />

                </div>


                <div className="w-full h-full bg-gray-100">
                    <div className="flex gap-10  items-center justify-around w-[1080px] mx-20 mt-2  rounded-xl h-13 bg-green-300">

                        <div className="flex justify-center items-center"> 
                            <h2 className="loved-by-the-king-regular p-3 text-xl">
                                Jamaia Milia Islamia Rd
                            </h2>
                            <div className="flex gap-2">
                                <MdOutlineAccessTime className="mt-[1.7px]" />
                                <h2 className="text-sm">10:20:20</h2>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-10">
                            <h2>Model: Y2K 1 (92% accuracy) </h2>
                            <FaRegBell/>
                            <img className=" rounded-full border-4 border-yellow-400 w-10 h-10" src="https://live.staticflickr.com/5289/5216270546_c63e5361cc_b.jpg" alt="" />
                            
                        </div>






                    </div>


                    <DoodleCard title="Traffic Density" className="w-96 h-96 m-10"/>


                </div>
            </div>

        </>
    )

}