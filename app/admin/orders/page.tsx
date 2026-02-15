import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const hdrs = await headers();
  const cookieHeader = hdrs.get("cookie") || "";
  const cookieToken = cookieHeader
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith("admin="))
    ?.replace("admin=", "");
  const token = hdrs.get("x-admin-token") || cookieToken;

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return (
      <div className="section">
        <div className="container max-w-2xl space-y-3">
          <p className="text-lg font-semibold text-slate-900">Unauthorized</p>
          <p className="text-slate-600">
            Provide the correct admin token via the x-admin-token header to view orders.
          </p>
        </div>
      </div>
    );
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { uploads: true },
  });

  return (
    <div className="section">
      <div className="container space-y-4">
        <h1 className="text-3xl font-semibold">Orders</h1>
        <div className="overflow-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Created
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Uploads
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3">{order.createdAt.toISOString()}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{order.email || "—"}</div>
                    <div className="text-xs text-slate-500">{order.name}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {order.vehicleRegistration} ({order.country})
                    </div>
                    <div className="text-xs text-slate-500">
                      {order.vehicleType} · {order.fuelType}
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{order.status}</td>
                  <td className="px-4 py-3">
                    {order.uploads.length ? (
                      <div className="space-y-1">
                        {order.uploads.map((u) => (
                          <a
                            key={u.id}
                            href={u.storagePath}
                            className="text-[#1F3A2E] underline"
                            target="_blank"
                          >
                            {u.storagePath}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

