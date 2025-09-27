import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

export function PriorityScoreTable({ lanes }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-indigo-200 p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-indigo-600">
         Scores
      </h3>
      <Table>
        <TableCaption className="text-gray-500">
          Coordinated Priority Scoring per Lane
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-green-200">
            <TableHead className=" font-semibold">Lane ID</TableHead>
          
            <TableHead className="text-green-700 font-semibold text-center">
              CPS Score
            </TableHead>
               
             <TableHead className="text-green-700 font-semibold text-center">
              Platoon Speed
            </TableHead>
            <TableHead className="text-green-700 font-semibold text-center">
              Priority Bonus
            </TableHead>

          </TableRow>
                      

        </TableHeader>

        
        <TableBody>
          {lanes.map((lane, idx) => (
            <TableRow key={idx} className="hover:bg-indigo-50 transition">
              <TableCell className="font-medium text-gray-800">{lane}</TableCell>
              <TableCell className="text-center font-bold text-gray-500">
                {(idx + 1) * 15}
              </TableCell>
                <TableCell className="text-center font-bold text-gray-500">
                {(idx + 1) * 9}
              </TableCell>
              <TableCell className="text-center font-bold text-gray-500">
                {(idx + 1) * 5}
              </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
