import React from "react";
import Card from "../components/Card";
import AppContext from "../AppContext";

function Favorites ({  onAddToFavorites}) {
const { favorites} = React.useContext(AppContext)

    return (
        <div className='content p-40' >
            
        <div className='searcher'>
            <h1>Мой закладки</h1>
        </div>
      <div className="parent">
      <div className='homeItems'>
        {favorites.map((item )=> (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              favorited={true}
              onFavorites={onAddToFavorites}
              {...item}
         /> ))}
        </div>
      </div>
    </div>
    )
}

export default Favorites;