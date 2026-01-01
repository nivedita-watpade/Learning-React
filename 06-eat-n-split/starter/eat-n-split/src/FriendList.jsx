import FriendItem from "./FriendItem";

const FriendList = ({
  friends,
  setSelectedFriend,
  setShowAddFriend,
  selectedFriend,
}) => {
  return (
    <>
      <ul>
        {friends.map((friend, i) => {
          return (
            <FriendItem
              selectedFriend={selectedFriend}
              setShowAddFriend={setShowAddFriend}
              friend={friend}
              key={i}
              setSelectedFriend={setSelectedFriend}
            />
          );
        })}
      </ul>
    </>
  );
};

export default FriendList;
