import { fetchData, getAllMactingItems } from "./helper";

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
};
export const homeLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};
export const expensesLoader = () => {
  const expenses = fetchData("expenses");
  return { expenses };
};

export const budgetLoader = ({ params }) => {
  const budget = getAllMactingItems({
    category: "budgets",
    key: "id",
    value: params?.id,
  })[0];
  const expenses = getAllMactingItems({
    category: "expenses",
    key: "budgetId",
    value: params?.id,
  });
  return { budget, expenses };
};
