"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { Budgets, Expenses } from "@/utils/schema";

const BudgetList = () => {
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
    <div className="mt-7">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
