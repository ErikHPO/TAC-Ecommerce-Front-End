import React, { useState } from 'react';
import { Button, Paper } from "@material-ui/core";
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import { useParams } from 'react-router-dom';
import { DataArray } from '@mui/icons-material';


function ProductForm(props) {
    const [ productData , setProductData] = useState(false)
    const {id} = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
      id ? 
      api.put(`/${props.id}`, {
      
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,

      })
      .then( (res) => console.log("PUT>",res))
      .catch( (erro) => console.log("Put error",erro))
      :
      api.post('', {
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,

      })
      .then( (res) => console.log(res))
      .catch((err) => console.log(err))

    };


    console.log(errors);
    console.log('idzao',id)
    return (
      <Container>
        <Paper>

      <form className="mui-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Produto" {...register("title", {required: true, maxLength: 80})} />
        <input type="number" placeholder="Preço" {...register("price", {required: true, min: 0, maxLength: 15})} />
        <textarea {...register("description", {required: true})} />
        <select {...register}>
          <option value="Eletronico">Eletronico</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Alimento">Alimento</option>
          <option value="Informática">Informática</option>
          <option value="Eletrodoméstico">Eletrodoméstico</option>
          <option value="Outros">Outros</option>
        </select>
        <input type="text" placeholder="Image" {...register("image", {})} />
       
        <input type="submit" />
      </form>
        </Paper>
      </Container>
    );
}

export default ProductForm;