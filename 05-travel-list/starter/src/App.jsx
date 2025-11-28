import { useState } from "react";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import PackingList from "./PackingList";

function App() {
  const [items, setItems] = useState([]);
  return (
    <>
      <div className="app">
        <Header />
        <Form setItems={setItems} />
        <PackingList items={items} />
        <Footer />
      </div>
    </>
  );
}

export default App;
