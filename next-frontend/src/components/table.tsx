import { TableCell, Table as FlowbiteTable, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import { TableBody } from "flowbite-react"
import { ReactNode } from "react"

interface CustomTableProps {
  children: ReactNode;
}

interface TableHeaderProps {
  children: ReactNode;
}

interface TableContentProps {
  children: ReactNode;
}

export function CustomTable({ children }: CustomTableProps) {
  return (
    <div className="bg-gray-100/50 p-5 rounded h-full">
      <FlowbiteTable className="w-full max-w-full" striped theme={{
        root: {
          shadow: "drop-shadow-none",
        }
      }}>
        {children}
      </FlowbiteTable>
    </div>
  )
}

export function CustomTableHeader({ children }: TableHeaderProps) {
  return (
    <TableHead>
      <TableRow className="[&>th]:bg-gray-100">
        {children}
      </TableRow>
    </TableHead>
  )
}

export function CustomTableContent({ children }: TableContentProps) {
  return (
    <TableBody>
      {children}
    </TableBody>
  )
}

// Exportar também os componentes do Flowbite para facilitar o uso
export const Table = {
  Root: CustomTable,
  Header: CustomTableHeader,
  Body: CustomTableContent,
} 