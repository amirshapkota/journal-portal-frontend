"use client";

import { AnamolyDetectionDashboard, RoleBasedRoute } from "@/features";

export default function AnomalyDetectionPage() {
  return (
    <RoleBasedRoute allowedRoles={["ADMIN"]}>
      <AnamolyDetectionDashboard />
    </RoleBasedRoute>
  );
}
