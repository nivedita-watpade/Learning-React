import Button from "./Button";

const FriendItem = ({
  friend,
  selectedFriend,
  setSelectedFriend,
  setShowAddFriend,
}) => {
  const { id, name, image, balance } = friend;

  function handleBillSplit(frndId) {
    setSelectedFriend((curr) => (curr?.id === frndId ? null : friend));
    setShowAddFriend(false);
  }

  const isSelected = selectedFriend?.id === id;

  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={image || null} alt={name} />
        <h3>{name}</h3>

        {balance < 0 && (
          <p className="red">
            You owe {name} {Math.abs(balance)} Rs
          </p>
        )}

        {balance > 0 && (
          <p className="green">
            {name} ows you {balance} Rs
          </p>
        )}

        {balance === 0 && <p>You & {name} are even </p>}

        <Button
          onClickHandler={() => handleBillSplit(id)}
          text={isSelected ? "Close" : "Select"}
        ></Button>
      </li>
    </>
  );
};

export default FriendItem;
