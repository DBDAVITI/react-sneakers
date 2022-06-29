import React from "react";
import Info from "../Info";
import AppContext from "../../AppContext";
import axios from "axios";
import styles from './Drawer.module.scss'


function Drawer ( { onClose, onReamove, items = [] } ) {
 const { cartItems, setCartItems } = React.useContext(AppContext);
 const [isOrderCompleted , setIsOrderCompleted] = React.useState(false);
 const [orderId , setOrdeId] = React.useState(null);
 const [isLoading , setIsLoading] = React.useState(false);
 
 const totalPrice = cartItems.reduce((sum , obj) => obj.price + sum , 0)

 const onClickOrder = async () => {
  try {
    setIsLoading(true);
    const {data} = await axios.post('https://6278c4e06ac99a91065c566f.mockapi.io/orders' , {items : cartItems});
    setOrdeId(data.id);
    setIsOrderCompleted(true);
    setCartItems([]);

   
    
  } catch (error) {
    alert('error ')
  }
  setIsLoading(false)
 };
 return (
        <div className={styles.overlay}>
        <div className={styles.drawer}>
            <div className="d-flex justify-between">
            <h2 >Корзина</h2>
            <img onClick={onClose} className="cart-close cu-p" src="/img/remove.svg" alt="#" />
            </div>
             {items.length > 0 ? <>
              <div className={styles.item}>
                  {
                    items.map((obj) => (
                      
                      <div key={obj.id} className="cartItem d-flex align-center">
                      <img className="mr-10" width={70} height={70} src={obj.imageUrl} alt="#"/>
                      <div>
                        <p>{obj.title} </p>
                        <b>{obj.price} USD</b>
                      </div>
                      <div>
                        <img onClick={() => onReamove(obj.id)}  className="removeBtn " src="/img/remove.svg" alt="#"/>
                      </div>
                  </div>
                    ))
                  }
              </div> 
               <div>
               <ul className='cartTotalBlock' >
                 <li >
                   <span>Итого: </span>
                   <div></div>
                   <b>{totalPrice} USD.</b>
                 </li>
 
                 <li >
                   <span> Налог 5%:  </span>
                   <div></div>
                   <b> {totalPrice * 5 / 100} USD. </b>
                 </li>
               </ul>
               <button disabled={isLoading} onClick={() => onClickOrder()} >Оформить заказ <img src='/img/arrow.svg' alt='#'/> </button>
             </div>
          </>
              :
              <Info
                  image={isOrderCompleted ? '/img/completed.png' : '/img/box.png'}
                  title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
                  description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                  onClose={onClose}
              />
              }
           
        </div>
      </div>
    )
}
export default Drawer;