import React, { useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { Rating } from '@material-ui/core';
import { Button, Skeleton } from '@mui/material';
import api from '../../utils/api'
import { useParams } from 'react-router';
import Stack from '@mui/material/Stack';
import './ProductCard.css';
import { Link } from 'react-router-dom'
import MoreIcon from '@mui/icons-material/More';
import AddtoCart from './CartButtonAdd'


export default function ProductCard(props) {
let id = useParams();
const [loading, isLoading] = useState(true);
const [cardData , setCardData] = useState([])
const MAX_WIDTH = 345;
const MAX_HEIGHT = 500;
// console.log("PRODUCTCARD PROPS>",props);
useEffect ( () => {
  isLoading(true);
  api.get(`${props.id}`)
  .then((response) => {setCardData(response.data); isLoading(false);})
  .catch((err) => {
    console.error("ops! ocorreu um erro: " + err);
 });
 
}, [props.id, id.id]);
// console.log(cardData);
if (cardData)
 return (
    <Card sx={{ 
      maxWidth: MAX_WIDTH,
       maxHeight: MAX_HEIGHT ,
        minHeight: '20%',
         minWidth: '45%',
        height: MAX_HEIGHT,
        width: MAX_WIDTH
         
         }}>
      <CardHeader
        title={ loading ? <Skeleton variant="text"/> : <Typography noWrap gutterBottom variant="h6">{cardData.title}</Typography> }
        subheader={loading ? <Skeleton width={'40%'}/> : cardData.category}
      />
      {loading ? 
        <Skeleton sx={{height: MAX_HEIGHT/2}}/>
        :
      <CardMedia
        style={{
          objectFit: 'contain',
          display: 'start'
        }}       
        component="img"
        height={MAX_HEIGHT/2}
        image={cardData.image}
        alt={cardData.title}
      />
    }
      
      <CardActions disableSpacing style={{justifyContent: 'space-between',marginTop: 'auto', display: 'inline', flexDirection: 'column'}}>
          {loading ?
          <>
        <IconButton disabled aria-label="adicionar no carrinho">
        <AddShoppingCartIcon/>
      </IconButton>
      <IconButton disabled aria-label="compartilhar">
          <ShareIcon />
      </IconButton>  
      <Rating style={{padding: '5px',marginInline: '10%' , alignContent: 'end', alignItems: 'center', justifyContent: 'flex-end'}} name="score" value={0} disabled readOnly></Rating>            
      </>
          :
          <>
        <AddtoCart {...props}/>
        <Stack>
        <Button startIcon={<MoreIcon></MoreIcon>} style={{marginTop: '5px'}} color="secondary" variant="outlined"><Link to={`product/${props.id}`}>Ver mais</Link>
</Button>
        </Stack>

        <IconButton aria-label="compartilhar">
            <ShareIcon />
        </IconButton>
        
        <Rating style={{position: 'relative',top: '10px',marginInline: '5%' , alignItems: 'end', justifyContent: 'flex-end'}} name="score" value={cardData.rating.rate} disabled readOnly></Rating>
        <b style={{ textAlign: 'match-parent',fontSize: '24px',alignContent: 'end', alignItems: 'baseline', padding: '1%',backgroundColor: '#dddbdb', marginLeft: 10, borderStyle: 'dashed'}}>{cardData.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b>  
        </>
          }
        
          </CardActions>
      
    </Card>
  );
  else return("Card Data Error");
}
