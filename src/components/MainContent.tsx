import axios from "axios";
// import { useState } from "react";
import DbItemWithId from "./DbItemWithId";

export function MainContent(props: {
  url: string;
  data: DbItemWithId[];
  setData: React.Dispatch<React.SetStateAction<DbItemWithId[]>>;
  sortBy: string;
  showOption: string;
}): JSX.Element {
  const todaysDate: Date = new Date();
  const handleMarkAsCompleted = (toDoItem: DbItemWithId) => {
    const urlToChange: string = props.url + "/" + toDoItem.id.toString();
    axios
      .patch(urlToChange, { isComplete: true })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  const handleMarkAsNotCompleted = (toDoItem: DbItemWithId) => {
    const urlToChange: string = props.url + "/" + toDoItem.id.toString();
    axios
      .patch(urlToChange, { isComplete: false })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  const handleDelete = (toDoItem: DbItemWithId) => {
    const urlToChange: string = props.url + "/" + toDoItem.id.toString();
    axios.delete(urlToChange);
  };

  const ToDoEntry = (toDoItem: DbItemWithId): JSX.Element => {
    return (
      <div key={toDoItem.id}>
        <hr />
        <h2>
          {toDoItem.isComplete ? (
            <button onMouseDown={() => handleMarkAsNotCompleted(toDoItem)}>
              ☑️
            </button>
          ) : (
            <button onMouseDown={() => handleMarkAsCompleted(toDoItem)}>
              🔜
            </button>
          )}{" "}
          {toDoItem.description}
        </h2>
        {toDoItem.dueDate && (
          <p
            className={
              todaysDate.getTime() > new Date(toDoItem.dueDate).getTime() &&
              !toDoItem.isComplete
                ? "late"
                : ""
            }
          >
            Due date: {toDoItem.dueDate}
          </p>
        )}
        <button onMouseDown={() => handleDelete(toDoItem)}>Delete</button>
      </div>
    );
  };

  const ToDoList = (): JSX.Element => {
    return (
      <>
        {props.data
          .sort((a, b) => {
            if (props.sortBy === "Due date") {
              return Date.parse(a.dueDate) - Date.parse(b.dueDate);
            } else if (props.sortBy === "Creation date") {
              return Date.parse(a.creationDate) - Date.parse(b.creationDate);
            } else {
              return 0;
            }
          })
          .filter((item) => {
            const dueDate: Date = new Date(item.dueDate);
            if (props.showOption === "Overdue") {
              if (
                todaysDate.getTime() > dueDate.getTime() &&
                !item.isComplete
              ) {
                return item;
              } else {
                return null;
              }
            } else {
              return item;
            }
          })
          .map((item) => ToDoEntry(item))}
      </>
    );
  };

  return (
    <>
      <ToDoList />
    </>
  );
}
