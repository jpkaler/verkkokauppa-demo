import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';

function App() {

  /* const [state, setState] = useState({
    products:[]
  }) */

  const [state, setState] = useState({
    products:[]
  })

  const [urlRequest, setUrlRequest] = useState({
    url:"",
    request:{},
    action:""
  })

  useEffect(() => {

    const fetchData = async () => {

      if(!urlRequest.url) {
        return;
      }
      let response = await fetch(urlRequest.url, urlRequest.request);
      
      if (response.ok) {
        switch(urlRequest.action) {
          case "getproducts":
            let data = await response.json();
            if (data) {
              setState({products: data});
            }
            return;
          default:
            return;
        }
      } else {
        switch(urlRequest.action) {
          case "getproducts":
            console.log(`Server responded with a status ${response.status}`);
          default:
            return;
        }
      }
    }

    fetchData();

  }, [urlRequest]);

  // Funktio, joka muokkaa urlRequestia 
  const getProducts = () => {
		setUrlRequest({
			url:"/api/verkkokauppa",
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			},
			action:"getproducts"
		})
	}

  console.log(state.products);

  return (
    <div>
      <h1>Verkkokauppa</h1>
      <Routes>
        <Route exact path="/" element={<ProductList products={state.products} />}/>
      </Routes>
    </div>
  );
}

export default App;
