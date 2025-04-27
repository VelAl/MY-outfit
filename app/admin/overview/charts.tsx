"use client";
// Recharts relies on window, document, and other browser APIs — must be a client component

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type T_Props = {
  data: { salesData: { month: string; totalSales: number }[] };
};

const Charts = ({ data: { salesData } }: T_Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />

        <Bar
          className="fill-primary"
          dataKey="totalSales"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Charts;
