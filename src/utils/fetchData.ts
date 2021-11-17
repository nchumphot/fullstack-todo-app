import DbItemWithId from "../components/DbItemWithId";
import React from "react";

export const fetchData = async (
  url: string,
  setData: React.Dispatch<React.SetStateAction<DbItemWithId[]>>
): Promise<void> => {
  const response = await fetch(url);
  const jsonBody: DbItemWithId[] = await response.json();
  setData(jsonBody);
};
