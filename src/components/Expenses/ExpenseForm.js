import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [expenseData, setExpenseData] = useState();
  //   const [firebaseId, setFirebaseId] = useState("");

  const expenseFormSubmitHandler = (e) => {
    e.preventDefault();
    const enteredExpense = expenseRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;

    const expenseObj = {
      expense: enteredExpense,
      description: enteredDescription,
      category: enteredCategory,
    };

    fetch(
      "https://react-expense-tracker-6e98f-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(expenseObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        // setFirebaseId(data);
      })
      .catch((err) => {
        alert(err.message);
      });

    expenseRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  useEffect(() => {
    fetch(
      `https://react-expense-tracker-6e98f-default-rtdb.firebaseio.com/expenses.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        const loadedData = [];
        for (const key in data) {
          loadedData.push({
            key: key,
            expense: data[key].expense,
            description: data[key].description,
            category: data[key].category,
          });
        }
        console.log(loadedData);
        const expenseList = loadedData.map(
          ({ expense, description, category, key }) => {
            return (
              <li key={key}>
                Expense:{expense} Description:{description} category:{category}
              </li>
            );
          }
        );
        setExpenseData(expenseList);
        console.log(expenseList);
      });

    // let parentNode = document.getElementById("expenseList");
    // let childHtml = `<li id="item${index + 1}">
    // Expense: ${enteredExpense}, ${enteredDescription}, ${enteredCategory}
    // </li>`;
    // parentNode.innerHTML = childHtml + parentNode.innerHTML;
  }, [setExpenseData]);

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
        <ul id="expenseList">{expenseData}</ul>
      </div>
    </Fragment>
  );
};
export default ExpenseForm;
