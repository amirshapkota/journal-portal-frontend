import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * CardSkeleton - A generic skeleton loader for card layouts.
 * Use for loading states in any card-based UI.
 *
 * @param {number} rows - Number of info rows (default: 6)
 * @param {string} className - Additional classes for the card
 */
export default function CardSkeleton({ rows = 6, className = "" }) {
  return (
    <Card className={`w-full animate-pulse opacity-80 ${className}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="pb-1">
              <Skeleton className="h-6 w-32  mb-2" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-40 " />
            </CardDescription>
          </div>
          <div className="h-8 w-24 " />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(rows)].map((_, i) => (
            <div className="space-y-1" key={i}>
              <Skeleton className="h-4 w-24 " />
              <Skeleton className="h-4 w-32 " />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
