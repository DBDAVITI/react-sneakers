import Card from "../components/Card";
    function Home ( { searchValue ,
        onChangeSearchInput , 
        setSearchValue ,
        items ,
        onAddToFavorites ,
        onAddToCart,
        isLoading,z
        }) {
    const renderItems = () => {

    const filtredItems = items.filter((item)=> 
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

        return (isLoading ? [...Array(9)] : filtredItems).map((item , index )=> (
        <Card
          key={index}
          onFavorites={(obj) => onAddToFavorites(obj)}
          onCartAdd={(obj)=> onAddToCart(obj)}
          loading={isLoading}
          {...item}
/> ));
}
      return (
      <div className='content p-40' >

        <div className='searcher'>

        <h1>{searchValue ? `Поиск по... "${searchValue}"` : "Все кроссовки" }</h1>
        <div className='search-block'>

          <img src='/img/search.svg' alt='#'/>
          <input onChange={onChangeSearchInput} placeholder='Поиск...' value={searchValue} />
          {searchValue && <img width={30} height={30} className='clear' onClick={()=> setSearchValue('')} src='/img/remove.svg' alt='#'/>}
        </div>
        </div>
        <div className="parent">
        <div className='homeItems'>
          {renderItems()}
        </div>
        </div>
      </div>
      )
      }

export default Home;
