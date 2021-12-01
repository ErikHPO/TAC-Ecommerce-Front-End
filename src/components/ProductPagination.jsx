import { Container, Pagination , Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import api from '../utils/api';



function BuildProductList(props){
    const [productList , setProductList] = useState([]);
    const page = props.pageNumber;
    useEffect( () => {
        api.get()
        .then((response) => { 
            console.log('response>>>',response.data);
            setProductList(response.data);
            console.log('PRODUCT LIST',productList);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro: " + err);
       });

    }, [page])
    // console.log('PRODUCT LIST',productList);
    console.log(props.pageNumber,props.maxItems);
    return(
           productList.filter( product => product.id+page <= props.maxItems*props.pageNumber)
           .map( product => {
               return(
           <Box display="inline-grid" gridTemplateColumns="3" gridAutoRows='400' padding={2} justifyContent="space-around">
               <ProductCard id={product.id}/>
           </Box>
               )
            
        })
        
        
    );

}

function ProductPagination(props) {
    const [page , setPage] = useState(1);


    const pageChanged = (event, value) =>{
        setPage(value);
        // return(<BuildProductList pageNumber={page} maxItems={4}/>)
    }
    
    return (

        <Container>
        <Grid
        container
        direction="column"
        alignItems="center"
        justify="center">
            <Grid item xs={4}>

            <BuildProductList pageNumber={page} maxItems={6}/>
            <Pagination count={5} variant="outlined" shape="rounded" onChange={pageChanged} />
            </Grid>

        </Grid>
        

        </Container>
    );
}

export default ProductPagination;