
import axios from 'axios';
import React from 'react';
import {  Routes , Route } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Favorites from './Pages/Favorites';
import Orders from './Pages/Orders';
import Home from './Pages/Home'
import AppContext from './AppContext';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve ,ms));


function App() {
  const [items , setItems] = React.useState([]);
  const [cartOpened , setCartOpened] = React.useState(false);
  const [cartItems , setCartItems] = React.useState([]);
  const [searchValue , setSearchValue] = React.useState('');
  const [favorites , setFavorites] = React.useState([]);
  const [isLoading , setIsLoading] = React.useState(true);
  
  const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value)
  }
  const onAddToFavorites = async (obj) => {
    try {
      if  (favorites.find((favObj) => Number(favObj.id) == Number(obj.id) )) {
        axios.delete(`https://6278c4e06ac99a91065c566f.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      }else {
       const {data} = await axios.post('https://6278c4e06ac99a91065c566f.mockapi.io/favorites' , obj)
        setFavorites((prev) => [...prev , data])
      }
    } catch (error) {
        alert('error')
    }
  }

  const onAddToCart = async (obj) => {
   try {
     const findItem =  cartItems.find((item) => Number(item.parentId) == Number(obj.id));
     if (findItem) {
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
       axios.delete(`https://6278c4e06ac99a91065c566f.mockapi.io/cart/${findItem.id}`);
     } else {
        setCartItems((prev) => [...prev , obj])
        const {data}= await axios.post('https://6278c4e06ac99a91065c566f.mockapi.io/cart' , obj)
        setCartItems((prev) => prev.map(item => {
          if (item.parentId == data.parentId){
            return {
            ...item, 
            id: data.id
            }
          }
          return item;
        }))
     }
   } catch (error) {
     alert('error')
   }
  }

  const onReamoveItem = (id) => {
    axios.delete(`https://6278c4e06ac99a91065c566f.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) == Number(id))
  }

    React.useEffect(() => {
      async function fetchData () {
        const cartResponse = await axios.get('https://6278c4e06ac99a91065c566f.mockapi.io/cart');
        await delay(1500)
        const favoritesResponse = await axios.get('https://6278c4e06ac99a91065c566f.mockapi.io/favorites');
        await delay(1000)
        const itemsResponse = await axios.get('https://6278c4e06ac99a91065c566f.mockapi.io/items');

        setIsLoading(false)
         setCartItems(cartResponse.data)
         setFavorites(favoritesResponse.data)
         setItems(itemsResponse.data)
        }
          fetchData() 
         
        }, []);
    
        

  return (
  <AppContext.Provider value={
    {items , 
    cartItems , 
    setCartItems, 
    favorites, 
    isItemAdded, 
    setCartOpened,
    isLoading,
    }}>

    <div className='wrapper'>
        <div className={cartOpened ? 'drawer-visible' : 'drawer-hiden'}>
        {cartOpened && <Drawer onReamove={onReamoveItem} items={cartItems} onClose={() => setCartOpened(false)} />}
        </div>
        <Header onClickCart={() => setCartOpened(true)} />
       
       <Routes>
         <Route path='/' element={
         <Home
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            setSearchValue={setSearchValue}
            items={items}
            onAddToFavorites={onAddToFavorites}
            onAddToCart={onAddToCart}
            cartItems={cartItems}
            isLoading={isLoading}
         />}/>
         <Route path='/favorites' element={<Favorites 
          onAddToFavorites={onAddToFavorites}
         />}/>
         <Route path='orders' element={<Orders/>}/>
       </Routes>

    </div>
  </AppContext.Provider>
  )
}

export default App;
