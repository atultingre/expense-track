import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartDashboard = ({ budgetList }) => {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={budgetList} margin={{ top: 7 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" fill="#4845d2" stackId={"a"} />
          <Bar dataKey="amount" fill="#c3c2ff" stackId={"a"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
