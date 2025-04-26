import { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";

import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrdersSummary } from "@/lib/actions/order.actions";
import { formatDateTime, formatUSDPrice } from "@/lib/utils";

import { statisticsStructure } from "./helpers";

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
            <CardTitle>overview</CardTitle>
          </CardHeader>

          <CardContent>{/* CGART HERE*/}</CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>recent sales</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BUYER</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>TOTAL</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {summary.latestSales.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order?.user?.name || 'Deleted User'}</TableCell>
                    <TableCell>
                      {formatDateTime(order.createdAt).dateTime}
                    </TableCell>
                    <TableCell>{formatUSDPrice(order.totalPrice)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end text-primary">
                        <Link
                          href={`/order/${order.id}`}
                          className="transition-transform duration-200 hover:scale-[1.2]"
                        >
                          <Eye />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default OverviewPage;
