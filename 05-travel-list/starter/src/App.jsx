import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import PackingList from "./PackingList";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Form />
        <PackingList />
        <Footer />
      </div>
    </>
  );
}

export default App;
