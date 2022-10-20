import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import ProductPage from './components/ProductPage';

function App() {

  const [state, setState] = useState({
    products:[],
    loading:false,
    error:""
  })

  const [urlRequest, setUrlRequest] = useState({
    url:"",
    request:{},
    action:""
  })

  // UseEffect -> hakee datan url-actionin perusteella
  useEffect(() => {

    const fetchData = async () => {

      if(!urlRequest.url) {
        return;
      }
      setState((state) => {
        return {
          ...state,
          loading:true
        }     
      })
      let response = await fetch(urlRequest.url, urlRequest.request);
      console.log("data haettu")
      
      if (response.ok) {
        switch(urlRequest.action) {
          case "getdata":
            let data = await response.json();
            if (data) {
              setState({
                error:"",
                loading:false,
                products:data
              });
            }
            return;
          default:
            return;
        }
      } else {
        switch(urlRequest.action) {
          case "getdata":
            setState((state) => {
              return {
                products:[],
                loading: false,
                error:"Kyseisellä haulla ei löytynyt yhtään tuotetta"
              }
            })
            console.log(`Server responded with a status ${response.status}: ${response.statusText}`);
            return;
          default:
            return;
        }
      }
    }

    fetchData();

  }, [urlRequest]);


  
  // Url request actions
  const searchProducts = (search) => {
    let searchUrl = `?search=${search}`
    setUrlRequest({
      url:`/api/verkkokauppa/${searchUrl}`,
      request:{
        method:"GET",
        headers:{"Content-Type":"application/json"}
      },
      action:"getdata"
    })
  }
  
  //Renderöi tuotteet vasta kun data on haettu
  let tempRender = <></>
  if (state.loading) {
    tempRender = <h3>Tuotteita ladataan...</h3>
  } else {
    tempRender = <Routes>
                    <Route exact path="/" element={<ProductList products={state.products} error={state.error}/>}/>
                    <Route path="/:productId" element={<ProductPage products={state.products}/>}/>
                  </Routes>
  }

  return (
    <div>
      <Navbar searchProducts={searchProducts}/>
      {tempRender}
    </div>
  );
}

export default App;
