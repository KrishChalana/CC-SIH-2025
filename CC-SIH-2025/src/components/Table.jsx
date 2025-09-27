import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

export default function TrafficTable({ Lane }) {
  return (
    <div className="mt-10 mb-10 border-gray-200 border-2 rounded-md p-4 shadow-xl">
      <Table>
        <TableCaption>Lane Status</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[120px]">Lane Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vehicle Count</TableHead>
            <TableHead>Bike</TableHead>
            <TableHead>Bus</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Ambulance</TableHead>
            <TableHead className="text-right">Average Speed</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Lane 1 */}
          <TableRow>
            <TableCell className="font-medium">{Lane[0]}</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Open
              </span>
            </TableCell>
            <TableCell>250</TableCell>
            <TableCell>40</TableCell>
            <TableCell>10</TableCell>
            <TableCell>190</TableCell>
            <TableCell>10</TableCell>
            <TableCell className="text-right">50 mph</TableCell>
          </TableRow>

          {/* Lane 2 */}
          <TableRow>
            <TableCell className="font-medium">{Lane[1]}</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Open
              </span>
            </TableCell>
            <TableCell>300</TableCell>
            <TableCell>60</TableCell>
            <TableCell>15</TableCell>
            <TableCell>220</TableCell>
            <TableCell>5</TableCell>
            <TableCell className="text-right">40 mph</TableCell>
          </TableRow>

          {/* Lane 3 */}
          <TableRow>
            <TableCell className="font-medium">{Lane[2]}</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                Closed
              </span>
            </TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell className="text-right">0 mph</TableCell>
          </TableRow>

          {/* Lane 4 */}
          <TableRow>
            <TableCell className="font-medium">{Lane[3]}</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Open
              </span>
            </TableCell>
            <TableCell>200</TableCell>
            <TableCell>30</TableCell>
            <TableCell>8</TableCell>
            <TableCell>155</TableCell>
            <TableCell>7</TableCell>
            <TableCell className="text-right">55 mph</TableCell>
          </TableRow>

          {/* Lane 5 (example extra lane) */}
        </TableBody>
      </Table>
    </div>
  )
}
