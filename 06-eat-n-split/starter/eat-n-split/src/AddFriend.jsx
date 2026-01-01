import { useState } from "react";
import Button from "./Button";

const AddFriend = ({ setFriends }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("https://i.pravatar.cc/48");

  function addFriend(e) {
    e.preventDefault();
    if (!name) return;
    const newFriend = {
      id: Date.now(),
      name,
      image: `${url}?=${Date.now()}`,
      balance: 0,
    };
    setFriends((prev) => [...prev, newFriend]);
    setName("");
    setUrl("");
  }

  return (
    <form className="form">
      <div className="form-add-friend ">
        <label htmlFor="frndName">Friend Name</label>
        <input
          type="text"
          id="frndName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-add-friend ">
        <label htmlFor="imgUrl">Image URL</label>
        <input
          type="text"
          id="imgUrl"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="form-add-friend ">
        <Button onClickHandler={addFriend} text={"Add"}></Button>
      </div>
    </form>
  );
};

export default AddFriend;
