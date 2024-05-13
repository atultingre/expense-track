"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Budgets, Expenses } from "@/utils/schema";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  // Used to get budget list
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.as("totalSpend"),
        totalItem: sql`count(${Expenses.id})`.as("totalItem"),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌️</h2>
      <p className="text-gray-500 mt-1 text-lg">
        Here's what happening with your money, Lets manage your expense.
      </p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-col-1 md:grid-cols-3 mt-6">
        <div className="md:col-span-2">
          <BarChartDashboard />
        </div>
        <div className="md:col-span-1">other content</div>
      </div>
    </div>
  );
};

export default Dashboard;
