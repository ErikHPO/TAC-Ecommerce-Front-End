import './App.css';
import Footer from './components/Footer'
import Login from './components/Login'
import ProductCard from './components/ProductCard'
import ProductPagination from './components/ProductPagination';


function App() {
  return (
    <>
    <body>
    <Login></Login>
    <ProductCard id={12}></ProductCard>
    <ProductPagination></ProductPagination>
      </body>
      
      <Footer></Footer>
    
    </>
  );
}

export default App;
