import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { TriangleAlert, Activity } from "lucide-react"
import { FaTrafficLight } from "react-icons/fa"
import "../Home.css"
export function SafetyTable({ lanes }) {
  return (
    <div className="inter-font bg-white rounded-xl shadow-md border border-red-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-red-600">
        Lane Safety Metrics
      </h3>
      <Table>
        <TableCaption className="text-gray-500">
          Safety events across monitored lanes
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-red-200">
            <TableHead className="w-[120px] font-semibold">Lane ID</TableHead>
            <TableHead className="text-red-700 font-semibold">
              Hard Braking
            </TableHead>
            <TableHead className="text-red-700 font-semibold">
              Tailgating
            </TableHead>
            <TableHead className="text-red-700 font-semibold">
              Safety Score
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lanes.map((lane, idx) => (
            <TableRow key={idx} className="hover:bg-red-50 transition">
              {/* Lane ID */}
              <TableCell className="font-medium text-gray-800">{lane}</TableCell>

              {/* Hard Braking */}
              <TableCell className="text-red-600">
                <div className="flex items-center gap-2">
                  <TriangleAlert className="w-4 h-4" />
                  {(idx + 1) * 3}
                </div>
              </TableCell>

              {/* Tailgating */}
              <TableCell className="text-red-500">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  {(idx + 1) * 2}
                </div>
              </TableCell>

              {/* Safety Score */}
              <TableCell className="font-bold text-red-700">
                <div className="flex items-center gap-2">
                  <FaTrafficLight className="w-4 h-4" />
                  {(idx + 1) * 4}%
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
