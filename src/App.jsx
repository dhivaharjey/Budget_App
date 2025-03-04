import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BudgetPage, Dashboard, Error, ExpensesPage } from "./pages";
import {
  budgetLoader,
  dashboardLoader,
  expensesLoader,
  homeLoader,
} from "./helper/Loaders";
import Home from "./Layouts/Home";
import {
  budgetAction,
  dashboardAction,
  deleteBudget,
  expenseAction,
  logoutAction,
} from "./actions/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: homeLoader,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          errorElement: <Error />,
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          // action: dashboardAction,
          action: budgetAction,
          errorElement: <Error />,
          children: [
            {
              path: "delete",
              action: deleteBudget,
            },
          ],
        },
        {
          path: "allExpenses",
          element: <ExpensesPage />,
          // loader: dashboardLoader,
          loader: expensesLoader,
          action: dashboardAction,
          // action: expenseAction,
          errorElement: <Error />,
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
