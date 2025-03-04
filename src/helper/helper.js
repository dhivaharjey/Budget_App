export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
// Local storage functions

export const waiting = () =>
  new Promise((res) => setTimeout(res, Math.random() * 1500));
const generateRandomColor = () => {
  const exsistingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${exsistingBudgetLength * 34} 65% 50%`;
};
export const createBudget = ({ name, amount }) => {
  const newBudget = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: Number(amount),
    color: generateRandomColor(),
  };
  const exsistingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...exsistingBudgets, newBudget])
  );
};
export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: Number(amount),
    // clolor: generateRandomColor(),
    budgetId: budgetId,
  };
  const exsistingExpense = fetchData("expenses") ?? [];
  console.log(newExpense);
  console.log(JSON.stringify(newExpense));

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...exsistingExpense, newExpense])
  );
};

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses?.reduce((acc, expense) => {
    if (expense?.budgetId !== budgetId) {
      return acc;
    } else {
      return (acc += expense?.amount);
    }
  }, 0);
  return budgetSpent;
};

export const formatPercentage = (amt) => {
  return Number(amt).toLocaleString("en-IN", {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
export const formatCurrency = (amt) => {
  // console.log("currency", amt);
  return Number(amt).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

export const formatDate = (createdAt) => {
  return new Date(createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getAllMatchingItems = ({ category, key, value }) => {
  console.log(`Fetching ${category} where ${key} = ${value}`);

  const data = fetchData(category) ?? [];
  const matchedItems = data.filter((item) => item[key] === value);

  console.log("Matched items:", matchedItems);
  return matchedItems;
};
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item?.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
