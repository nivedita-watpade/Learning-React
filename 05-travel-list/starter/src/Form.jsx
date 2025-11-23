function Form() {
  return (
    <div className="add-form">
      {/* <form> */}
      <h3>What do you need for your trip?</h3>
      <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
      {/* </form> */}
    </div>
  );
}

export default Form;
