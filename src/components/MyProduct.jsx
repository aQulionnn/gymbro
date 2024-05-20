import React from 'react'
import style from '../Style/MyProduct.module.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function MyProduct(props) {
  const addProduct = () => {
    const productObject = {
      productId: props.id,
      price: props.price,
      photo: `https://localhost:7209/api/File/${props.photo}`,
      quantity: 1
    };
    const productString = JSON.stringify(productObject);
    localStorage.setItem(`${props.name}`, productString)
  }

  return (
    <div className={style.container}>
      <div className={style['top-section']}>
        <img src={'https://localhost:7209/api/File/'+props.photo}/>
      </div>
      <div className={style['bottom-section']}>
        <h3>{props.name}</h3>
        <p>{props.price} тг<button onClick={addProduct}><AddShoppingCartIcon/></button></p>
      </div>
    </div>
  )
}

