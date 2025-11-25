"use client";

import { RoleBasedRoute } from "@/features";
import { AnomalyDetectionDashboard } from "@/features/panel/admin/anomaly-detection";

export default function AnomalyDetectionPage() {
  return (
    <RoleBasedRoute allowedRoles={["ADMIN", "EDITOR"]}>
      <AnomalyDetectionDashboard />
    </RoleBasedRoute>
  );
}
