import Header from "../components/Header";
import ProductList from "../components/ProductList";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

function Home() {
  return (
    <div className="App">
      <Header />
      <ProductList />
    </div>
  );
}

export default Home;
