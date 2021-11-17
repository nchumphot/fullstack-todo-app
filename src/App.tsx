import { MainContent } from "./components/MainContent";
import { PageHeader } from "./components/PageHeader";
import DbItemWithId from "./components/DbItemWithId";
import { useState, useEffect } from "react";
import { AddNewItem } from "./components/AddNewItem";
import { fetchData } from "./utils/fetchData";

function App(): JSX.Element {
  const [data, setData] = useState<DbItemWithId[]>([]);
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "my-project.herokuapp.com"
      : "http://localhost:4000/items";
  // Fetching data from API
  useEffect(() => {
    fetchData(baseUrl, setData);
  }, [baseUrl, data]);

  return (
    <>
      <PageHeader />
      <AddNewItem url={baseUrl} {...{ data, setData }} />
      <MainContent url={baseUrl} {...{ data, setData }} />
    </>
  );
}

export default App;
