import React, { Fragment, useRef } from "react";
import classes from "./ExpenseForm.module.css";
let index = 0;
const ExpenseForm = () => {
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const expenseFormSubmitHandler = (e) => {
    e.preventDefault();
    const enteredExpense = expenseRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;

    let parentNode = document.getElementById("expenseList");
    let childHtml = `<li id="item${index + 1}">
    Expense: ${enteredExpense}, ${enteredDescription}, ${enteredCategory}
    </li>`;
    parentNode.innerHTML = childHtml + parentNode.innerHTML;
    expenseRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  return (
    <Fragment>
      <div className={classes["form-container"]}>
        <form onSubmit={expenseFormSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="expense">Expense Amount</label>
            <br />
            <input type="number" ref={expenseRef} />
            <br />
            <label htmlFor="description">description</label>
            <br />
            <input type="text" ref={descriptionRef} />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input list="category" ref={categoryRef} />
            <br />
            <datalist id="category">
              <option value="food" />
              <option value="fuel" />
              <option value="entertainment" />
              <option value="shopping" />
              <option value="other" />
            </datalist>
          </div>
          <div className={classes.actions}>
            <button type="submit">Add expense</button>
          </div>
        </form>
      </div>
      <div className={classes.display} id="showExpenses">
        <h3>List of expenses:</h3>
        <ul id="expenseList"></ul>
      </div>
    </Fragment>
  );
};
export default ExpenseForm;
