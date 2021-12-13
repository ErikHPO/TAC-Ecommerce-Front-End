import './App.css';
import React from 'react';
import { useState } from 'react';
import { Badge, Drawer } from "@material-ui/core";
import Footer from './components/Footer';
import AuthStateApp from './components/LoginCognito'
import ProductPagination from './components/Product/ProductPagination';
import {  BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from './components/NotFound'
import Navbar from './components/Navbar';
import Cart from './components/Cart/Cart';
import  AddShoppingCart  from "@mui/icons-material/AddShoppingCart";
import { Wrapper, StyledButton } from "./App.styles";
import ProductForm from './components/Product/ProductForm';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import {  AmplifyAuthenticator } from '@aws-amplify/ui-react';
import SinglePageProduct from './components/Product/SinglePageProduct';
import { useParams } from 'react-router-dom';





Amplify.configure(awsconfig);


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
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();
  const {param} = useParams();
  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData)
    });
}, []);

console.log("USR:",user);
console.log("AuthState:",authState);
console.log("param",param);

  const getTotalItems = (items: CartItemType[]) =>
  items.reduce((acc, item) => acc + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      localStorage.setItem("id","teste");
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



  return authState === AuthState.SignedIn && user ? (
    <>
      <Router>
    <Navbar username={user} />
    <body>
    <Wrapper>
      
      <Drawer hideBackdrop={false} anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
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
             <Routes>
        <Route path="/login" element={<AuthStateApp/>}/>
        <Route path="/new" element={<ProductForm/>}/>
        <Route path="/edit/:id" element={<ProductForm/>}/>
        <Route path="/" element={<ProductPagination handleAddToCart={handleAddToCart}/>}/>
        <Route path="/product/:id" element={<SinglePageProduct /> }/>
        <Route path="*" element={<NotFound/>}/>
            </Routes>
      
      </body>
      </Router>

    {/* <ProductCard id={3}/> */}
      
      <Footer></Footer>
    
    </>
  )
  :
  <AmplifyAuthenticator />

  ;
}

export default App;
