import { useState } from "react";
import ListItem from "./ListItem";

function PackingList({ items, setItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === "status")
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );

  // function handleSorting(e) {
  //   if (e.target.value === "input") {
  //     const sortedItem = [...items].sort((a, b) => b.quantity - a.quantity);
  //     setItems([...sortedItem]);
  //   }

  //   if (e.target.value === "status") {
  //     const sortedItem = [...items].sort(
  //       (a, b) => Number(b.packed) - Number(a.packed)
  //     );
  //     setItems([...sortedItem]);
  //   }
  // }

  // console.log(sortedItem);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return <ListItem item={item} key={item.id} setItems={setItems} />;
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By input number</option>
          <option value="description">Sort by description</option>
          <option value="status">Sort by packed status</option>
        </select>
        <button
          onClick={() => {
            const confirmation = confirm(
              "Do you really want to delete all items"
            );

            confirmation && setItems([]);
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default PackingList;
