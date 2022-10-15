import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';

function App() {

  const [state, setState] = useState({
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

  //Renderöi tuotteet vasta kun data on haettu
  let productSpace = <></>
  if (state.loading) {
    productSpace = <h3>Tuotteita ladataan...</h3>
  } else {
    productSpace = <SearchPage products={state.products} />
  }

  return (
    <div>
      <h1>Verkkokauppa</h1>
      <Routes>
        <Route exact path="/" element={productSpace}/>
      </Routes>
    </div>
  );
}

export default App;
