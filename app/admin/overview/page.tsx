import { Metadata } from "next";

import { auth } from "@/auth";
import AppTable from "@/components/shared/appTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrdersSummary } from "@/lib/actions/order.actions";

import Charts from "./charts";
import { statisticsStructure, tableStructure } from "./helpers";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const OverviewPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("Incorrect user`s role to access Dashboard page.");
  }

  const summary = await getOrdersSummary();

  return (
    <div className="space-y-4">
      <h1 className="h2-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statisticsStructure.map(({ Icon, getter, title }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font font-medium">
                {title}
              </CardTitle>
              {Icon}
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{getter(summary)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <Charts data={{ salesData: summary.salesData }} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>

          <CardContent>
            <AppTable columns={tableStructure} entities={summary.latestSales} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default OverviewPage;
