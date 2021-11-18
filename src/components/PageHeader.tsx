export function PageHeader(props: {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  showOption: string;
  setShowOption: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const sortOptions = ["Creation date", "Due date"];
  const showOptions = ["All", "Overdue"];
  const radioButton = (
    option: string,
    groupName: string,
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>
  ): JSX.Element => {
    return (
      <>
        <input
          type="radio"
          name={groupName}
          value={option}
          id={option}
          key={option}
          checked={state === option}
          onChange={(e) => setState(e.target.value)}
        />
        <label htmlFor={option}>{option}</label>
      </>
    );
  };

  return (
    <header>
      <h1>My To-do List</h1>

      <label>Sort by:</label>
      {sortOptions.map((option) =>
        radioButton(option, "sort-option", props.sortBy, props.setSortBy)
      )}

      <br />

      <label>Show:</label>
      {showOptions.map((option) =>
        radioButton(
          option,
          "show-option",
          props.showOption,
          props.setShowOption
        )
      )}
    </header>
  );
}
