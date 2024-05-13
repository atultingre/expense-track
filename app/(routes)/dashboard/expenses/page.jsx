"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Budgets, Expenses } from "@/utils/schema";
import ExpenseListTable from "./_components/ExpenseListTable";

const UserExpenses = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    // user && getBudgetList();
    user && getAllExpenses();
  }, [user]);

  // Used to get budget list
  // const getBudgetList = async () => {
  //   const result = await db
  //     .select({
  //       ...getTableColumns(Budgets),
  //       totalSpend: sql`sum(${Expenses.amount})`.as("totalSpend"),
  //       totalItem: sql`count(${Expenses.id})`.as("totalItem"),
  //     })
  //     .from(Budgets)
  //     .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
  //     .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
  //     .groupBy(Budgets.id)
  //     .orderBy(desc(Budgets.id));
  //   setBudgetList(result);
  // };

  // Used to get all expenses belong to user
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getBudgetList()}
      />
    </div>
  );
};

export default UserExpenses;
