import DbItemWithId from "./DbItemWithId";
import { useState } from "react";
import axios from "axios";
import { fetchData } from "../utils/fetchData";

export function AddNewItem(props: {
  url: string;
  data: DbItemWithId[];
  setData: React.Dispatch<React.SetStateAction<DbItemWithId[]>>;
}): JSX.Element {
  // console.log("Now rendering AddNewItem");
  const [myDescription, setMyDescription] = useState<string>("");
  const [myDueDate, setMyDueDate] = useState<string>("");

  const handleAddNewItem = () => {
    if (myDescription === "" && myDueDate === "") {
      alert("Please enter what you want to do and a due date (optional)");
    } else if (myDescription === "") {
      alert("Please enter what you want to do");
    } else {
      axios.post(props.url, {
        description: myDescription,
        isComplete: false,
        creationDate: new Date(),
        dueDate: new Date(myDueDate),
      });
      // .then((response) => console.log(response))
      // .catch((error) => console.log(error));
      fetchData(props.url, props.setData);
      setMyDescription("");
      setMyDueDate("");
      alert("New to-do item added successfully!");
    }
  };

  return (
    <>
      <h2>Add a new item</h2>
      <input
        required
        type="text"
        placeholder="What do I have to do?"
        value={myDescription}
        onChange={(e) => {
          setMyDescription(e.target.value);
          console.log("My new description is:", e.target.value);
        }}
      />
      <br />
      <br />
      <label>Due date:</label>{" "}
      <input
        required
        type="date"
        value={myDueDate}
        onChange={(e) => {
          setMyDueDate(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={handleAddNewItem}>Add item</button>
    </>
  );
}
