import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./ExpenseForm.module.css";
import { expenseActions } from "../../store/expenseReducer";
import { useSelector, useDispatch } from "react-redux";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  console.log(totalAmount);
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [expenseData, setExpenseData] = useState();
  const [status, setStatus] = useState("");

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
        setStatus("Post successful");
        console.log(status);
      })
      .catch((err) => {
        alert(err.message);
      });

    expenseRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  const deleteHandler = useCallback(
    (key) => {
      console.log(key);
      fetch(
        `https://react-expense-tracker-6e98f-default-rtdb.firebaseio.com/expenses/${key}.json`,
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setStatus("Delete successful");
          console.log(data);
          console.log(status);
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    [status]
  );
  const editHandler = useCallback(
    (key, expense, description, category) => {
      console.log(key);
      fetch(
        `https://react-expense-tracker-6e98f-default-rtdb.firebaseio.com/expenses/${key}.json`,
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setStatus("delete before edit successful");
          console.log(data);
          console.log(status);
        })
        .catch((err) => {
          alert(err.message);
        });

      expenseRef.current.value = expense;
      descriptionRef.current.value = description;
      categoryRef.current.value = category;
    },
    [status]
  );

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
        setStatus("data loaded successfully");
        console.log(status);

        dispatch(expenseActions.addExpense(loadedData));

        const expenseList = loadedData.map(
          ({ expense, description, category, key }) => {
            return (
              <li key={key}>
                Expense: ${expense} Description: {description} category:
                {category}{" "}
                <button onClick={deleteHandler.bind(null, key)}>del</button>
                <button
                  onClick={editHandler.bind(
                    null,
                    key,
                    expense,
                    description,
                    category
                  )}
                >
                  edit
                </button>
              </li>
            );
          }
        );
        console.log(expenseList);
        setExpenseData(expenseList);
      });
  }, [setExpenseData, deleteHandler, editHandler, status, dispatch]);

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
      <div className={classes.display}>
        <h3>
          Total Amount:
          {totalAmount > 2000 ? <button>Add premium</button> : totalAmount}
        </h3>
      </div>
    </Fragment>
  );
};
export default ExpenseForm;
