import { redirect } from "react-router-dom";
import {
  createBudget,
  createExpense,
  deleteItem,
  getAllMatchingItems,
  waiting,
} from "../helper/helper.js";
import { toast } from "react-toastify";

export const logoutAction = async (e) => {
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });
  toast.success("You've Deleted your account");
  return redirect("/");
};

export const dashboardAction = async ({ request }) => {
  await waiting();
  // console.log(request);
  // console.log(request.formData());

  const data = await request.formData();
  // console.log(data);

  const { _action, ...values } = Object.fromEntries(data);
  // console.log(_action);
  // console.log(values);
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values?.userName));
      toast.success(`Welcome! ${values?.userName}`);
      // redirect("/");
    } catch (error) {
      throw new Error("There was a problem creating your Account");
    }
  }
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Your budget is created");
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Your ${values.newExpense} Expense  is created`);
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values?.expenseId,
      });
      return toast.success("Your Expense  is Deleted");
    } catch (error) {
      throw new Error("There was a problem deleting your expense");
    }
  }
};

export const expenseAction = async ({ request }) => {
  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values?.expenseId,
      });
      return toast.success("Your Expense  is Deleted");
    } catch (error) {
      throw new Error("There was a problem deleting your expense");
    }
  }
};
export const budgetAction = async ({ request }) => {
  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Your ${values.newExpense} Expense  is created`);
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values?.expenseId,
      });
      return toast.success("Your Expense  is Deleted");
    } catch (error) {
      throw new Error("There was a problem deleting your expense");
    }
  }
};

export function deleteBudget({ params }) {
  console.log("Budget Loader Params:", params);
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      console.log("match", expense);

      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully!");
    return redirect("/");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }
}
