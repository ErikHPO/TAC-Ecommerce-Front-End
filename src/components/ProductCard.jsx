import React, { useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { Rating } from '@material-ui/core';
import { Skeleton } from '@mui/material';
import api from '../utils/api'
import { useParams } from 'react-router';



export default function ProductCard(props) {
let id = useParams();
const [loading, isLoading] = useState(true);
const [cardData , setCardData] = useState([])
useEffect ( () => {
  api.get(`${id.id}`)
  .then((response) => {setCardData(response.data); isLoading(false);})
  .catch((err) => {
    console.error("ops! ocorreu um erro: " + err);
 });
 
}, []);
console.log(cardData);
if (cardData)
 return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={ loading ? <Skeleton variant="text"/> : cardData.title}
        subheader={loading ? <Skeleton width={'40%'}/> : cardData.category}
      />
      {loading ? 
        <Skeleton sx={{height: 200}}/>
        :
      <CardMedia
        style={{
          objectFit: 'contain'
        }}
        component="img"
        height="194"
        image={cardData.image}
        alt={cardData.title}
      />
    }
      
      <CardContent>
          {loading ?
          <>
          <Skeleton height={10} style={{marginBottom: 10}}/>
          <Skeleton height={10} style={{marginBottom: 10}}/>
          </>
            :
        <Typography variant="body2" color="text.secondary">
          {cardData.description}
        </Typography>
          }
      </CardContent>
      <CardActions disableSpacing>
          {loading ?
          <>
        <IconButton disabled aria-label="adicionar no carrinho">
        <AddShoppingCartIcon/>
      </IconButton>
      <IconButton disabled aria-label="compartilhar">
          <ShareIcon />
      </IconButton>  
      <Rating style={{padding: 5,marginInline: '20%' , alignContent: 'end', alignItems: 'center', justifyContent: 'flex-end'}} name="score" value={0} disabled readOnly></Rating>            
      </>
          :
          <>
        <IconButton aria-label="adicionar no carrinho">
          <AddShoppingCartIcon/>
        </IconButton>
        <IconButton aria-label="compartilhar">
            <ShareIcon />
        </IconButton>
        <b style={{padding: '1%',backgroundColor: '#dddbdb', marginLeft: 10, borderStyle: 'dashed'}}>{cardData.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b>
        <Rating style={{padding: 5,marginInline: '10%' , alignContent: 'end', alignItems: 'center', justifyContent: 'flex-end'}} name="score" value={cardData.rating.rate} disabled readOnly></Rating>
        </>
          }
          
          </CardActions>
      
    </Card>
  );
  else return("Card Data Error");
}
