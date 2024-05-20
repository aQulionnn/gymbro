import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom'
import MyHeader from '../components/MyHeader';
import style from '../Style/CartPage.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CartPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getAllItemsFromLocalStorage = () => {
      const items = [];
      let sum = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const parsedValue = JSON.parse(value); // Parse the string value into an object
        sum += parsedValue.price * parsedValue.quantity;
        items.push({
          key: key,
          productId: parsedValue.productId,
          price: parsedValue.price,
          photo: parsedValue.photo,
          quantity: parsedValue.quantity || 1 // Initialize quantity to 1 if not present
        });
      }
      setTotalPrice(sum);
      setAllItems(items);
    };

    getAllItemsFromLocalStorage();
  }, []);

  const updateLocalStorage = (items) => {
    items.forEach(item => {
      const productObject = {
        price: item.price,
        photo: item.photo,
        quantity: item.quantity
      };
      const productString = JSON.stringify(productObject);
      localStorage.setItem(item.key, productString);
    });
  };

  const incrementQuantity = (index) => {
    const updatedItems = [...allItems];
    updatedItems[index].quantity++;
    setAllItems(updatedItems);
    calculateTotalPrice(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const decrementQuantity = (index) => {
    const updatedItems = [...allItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity--;
      setAllItems(updatedItems);
      calculateTotalPrice(updatedItems);
      updateLocalStorage(updatedItems);
    }
  };

  const calculateTotalPrice = (items) => {
    let sum = 0;
    items.forEach(item => {
      sum += item.price * item.quantity;
    });
    setTotalPrice(sum);
  };

  return (
    <div>
      <MyHeader />
      <div className={style['main']}>
        {allItems.map((item, index) => (
          <div key={item.key} className={[style['container']]}>
            <div className={style['left-section']}>
              <img style={{ width: '100px', height: '100px' }} src={item.photo} alt="Product" />
            </div>
            <div className={style['right-section']}>
                <h4>{item.key}</h4>
                <span className={style['unit-price']}>{item.price} Т</span>
                <button className={style['increase']} onClick={() => incrementQuantity(index)}><AddIcon/></button>
                <span className={style['quantity-price']}>{item.quantity}</span>
                <button className={style['decrease']} onClick={() => decrementQuantity(index)}><RemoveIcon/></button>  
                {item.price*item.quantity}
            </div>
          </div>
        ))}
        <p>Total Price: {totalPrice}</p>
        <button onClick={ ()=> {(navigate("/order"))}}>Купить</button>
      </div>
    </div>
  );
}

export default CartPage;
