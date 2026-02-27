import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/");

  const [users, products, orders] = await Promise.all([db.user.count(), db.product.count(), db.order.count()]);

  return (
    <section className="container-shell py-12">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="glass-card p-5">Users: {users}</div>
        <div className="glass-card p-5">Products: {products}</div>
        <div className="glass-card p-5">Orders: {orders}</div>
      </div>
    </section>
  );
}
