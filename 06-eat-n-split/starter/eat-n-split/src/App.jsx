const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

import FriendList from "./FriendList";
import AddFriend from "./AddFriend";
import SplitBill from "./SplitBill";
import Button from "./Button";
import { useState } from "react";

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          setShowAddFriend={setShowAddFriend}
          setSelectedFriend={setSelectedFriend}
        />
        {showAddFriend && <AddFriend setFriends={setFriends} />}
        <br></br>
        <br></br>
        <Button
          onClickHandler={() => setShowAddFriend((prev) => !prev)}
          text={`${showAddFriend ? "Close" : "Add Friend"}`}
        ></Button>
      </div>
      {selectedFriend && (
        <SplitBill
          setShowAddFriend={setShowAddFriend}
          setFriends={setFriends}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
          key={selectedFriend?.id}
        />
      )}
    </div>
  );
}

export default App;
