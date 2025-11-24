function Form() {
  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {/* <form> */}
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
      {/* </form> */}
    </form>
  );
}

export default Form;
