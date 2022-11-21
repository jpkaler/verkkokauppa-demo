import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductPage from './components/ProductPage';
import AdminPage from './components/AdminPage';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import { CButton } from '@coreui/react';

function App() {

  const [state, setState] = useState({
    products:[],
    loading:false,
    error:"",
    cart:[],
    categories:[],
    currentCategory:"",
    user:"",
    isLogged: false,
    isAdmin: false
  })

  const [urlRequest, setUrlRequest] = useState({
    url:"",
    request:{},
    action:""
  })

  const setLoading = (loading) => {
    setState((state) => {
      return {
        ...state,
        loading:loading,
        error:""
      }
    })
  }

  const setCart = (cart) => {
    setState((state) => {
      return {
        ...state,
        cart:cart
      }
    }) 
  }
  
  const setCurrentCategory = (category) => {
    setState((state) => {
      return {
        ...state,
        currentCategory: category
      }
    })
  }

  const setHomePageState = () => {
    setState((state) => {
      return {
        ...state,
        products:[],
        currentCategory: ""
      }
    })
  }

  // UseEffect -> hakee datan url-actionin perusteella
  useEffect(() => {
    console.log(`Urlrequest: ${urlRequest.action}`);

    const fetchData = async () => {

      if(!urlRequest.url) {
        return;
      }
      setLoading(true);
      let response = await fetch(urlRequest.url, urlRequest.request);
      setLoading(false);
      console.log("data haettu")
      
      
      if (response.ok) {
        switch(urlRequest.action) {
          case "getdata":
            let data = await response.json();
            console.log("Kaikki haettu");
            if (data) {
              setState((state) => {
                return {
                  ...state,
                  currentCategory: "",
                  products:data
                }
              });
            }
            return;
          case "getcategories":
            let categories = await response.json();
            setState((state) => {
              return {
                ...state,
                categories: categories
              }
            })
            return;
          case "getproductsbycategory":
            let products = await response.json();
            console.log("Paidat haettu");
            setState((state) => {
              return {
                ...state,
                products: products
              }
            })
            return;
          case "addproduct":
            searchProducts("");
            return;
          case "removeproduct":
            searchProducts("");
            return;
          case "editproduct":
            searchProducts("");
            return;
          case "register":
            console.log("Register successful!");
            return;
          case "login":
            let loginData = await response.json();
            setState((state) => {
              return {
                ...state,
                isLogged: true,
                user: loginData.username,
                isAdmin: loginData.admin
              }
            })
            return;
          default:
            return;
        }
      } else {
        switch(urlRequest.action) {
          case "getdata":
            setState((state) => {
              return {
                ...state,
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


  // Muokkaa product-listaa kategorian muuttuessa (kategoria-napin painamisesta)
  useEffect(() => {
    if (state.currentCategory !== "") {
      getProductsByCategory(state.currentCategory);
    }
  }, [state.currentCategory])

  useEffect(() => {
    getCategories();
  }, []);
  
  // Url request actions
  const register = (user) => {
    setUrlRequest({
      url:"/register",
      request:{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user)
      },
      action: "register"
    })
  }

  const login = (user) => {
    setUrlRequest({
      url:"/login",
      request:{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user)
      },
      action: "login"
    })
  }

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

  const getCategories = () => {
    setUrlRequest({
      url:"/api/verkkokauppa/categories",
      request:{
        method:"GET",
        headers:{"Content-Type":"application/json"}
      },
      action:"getcategories"
    })
  }

  const getProductsByCategory = (category) => {
    setUrlRequest({
      url:`/api/verkkokauppa/categories/${category}`,
      request:{
        method:"GET",
        headers:{"Content-Type":"application/json"}
      },
      action:"getproductsbycategory"
    })
  }

  const addProduct = (product) => {
    setUrlRequest({
      url:"/api/verkkokauppa/",
      request:{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(product)
      },
      action:"addproduct"
    })
  }

  const removeProduct = (productId) => {
    setUrlRequest({
      url:`/api/verkkokauppa/${productId}`,
      request:{
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
      },
      action:"removeproduct"
    })
  }

  const editProduct = (productId, product) => {
    setUrlRequest({
      url:`/api/verkkokauppa/${productId}`,
      request:{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(product)
      },
      action:"editproduct"
    })
  }
  
  //Renderöi tuotteet vasta kun data on haettu
  let tempRender = <></>
  if (state.loading) {
    tempRender = <></>
  } else {
    tempRender = <Routes>
                    <Route exact path="/" element={<HomePage products={state.products} error={state.error} categories={state.categories} setCurrentCategory={setCurrentCategory} setHomePageState={setHomePageState}/>}/>
                    <Route path="/search" element = {<SearchPage products={state.products} categories={state.categories} setCurrentCategory={setCurrentCategory} setCart={setCart} cart={state.cart}/>} />
                    <Route path="/cart" element={<ShoppingCart cart={state.cart} setCart={setCart} />}/>
                    <Route path="/admin" element={<AdminPage products={state.products} addProduct={addProduct} removeProduct={removeProduct} editProduct={editProduct}/>}/>
                    <Route path="/:category" element={<CategoryPage categories={state.categories} products={state.products} setCurrentCategory={setCurrentCategory} setCart={setCart} cart={state.cart}/>}/>
                    <Route path="/:category/:productId" element={<ProductPage products={state.products} cart={state.cart} setCart={setCart} currentCategory={state.currentCategory}/>}/>
                  </Routes>
  }

  return (
    <div>
      <Navbar searchProducts={searchProducts} login={login} isLogged={state.isLogged} user={state.user} />
      {tempRender}
      <CButton onClick={() => {register({username: "juho9999", password:"12345"})}}>Register</CButton>
      <CButton onClick={() => {login({username: "juho9999", password:"12345"})}}>Login</CButton>
      <Footer/>
    </div>
  );
}

export default App;
