import ListItem from "./ListItem";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => {
          return <ListItem item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}

export default PackingList;
