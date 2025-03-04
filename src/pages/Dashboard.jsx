import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import FrontPage from "../components/FrontPage";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {/* <p>DashBoard</p> */}
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome !!!, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets?.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets?.map((budget) => (
                    <BudgetItem
                      key={budget?.id}
                      budget={budget}
                      // showDelete={true}
                    />
                  ))}
                </div>
                {expenses?.length > 0 && (
                  <>
                    <div className="grid-medium">
                      <h2>Recent Expenses</h2>
                      <Table
                        expenses={expenses
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 8)}
                      />
                      {expenses.length > 8 && (
                        <Link to="/allExpenses" className="btn btn--dark">
                          View all Expenses
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting os the secret to finacial freedom.</p>
                <p>Create a budget to get started!!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <FrontPage />
      )}
    </>
  );
};

export default Dashboard;
