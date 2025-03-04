import React from "react";
import ExpenseItem from "./ExpenseItem";
import { useLoaderData } from "react-router-dom";

const Table = ({ expenses, showBudget = true }) => {
  return (
    <>
      <div className="table">
        <table>
          <thead>
            <tr>
              {[
                "ExpenseName",
                "Amount",
                "Date",
                showBudget ? "Budget" : "",
              ].map((i, index) => (
                <th key={index}>{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <ExpenseItem expense={expense} showBudget={showBudget} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
