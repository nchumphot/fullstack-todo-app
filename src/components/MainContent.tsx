import axios from "axios";
import DbItemWithId from "./DbItemWithId";

export function MainContent(props: {
  url: string;
  data: DbItemWithId[];
  setData: React.Dispatch<React.SetStateAction<DbItemWithId[]>>;
}): JSX.Element {
  const handleMarkAsCompleted = (toDoItem: DbItemWithId) => {
    const urlToChange: string = props.url + "/" + toDoItem.id.toString();
    axios
      .patch(urlToChange, { isComplete: true })
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
          {toDoItem.description}{" "}
          <small>{toDoItem.isComplete ? "☑️" : "🔜"}</small>
        </h2>
        <p>Due date: {toDoItem.dueDate}</p>
        <button onMouseDown={() => handleMarkAsCompleted(toDoItem)}>
          Mark as completed
        </button>
        <button onMouseDown={() => handleDelete(toDoItem)}>Delete</button>
      </div>
    );
  };

  const ToDoList = (): JSX.Element => {
    return <>{props.data.map((item) => ToDoEntry(item))}</>;
  };

  return (
    <>
      <ToDoList />
    </>
  );
}
