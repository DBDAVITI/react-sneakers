import React from "react";
import axios from "axios";

import Card from "../components/Card";

const delay = (ms) => new Promise((resolve)=> setTimeout(resolve, ms))

function Orders () {
    const [orders , setOrders] = React.useState([]);
    const [isLoading , setIsLoading] = React.useState(true);
    React.useEffect(() => {
      try {
        async function ordersData () {
            await delay(3760)
            const {data} = await axios.get('https://6278c4e06ac99a91065c566f.mockapi.io/orders');
            setOrders(data.reduce((prev , obj) => [...prev , ...obj.items], []));
            await setIsLoading(false)
        }
        ordersData()
      } catch (error) {
          console.log('error(orders)')
      }
    }, [])

    return (
        <div className='content p-40' >
            
        <div className='searcher'>
            <h1>Мой заказы</h1>
        </div>

      <div className="parent">
      <div className='homeItems'>
            {(isLoading ? [...Array(4)] : orders).map((item , index) => (
                <Card
                key={index}
                loading={isLoading}
                {...item}
                />
            ))}
        </div>
      </div>
    </div>
    );
};

export default Orders;