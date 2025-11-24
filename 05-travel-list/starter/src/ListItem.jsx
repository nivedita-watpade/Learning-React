function ListItem(props) {
  const { item } = props;
  return (
    <li>
      <input type="checkbox" />

      <span
        className={item.packed ? "strike" : " "}
        //  style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

export default ListItem;
