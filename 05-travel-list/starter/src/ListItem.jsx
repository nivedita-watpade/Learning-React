function ListItem(props) {
  const { item, setItems } = props;

  function handleDeleteItem(itemId) {
    setItems((existingItems) =>
      existingItems.filter((existingItem) => {
        return existingItem.id !== itemId;
      })
    );
  }
  return (
    <li>
      <input type="checkbox" />

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
