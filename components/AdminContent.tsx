'use client';

import AdminDashboard from "@/app/admin/AdminDashboard";
import { Order } from "@/types/types";

type AdminContProps = {
    orders?: Order[];
    stats?: unknown;
};

// Legacy compatibility wrapper kept to avoid breaking old imports.
export const AdminCont: React.FC<AdminContProps> = () => {
    return <AdminDashboard />;
};