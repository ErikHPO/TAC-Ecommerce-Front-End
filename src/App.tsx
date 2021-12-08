import './App.css';
import { useState } from 'react';
import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
import Footer from './components/Footer'
import Login from './components/Login'
import ProductCard from './components/Product/ProductCard'
import ProductPagination from './components/Product/ProductPagination';
import {  BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from './components/NotFound'
import Navbar from './components/Navbar';
import Cart from './components/Cart/Cart'
import CartItem from './components/Cart/CartItem';
import  AddShoppingCart  from "@mui/icons-material/AddShoppingCart";
import { Wrapper, StyledButton } from "./App.styles";
import ProductForm from './components/Product/ProductForm';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};


function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  console.log('cartopen:',cartItems);
  const getTotalItems = (items: CartItemType[]) =>
  items.reduce((acc, item) => acc + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  return (
    <>
    <Navbar></Navbar>
    <body>
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)} >
        <Badge badgeContent={getTotalItems(cartItems)} color="error" max={99}>
          <AddShoppingCart style={{fontSize: '35px'}}/>
        </Badge>
      </StyledButton>
      </Wrapper>
      <Router>
             <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/new" element={<ProductForm/>}/>
        <Route path="/" element={<ProductPagination handleAddToCart={handleAddToCart}/>}/>
        {/* <Route path="/product/:id" element={<ProductCard/> }/> */}
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
