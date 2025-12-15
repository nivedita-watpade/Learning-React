function Footer({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your list ...</em>{" "}
      </footer>
    );

  const packedItemsCount = items.reduce((acc, item) => {
    if (item.packed) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const packedItemsPercentage = (packedItemsCount / items.length) * 100;

  return (
    <footer className="stats">
      <em>
        {packedItemsPercentage === 100
          ? "You got everything! Ready to Go!!"
          : `💼 You have ${
              items.length
            } items on your list, and you already packed
        ${packedItemsCount} (${Math.round(packedItemsPercentage)}%)`}
      </em>
    </footer>
  );
}

export default Footer;
