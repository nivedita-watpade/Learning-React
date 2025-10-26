import "./index.css";
import ProfileCard from "./ProfileCard";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// const user = [
//   {
//     userImg: "pizzas/focaccia.jpg",
//     name: "Nivedita Watpade",
//     bio: "I’m a creative and detail-oriented UI Developer with over 5 years of experience in designing and developing responsive,user-focused web interfaces. Skilled in HTML, CSS, JavaScript, and React.js.",
//     skills: ["HTML", "CSS", "Javascript", "React JS"],
//   },
// ];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      {/* <h1 style={{ fontSize: "48px", color: "red", textTransform: "uppercase" }}>
      Fast React Pizza Co.
    </h1> */}
      <h1> Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* <Pizaa pizza={pizzaData[0]} />
      <Pizaa pizza={pizzaData[1]} />
      <Pizaa pizza={pizzaData[2]} />
      <Pizaa pizza={pizzaData[3]} />
      <Pizaa pizza={pizzaData[4]} />
      <Pizaa pizza={pizzaData[5]} />
      <Pizaa pizza={pizzaData[6]} /> */}
      {/* <hr></hr>
      <hr></hr>
      <hr></hr>
      <ProfileCard info={user[0]} /> */}

      {/* {pizzaData.length > 0 && (
        <ul className="pizzas">
          {pizzaData.map((pizza, i) => {
            return <Pizaa pizzaObj={pizza} key={i} />;
          })}
        </ul>
      )} */}

      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.{" "}
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza, i) => {
              return <Pizaa pizzaObj={pizza} key={i} />;
            })}
          </ul>
        </>
      ) : (
        <p>We are still working on our menu. Please come back later</p>
      )}
    </main>
  );
}

// function Menu1() {
//   const pizzaItems = [];

//   if (pizzaData) {
//     for (const [i, pizza] of pizzaData.entries()) {
//       pizzaItems.push(<Pizza pizzaData={pizza} key={i} />);
//     }
//   }

//   return (
//     <main className="menu">
//       <h2>Our menu</h2>
//       <ul className="pizzas">{pizzaItems}</ul>
//     </main>
//   );
// }

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {/* {isOpen && (
        <div className="order">
          <p>
            We are open until {closeHour}:00. Come visit us or order online.
          </p>
          <button className="btn">Order</button>
        </div>
      )} */}
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>Sorry, We are closed </p>
      )}
    </footer>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We are open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

function Pizaa(props) {
  const { pizzaObj } = props;
  // if (!pizzaObj) {
  //   return null;
  // }

  if (pizzaObj?.soldOut) return null;

  return (
    <li className="pizza">
      <img src={pizzaObj?.photoName} alt={pizzaObj?.name} />
      <div>
        <h3>{pizzaObj?.name}</h3>
        <p>{pizzaObj?.ingredients}</p>
        <span>{pizzaObj?.price}</span>
      </div>
    </li>
  );
}

export default App;
