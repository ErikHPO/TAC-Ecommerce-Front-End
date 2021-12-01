import './App.css';
import Footer from './components/Footer'
import Login from './components/Login'
import ProductCard from './components/ProductCard'
import ProductPagination from './components/ProductPagination';
import {  BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from './components/NotFound'


function App() {
  return (
    <>
    <body>
      <Router>
             <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ProductPagination/>}/>
        <Route path="/product/:id" element={<ProductCard/> }/>
        <Route path="*" element={<NotFound/>}/>
            </Routes>
      
      </Router>

    {/* <ProductCard id={3}/> */}
      </body>
      
      <Footer></Footer>
    
    </>
  );
}

export default App;
