import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import AppContext from '../../AppContext';

const Card = ( {
  id, 
  title , 
  price , 
  imageUrl , 
  onCartAdd , 
  onFavorites , 
  favorited = false , 
  loading = false} 
  
  ) => {
  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite , setIsFavorite] = React.useState(favorited);
  const obj = {title , price , imageUrl , id , parentId: id};
  const onPlusClick = () => {
    onCartAdd(obj);
  }
  const onClickFavorite = () => {
    onFavorites(obj)
    setIsFavorite(!isFavorite);
  }

    return (
        <div className={styles.card}>
         {loading ?  <ContentLoader 
    speed={2}
    width={165}
    height={223}
    viewBox="0 0 165 223"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="165" height="130" /> 
    <rect x="0" y="146" rx="5" ry="5" width="165" height="15" /> 
    <rect x="0" y="165" rx="5" ry="5" width="108" height="15" /> 
    <rect x="0" y="202" rx="5" ry="5" width="108" height="18" /> 
    <rect x="133" y="190" rx="7" ry="7" width="32" height="32" />
  </ContentLoader>
   : <>
   <div className={styles.favorite} >
     {onFavorites && <img onClick={onClickFavorite} src={isFavorite ? '/img/heart-liked.svg' : '/img/favorites.svg'} alt="#" /> }
        </div>
          <img width='90%' height={112} src={imageUrl} alt='#'/>
          
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
              <div className='d-flex flex-column'>
                <span>Цена:</span>
                <b>{price} USD</b>
              </div>
                  
               {onCartAdd && <img width={32} height={32} className='btnPlus' onClick={onPlusClick} src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/plus.svg'} alt='#'/>}
                  
              </div>
            </>}
            
    </div>
    )
}
export default Card;