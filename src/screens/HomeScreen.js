import './HomeScreen.css'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// Components
import Product from '../components/Product'

//Actions
import {getProducts as listProducts} from '../redux/actions/productActions'
import {setUserDeatils} from '../redux/actions/userAction'

import debounce from "lodash/debounce";

const HomeScreen = () => {
  const dispatch = useDispatch()

  const getProducts = useSelector(state => state.getProducts)
  const {products, loading, error} = getProducts

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText !== '' && searchText.length > 3) {
      dispatch(debounce(listProducts(searchText), 3000))
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, searchText])

  useEffect(() => {
    dispatch(setUserDeatils())
  }, [dispatch])

  return (
    <div className="homescreen">
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '1.2rem'}}>
        <h2 className="homescreen__title">Latest Products</h2>
        <div style={{maxWidth: '50%'}} className="input-wrapper">
          <input
            id="search"
            name="search"
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map(product => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default HomeScreen
