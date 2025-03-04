import React from "react";
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <>
      <div className="grid-lg">
        <h1>All Expenses</h1>
        {expenses?.length > 0 ? (
          <div className="grid-mg">
            <h2>
              Recent Expenses <small>({expenses?.length} total)</small>
            </h2>
            <Table
              expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
            />
          </div>
        ) : (
          <p>No Expenses to show</p>
        )}
      </div>
    </>
  );
};

export default ExpensesPage;
