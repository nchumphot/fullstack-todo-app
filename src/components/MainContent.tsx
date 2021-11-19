import axios from "axios";
import { useState } from "react";
import DbItemWithId from "./DbItemWithId";
import { fetchData } from "../utils/fetchData";

export function MainContent(props: {
  url: string;
  data: DbItemWithId[];
  setData: React.Dispatch<React.SetStateAction<DbItemWithId[]>>;
  sortBy: string;
  showOption: string;
}): JSX.Element {
  const todaysDate: Date = new Date();
  const [modification, setModification] = useState<{
    description: string;
    dueDate: string;
  }>({
    description: "",
    dueDate: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [state, setState] = useState<number>(0); // use for re-rendering
  const handleMarkAsCompleted = (toDoItem: DbItemWithId) => {
    const urlToChange: string = props.url + "/" + toDoItem.id.toString();
    setState(1);
    axios
      .patch(urlToChange, { isComplete: true })
      .then(() => fetchData(props.url, props.setData))
      .then(() => setState(0));
  };
  const handleMarkAsNotCompleted = (toDoItem: DbItemWithId) => {
    const urlToChange: string = props.url + "/" + toDoItem.id.toString();
    setState(1);
    axios
      .patch(urlToChange, { isComplete: false })
      .then(() => fetchData(props.url, props.setData))
      .then(() => setState(0));
  };
  const handleDelete = (toDoItem: DbItemWithId) => {
    const urlToChange: string = props.url + "/" + toDoItem.id.toString();
    setState(1);
    axios
      .delete(urlToChange)
      .then(() => fetchData(props.url, props.setData))
      .then(() => setState(0));
  };
  const handleEdit = (toDoItem: DbItemWithId) => {
    const urlToChange: string = props.url + "/" + toDoItem.id.toString();
    axios.patch(urlToChange, {
      description: modification.description,
      dueDate: modification.dueDate,
    });
    fetchData(props.url, props.setData)
      .then(() => setEditId(null))
      .then(() => setModification({ description: "", dueDate: "" }));
  };

  const ToDoEntry = (toDoItem: DbItemWithId): JSX.Element => {
    const isOverdue: boolean =
      todaysDate.getTime() > new Date(toDoItem.dueDate).getTime();
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
          <p className={isOverdue && !toDoItem.isComplete ? "late" : ""}>
            Due date: {toDoItem.dueDate.substr(0, 10)}
            {/* converting from long date string to YYYY-MM-DD */}
          </p>
        )}
        {editId === toDoItem.id && (
          <form>
            <input
              type="text"
              value={modification.description}
              name="description"
              onChange={(e) => {
                console.log(e.target.name, e.target.value, modification);
                setModification({
                  ...modification,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <input
              type="date"
              value={
                modification.dueDate ? modification.dueDate.substr(0, 10) : " "
              }
              name="dueDate"
              onChange={(e) => {
                setModification({
                  ...modification,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </form>
        )}
        {editId === toDoItem.id && <br />}
        {editId === toDoItem.id ? (
          <button
            onMouseDown={() => {
              handleEdit(toDoItem);
            }}
          >
            Save
          </button>
        ) : (
          <button
            onMouseDown={() => {
              setEditId(toDoItem.id);
              setModification({
                description: toDoItem.description,
                dueDate: toDoItem.dueDate,
              });
            }}
          >
            Edit
          </button>
        )}
        <button onMouseDown={() => handleDelete(toDoItem)}>Delete</button>
      </div>
    );
  };

  const sortByOption = (a: DbItemWithId, b: DbItemWithId) => {
    if (props.sortBy === "Due date") {
      return Date.parse(a.dueDate) - Date.parse(b.dueDate);
    } else if (props.sortBy === "Creation date") {
      return Date.parse(a.creationDate) - Date.parse(b.creationDate);
    } else {
      return 0;
    }
  };

  const filterByOption = (item: DbItemWithId) => {
    const dueDate: Date = new Date(item.dueDate);
    if (props.showOption === "Overdue") {
      if (todaysDate.getTime() > dueDate.getTime() && !item.isComplete) {
        return item;
      } else {
        return null;
      }
    } else {
      return item;
    }
  };

  const ToDoList = (): JSX.Element => {
    return (
      <>
        {props.data
          .sort(sortByOption)
          .filter(filterByOption)
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
