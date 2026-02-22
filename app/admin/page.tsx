import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return <AdminDashboard />;
}
