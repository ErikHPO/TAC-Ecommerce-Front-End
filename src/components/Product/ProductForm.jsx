import React from 'react';
import { useForm } from 'react-hook-form';

function ProductForm(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Produto" {...register("Produto", {required: true, maxLength: 80})} />
        <input type="number" placeholder="Preço" {...register("Preço", {required: true, min: 0, maxLength: 15})} />
        <textarea {...register("Descrição", {required: true})} />
        <select {...register}>
          <option value="Eletronico">Eletronico</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Alimento">Alimento</option>
          <option value="Informática">Informática</option>
          <option value="Eletrodoméstico">Eletrodoméstico</option>
          <option value="Outros">Outros</option>
        </select>
        <input type="text" placeholder="Image" {...register("Image", {})} />
  
        <input type="submit" />
      </form>
    );
}

export default ProductForm;