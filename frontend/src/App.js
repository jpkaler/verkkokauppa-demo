import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Navbar from './components/Navbar';
import ProductPage from './components/ProductPage';

function App() {

  const [state, setState] = useState({
    search:"",
    products:[],
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

  const setSearch = (search) => {
    setState((state) => {
        return {
            ...state,
            search:search
        }      
    });
  }

  //Renderöi tuotteet vasta kun data on haettu
  let tempRender = <></>
  if (state.loading) {
    tempRender = <h3>Tuotteita ladataan...</h3>
  } else {
    tempRender = <Routes>
                    <Route exact path="/" element={<SearchPage products={state.products} search={state.search}/>}/>
                    <Route path="/:productId" element={<ProductPage products={state.products}/>}/>
                  </Routes>
  }

  return (
    <div>
      <Navbar setSearch={setSearch}/>
      {tempRender}
    </div>
  );
}

export default App;
