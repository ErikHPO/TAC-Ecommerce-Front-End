import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [addedToCart , setAddedToCart] = React.useState(false);
  React.useEffect( () => {
    addedToCart ? console.log('Adicionado no carrinho.') : console.log("Removido do carrinho.")
  }, [addedToCart])


  const handleClick = () => {
    setOpen(true);
    setAddedToCart(!addedToCart);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      
        {addedToCart ? 
        <>
                <Button variant="outlined" color="secondary" onClick={handleClick}>
          <RemoveShoppingCartIcon/>
          Remover do Carrinho
              </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         Produto adicionado no carrinho
        </Alert>
      </Snackbar>
        </>
        :
        <>
        <Button variant="outlined" onClick={handleClick}>
          <AddShoppingCartIcon/>
          Adicionar ao Carrinho
              </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
         Produto removido do Carrinho
        </Alert>
      </Snackbar>        
        </>
        }

    </Stack>
  );
}