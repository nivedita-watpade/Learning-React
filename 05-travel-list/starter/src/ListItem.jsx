function ListItem(props) {
  const { item, setItems } = props;

  function handleDeleteItem(itemId) {
    setItems((existingItems) =>
      existingItems.filter((existingItem) => {
        return existingItem.id !== itemId;
      })
    );
  }

  function handleCheckList(itemId) {
    setItems((prevItems) =>
      prevItems.map((prevItem) => {
        if (prevItem.id === itemId) {
          return { ...prevItem, packed: !prevItem.packed };
        } else {
          return prevItem;
        }
      })
    );
  }

  return (
    <li>
      <input
        type="checkbox"
        // value={item.packed}
        onChange={() => handleCheckList(item.id)}
      />
      <span
        className={item.packed ? "strike" : " "}
        //  style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
}

export default ListItem;
