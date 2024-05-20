import {useState, useEffect} from 'react'
import style from '../Style/OrderPage.module.css'
import { addOrder } from '../request';
import { useNavigate } from 'react-router-dom';

function OrderPage() {
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const [order, setOrder] = useState({
    name: "",
    secondName: "",
    number: "",
    address: '',
    city: '',
    orderDetails: []
  })
  
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
          unitPrice: parsedValue.price,
          quantity: parsedValue.quantity || 1 // Initialize quantity to 1 if not present
        });
      }
      setTotalPrice(sum);
      setAllItems(items);
    };

    getAllItemsFromLocalStorage();
  }, []);

  const handleBuy = async () => {
    const newOrder = {
      ...order,
      orderDetails: allItems.map(item => {
        const { key, ...rest } = item; 
        return rest;
      })
    };
    
    await addOrder(newOrder)
      alert('fdgdf')
      navigate('/')
      localStorage.clear()
  }

  return (
    <div>
    <form className={style['container']}>
      <input type='text' onChange={(e) => setOrder({ ...order, name: e.target.value })}/>
      <input type='text' onChange={(e) => setOrder({ ...order, secondName: e.target.value })}/>
      <input type="text" onChange={(e) => setOrder({ ...order, number: e.target.value })}/>
      <input type='text' onChange={(e) => setOrder({ ...order, address: e.target.value })} />
      <input type='text' onChange={(e) => setOrder({ ...order, city: e.target.value })}/>
      <div>
        {allItems.map((item, index) => (
          <div key={item.key} style={{ display: 'flex', border: '1px solid black' }}>
            <strong>{item.key}:</strong> {item.price} тг
            <br />
            <div>
              Quantity: {item.quantity}
            </div>

          </div>
        ))}
      </div>
      
    </form> 
      <p>Total Price: {totalPrice}</p>
      <button onClick={handleBuy}>Buy</button> 
    </div>
  )
}

export default OrderPage