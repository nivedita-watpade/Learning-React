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

const user = [
  {
    userImg: "pizzas/focaccia.jpg",
    name: "Nivedita Watpade",
    bio: "I’m a creative and detail-oriented UI Developer with over 5 years of experience in designing and developing responsive,user-focused web interfaces. Skilled in HTML, CSS, JavaScript, and React.js.",
    skills: ["HTML", "CSS", "Javascript", "React JS"],
  },
];

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
      <Pizaa pizza={pizzaData[0]} />
      <Pizaa pizza={pizzaData[1]} />
      <Pizaa pizza={pizzaData[2]} />
      <Pizaa pizza={pizzaData[3]} />
      <Pizaa pizza={pizzaData[4]} />
      <Pizaa pizza={pizzaData[5]} />
      <Pizaa pizza={pizzaData[6]} />
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <ProfileCard info={user[0]} />
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;

  return (
    <footer className="footer">
      {hour}
      {hour >= openHour && hour <= closeHour
        ? " We are currently open!"
        : " Sorry, We are closed !"}
    </footer>
  );
}

function Pizaa(props) {
  // console.log(props);
  if (!props.pizza) {
    return null;
  }
  return (
    <div className="pizza">
      <img src={props.pizza?.photoName} alt={props.pizza?.name} />
      <div>
        <h3>{props.pizza?.name}</h3>
        <p>{props.pizza?.ingredients}</p>
        <span>{props.pizza?.price}</span>
      </div>
    </div>
  );
}

export default App;
