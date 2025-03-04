import React from "react";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helper/helper";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/16/solid";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  // console.log(id);
  const spentAmount = calculateSpentByBudget(id);
  return (
    <>
      <div
        className="budget"
        style={{
          "--accent": color,
        }}
      >
        <div className="progress-text">
          <h3>{name}</h3>
          <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spentAmount}>
          {formatPercentage(spentAmount / amount)}
        </progress>
        <div className="progress-text">
          <small>{formatCurrency(spentAmount)} spent</small>
          <small>{formatCurrency(amount - spentAmount)} remaining</small>
        </div>
        {showDelete ? (
          <div className="flex-sm">
            <Form
              method="post"
              action="delete"
              onSubmit={(e) => {
                if (
                  !confirm(
                    "Are you sure you want to permanantly dletethis budget??"
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              <button type="submit" className="btn ">
                <span>Delete</span>
                <TrashIcon width={20} />
              </button>
            </Form>
          </div>
        ) : (
          <div className="flex-sm">
            <Link to={`/budget/${id}`} className="btn">
              <span>View Details</span>
              <BanknotesIcon width={20} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetItem;
