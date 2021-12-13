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
  const [user, setUser] = React.useState<any>();
  const [userGroup, setUserGroup] = useState('');
  // const [token, setToken]= useState<any>();
  // let decode;
  

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData);
        // console.log("JWT_DECODE:", user.signInUserSession)
      });
    }, []);
    // React.useEffect( () =>{
    //   // setToken(String(user?.signInUserSession.accessToken.jwtToken));
    //   // if(token) decode = jwt_decode(token);
    //   // console.log(decode);
    // }, [user])
    
    if(authState === 'signedin') Auth.currentAuthenticatedUser()
    .then(data => {
      setUserGroup(data.signInUserSession.accessToken.payload['cognito:groups'][0])
      console.log(data.signInUserSession.accessToken.payload['cognito:groups'][0])
  });
    // if (token) decode = jwt_decode(token);
//########### DEBUG LOG ############################################
    // user?.filter(item => console.log(item))
    // console.log('tipeof:', typeof user)
    // console.log('decode:',decode);
// console.log("USR:",String(user?.signInUserSession.accessToken.jwtToken));
// console.log("Token JWT: ", token);
console.log("AuthState:",authState);
// console.log("JWT:"jwt_decode(user.signInUserSession.accessToken.jwtToken))
//####################################################################

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
    <Navbar username={user} isAdmin={userGroup === 'AdminGroup' && user} />
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
        <Route path="/product/:id" element={<SinglePageProduct /> }/>
        <Route path="*" element={<NotFound/>}/>
        
      {userGroup === 'AdminGroup' ? 
      <> 
      <Route path="/new" element={<ProductForm/>}/>
      <Route path="/" element={<ProductPagination isAdmin={true} handleAddToCart={handleAddToCart}/>}/>
      <Route path="/edit/:id" element={<ProductForm/>}/>
      </>
      : 
      <Route path="/" element={<ProductPagination isAdmin={false} handleAddToCart={handleAddToCart}/>}/>
      }
    
        
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
