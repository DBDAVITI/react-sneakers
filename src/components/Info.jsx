import React from 'react'
import AppContext from '../AppContext';

function Info({image, title , description, onClose}) {
  const { setCartOpened} = React.useContext(AppContext)
  return (
    <div>
         <div className="info">
                <img width={120} height={120} src={image} alt="box-img"/>
                <p>{title}</p>
                <span>{description}</span>
                <button onClick={() => setCartOpened(false)}> <img src="/img/b-arrow.svg" alt="b-arrow"/> Вернуться назад</button>
              </div>
    </div>
  )
}
export default Info;