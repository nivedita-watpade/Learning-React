import { useState } from "react";
import Button from "./Button";

const SplitBill = ({ selectedFriend, setFriends, setSelectedFriend }) => {
  const [billVal, setBillVal] = useState(0);
  const [expense, setExpense] = useState(0);
  const [payer, setPayer] = useState("You");

  const friendsExpense = billVal - expense;

  function handleSplitBill(e) {
    e.preventDefault();
    if (!billVal || !payer) return;

    const value = payer === "You" ? friendsExpense : -expense;

    setFriends((prev) => {
      return prev.map((frnd) => {
        if (frnd.id === selectedFriend.id) {
          return { ...frnd, balance: frnd.balance + value };
        } else {
          return frnd;
        }
      });
    });

    setSelectedFriend(null);
  }

  return (
    <div>
      <form className="form">
        <h2>split a bill with {selectedFriend.name}</h2>
        <div className="form-split-bill">
          <label htmlFor="billValue">Bill Value</label>
          <input
            type="text"
            id="billValue"
            value={billVal}
            onChange={(e) => {
              setBillVal(e.target.value);
            }}
          />
        </div>
        <div className="form-split-bill">
          <label htmlFor="urExpense">Your Expense</label>
          <input
            type="text"
            id="urExpense"
            value={expense}
            onChange={(e) => {
              setExpense(
                Number(e.target.value) > billVal
                  ? expense
                  : Number(e.target.value)
              );
            }}
          />
        </div>

        <div className="form-split-bill">
          <label htmlFor="expense">{selectedFriend.name}'s expense</label>
          <input type="text" id="expense" readOnly value={friendsExpense} />
        </div>

        <div className="form-split-bill">
          <label htmlFor="expense">Who's paying the bill?</label>
          <select value={payer} onChange={(e) => setPayer(e.target.value)}>
            <option value={"You"}>You</option>
            <option value={selectedFriend.name}>{selectedFriend.name}</option>
          </select>
        </div>

        <div className="form-split-bill">
          <Button onClickHandler={handleSplitBill} text={"Split Bill"}></Button>
        </div>
      </form>
    </div>
  );
};

export default SplitBill;
