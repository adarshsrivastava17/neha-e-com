import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function OrderHistoryPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  const orders = await db.order.findMany({ where: { userId: session.userId }, orderBy: { createdAt: "desc" } });

  return <section className="container-shell py-12"><h1 className="text-3xl font-semibold">Order History</h1><div className="mt-6 space-y-3">{orders.map((o) => <div key={o.id} className="glass-card p-4"><p>{o.orderNumber}</p><p className="text-sm">{o.status}</p></div>)}</div></section>;
}
