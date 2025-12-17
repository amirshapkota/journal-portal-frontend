import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * TableSkeleton - A generic skeleton loader for tables.
 * Use for loading states in any table-based UI.
 *
 * @param {number} columns - Number of columns (default: 4)
 * @param {number} rows - Number of rows (default: 5)
 * @param {string[]} headers - Optional array of header labels
 * @param {string} className - Additional classes for the table wrapper
 */
export default function TableSkeleton({ columns = 4, rows = 5, headers = [], className = '' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-lg ${className}`}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            {(headers.length > 0 ? headers : Array(columns).fill('')).map((header, i) => (
              <TableHead key={i} className="text-foreground">
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(rows)
            .fill(0)
            .map((_, rowIdx) => (
              <TableRow key={rowIdx} className="border-b border-border animate-pulse">
                {Array(columns)
                  .fill(0)
                  .map((_, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton className="h-6 w-2/3 block" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
