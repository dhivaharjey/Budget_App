import React from "react";
import { useLoaderData } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  console.log(budget);

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }

  return (
    <>
      <div className="grid-lg" style={{ "--accent": budget?.color }}>
        <h1 className="h2">
          <span className="accent">{budget?.name}</span> Overview
        </h1>
        <div className="flex-lg">
          <BudgetItem budget={budget} showDelete={true} />
          <AddExpenseForm budgets={[budget]} />
        </div>
        {expenses?.length > 0 && (
          <>
            <div className="grid-sm">
              <h2>
                <span className="accent">{budget?.name} </span>
                Expenses
              </h2>
              <Table expenses={expenses} showBudget={false} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BudgetPage;
