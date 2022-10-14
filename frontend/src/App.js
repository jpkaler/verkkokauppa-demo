import './App.css';
import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

function App() {

  const [state, setState] = useState({
    products:[],
    search:"",
    loading:false
  })

  const [urlRequest, setUrlRequest] = useState({
    url:"/api/verkkokauppa",
    request:{
      method:"GET",
      headers:{"Content-Type":"application/json"}
    },
    action:"getdata"
  })

  // Muokkaa search-statea 
  const setSearch = (search) => {
    setState((state) => {
      return {
        ...state,
        search: search
      }
    })
  }


  // UseEffect -> hakee datan url-actionin perusteella
  useEffect(() => {

    const fetchData = async () => {

      if(!urlRequest.url) {
        return;
      }
      
      let response = await fetch(urlRequest.url, urlRequest.request);
      console.log("data haettu")
      
      if (response.ok) {
        switch(urlRequest.action) {
          case "getdata":
            let data = await response.json();
            console.log("response json")
            if (data) {
              setState((state) => {
                return {
                  ...state,
                  loading:false,
                  products:data
                }
              });
            }
            return;
          default:
            return;
        }
      } else {
        switch(urlRequest.action) {
          case "getdata":
            console.log(`Server responded with a status ${response.status}`);
            return;
          default:
            return;
        }
      }
    }

    fetchData();

  }, [urlRequest]);

  // Funktio, joka muokkaa urlRequestia -> ei tarvita vielä
  const getData = () => {
		setUrlRequest({
			url:"/api/verkkokauppa",
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			},
			action:"getdata"
		})
	}

  // Funktio, joka filtteröi tuotteet haun mukaan
  const filteredProducts = () => {
    let tempProducts = state.products.filter((product) => {
      return product.name.includes(state.search)
    });
    return tempProducts;
  }

  //Renderöi tuotteet vasta kun data on haettu
  let productSpace = <></>
  if (state.loading) {
    productSpace = <h3>Tuotteita ladataan...</h3>
  } else {
    productSpace = <ProductList products={state.products} filteredProducts={filteredProducts}/>
  }

  return (
    <div>
      <h1>Verkkokauppa</h1>
      <SearchBar setSearch={setSearch} />
      {productSpace}
      
    </div>
  );
}

export default App;
