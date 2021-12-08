import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';


// type Props = {
//   item: CartItemType;
//   handleAddToCart: (clickedItem: CartItemType) => void;
// };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  console.log("cartbutton props>",props);
  // const [open, setOpen] = React.useState(false);



  const handleClick = () => {
    // setOpen(true);
    props.handleAddToCart(props.item);

  };

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      

        <>
        <Button variant="outlined" onClick={handleClick}>
          <AddShoppingCartIcon/>
          Adicionar ao Carrinho
              </Button>
      {/* <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
         Produto removido do Carrinho
        </Alert>
      </Snackbar>         */}
        </>
        

    </Stack>
  );
}