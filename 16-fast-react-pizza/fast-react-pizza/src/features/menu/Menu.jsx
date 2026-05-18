import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);

  return (
    <>
      <h1>Menu</h1>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </>
  );
}

export async function dataFetch() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
