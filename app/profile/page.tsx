import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const user = await db.user.findUnique({ where: { id: session.userId }, include: { addresses: true, orders: true } });

  return (
    <section className="container-shell py-12">
      <h1 className="text-3xl font-semibold">My Profile</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6"><p>{user?.name}</p><p className="text-sm text-charcoal/70">{user?.email}</p></div>
        <div className="glass-card p-6"><h2 className="font-medium">Saved Addresses</h2>{user?.addresses.map((a) => <p key={a.id} className="mt-2 text-sm">{a.line1}, {a.city}</p>)}</div>
      </div>
    </section>
  );
}
