import { MainContent } from "./components/MainContent";
import { PageHeader } from "./components/PageHeader";
import DbItemWithId from "./components/DbItemWithId";
import { useState, useEffect } from "react";
import { AddNewItem } from "./components/AddNewItem";
import { fetchData } from "./utils/fetchData";
import "./css/style.css";

function App(): JSX.Element {
  const [data, setData] = useState<DbItemWithId[]>([]);
  const [sortBy, setSortBy] = useState<string>("Creation date");
  const [showOption, setShowOption] = useState<string>("All");
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://vetas-todo-app.herokuapp.com/items"
      : "http://localhost:4000/items";
  // Fetching data from API
  useEffect(() => {
    fetchData(baseUrl, setData);
  }, [baseUrl]);

  return (
    <>
      <PageHeader
        {...{ sortBy, setSortBy }}
        {...{ showOption, setShowOption }}
      />
      <AddNewItem url={baseUrl} {...{ data, setData }} />
      <MainContent
        url={baseUrl}
        {...{ data, setData }}
        sortBy={sortBy}
        showOption={showOption}
      />
    </>
  );
}

export default App;
