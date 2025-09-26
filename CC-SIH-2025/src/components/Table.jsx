import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

export default function TrafficTable(){
    return(
        <>

        <div className={"border-gray-200 border-2 rounded-md p-4 shadow-xl"}> 
        <Table >
          <TableCaption>Lane Status</TableCaption>
          <TableHeader>
            <TableRow className={'bg-gray-100'}> {/* Adjusted color for a light header background */}
              <TableHead className="w-[120px]">Lane Id</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vehicle Count</TableHead>
              <TableHead className="text-right">Average Speed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Lane 1 Data */}
            <TableRow>
              <TableCell className="font-medium">Lane 1</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Open
                </span>
              </TableCell>
              <TableCell>250</TableCell>
              <TableCell className="text-right">50 mph</TableCell>
            </TableRow>

            {/* Lane 2 Data */}
            <TableRow>
              <TableCell className="font-medium">Lane 2</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Open
                </span>
              </TableCell>
              <TableCell>300</TableCell>
              <TableCell className="text-right">40 mph</TableCell>
            </TableRow>

            {/* Lane 3 Data */}
            <TableRow>
              <TableCell className="font-medium">Lane 3</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  Closed
                </span>
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell className="text-right">0 mph</TableCell>
            </TableRow>

            {/* Lane 4 Data */}
            <TableRow>
              <TableCell className="font-medium">Lane 4</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Open
                </span>
              </TableCell>
              <TableCell>200</TableCell>
              <TableCell className="text-right">55 mph</TableCell>
            </TableRow>

            {/* Lane 5 Data */}
            <TableRow>
              <TableCell className="font-medium">Lane 5</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                  Congested
                </span>
              </TableCell>
              <TableCell>150</TableCell>
              <TableCell className="text-right">20 mph</TableCell>
            </TableRow>
          
          </TableBody>
        </Table>
        </div>
        </>
    )
}