import React,  { useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { Rating } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { Button, Skeleton } from '@mui/material';
import Paper from '@mui/material/Paper';
import api from '../../utils/api'
import { useParams } from 'react-router';
import './ProductCard.css';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AddtoCart from './CartButtonAdd';

export default function SinglePageProduct(props) {
    const [loading, isLoading] = useState(true);
    const [cardData , setCardData] = useState([])
    const {id} = useParams();
useEffect(() => {
    isLoading(true);
    api.get(id).then((res) => {setCardData(res.data); console.log('Request OK'); isLoading(false);});
    return (res) => {
        
    }
}, [id])
const MAX_WIDTH = 345;
const MAX_HEIGHT = 600;

console.log('SnglePage Props:',props)
    return  (
       
  <Container>

        <Paper elevation={12} style={{padding: '30px'}}>
            <Grid container spacing={2}>
  <Grid item xs={6}>
  <h1>{cardData.title}</h1>
  <Card sx={{ 
      maxWidth: MAX_WIDTH,
       maxHeight: MAX_HEIGHT ,
        minHeight: '20%',
         minWidth: '45%',
         height: '60vh',
         width: '45vw',
         
         
         }}>

      {loading ? 
        <Skeleton sx={{height: MAX_HEIGHT}}/>
        :
      <CardMedia
        style={{
          objectFit: 'contain',
          display: 'start'
        }}       
        component="img"
        height={MAX_HEIGHT}
        image={cardData.image}
        alt={cardData.title}
      />
    }
      
      
      
    </Card>
  </Grid>
  <Grid item xs={6} style={{paddingTop: '20%'}}>
  <h3>   {cardData.description}</h3>
  </Grid>
  <Grid item xs={4}>
      {loading? <>Carregando...</>:
      <>
      <Rating style={{position: 'relative',top: '10px' , alignItems: 'end', justifyContent: 'flex-end'}} name="score" value={cardData.rating.rate || 0} disabled readOnly></Rating>
      <b>Avaliado {cardData.rating.count}x</b>
  <Grid item xs={4}>
  <b style={{ textAlign: 'match-parent',fontSize: '44px',alignContent: 'end', alignItems: 'baseline', padding: '1%',backgroundColor: '#dddbdb', marginLeft: 10, borderStyle: 'dashed'}}>{cardData.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b>  
  <Button disabled variant="contained" size="large" style={{paddingLeft: '20px'}}>Comprar</Button>
  </Grid>
      </>
      }
  </Grid>
</Grid>
        
        </Paper>
  </Container>      

    )
}
