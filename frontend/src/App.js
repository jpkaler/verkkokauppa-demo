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
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';

function App() {

  const [state, setState] = useState({
    products:[],
    loading:false,
    error:"",
    cart:[],
    categories:[],
    currentCategory:"",
    user:"",
    userOrders:[],
    isLogged: false,
    isAdmin: false,
    orderMessage: ""
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

  const setOrderMessage = (message) => {
    setState((state) => {
      return {
        ...state,
        orderMessage: message
      }
    })
  }

  const setHomePageState = () => {
    setState((state) => {
      return {
        ...state,
        products: [],
        currentCategory: "",
        error: "",
        orderMessage: ""
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
            console.log(loginData);
            setState((state) => {
              return {
                ...state,
                isLogged: true,
                user: loginData.username,
                isAdmin: loginData.admin
              }
            })
            getOrders();
            return;
          case "logout":
            setState((state) => {
              return {
                ...state,
                isLogged: false,
                user: "",
                isAdmin: false,
                userOrders:[]
              }
            })
            console.log("Logout successful!");
            return;
          case "addorder":
            let success = await response.json();
            console.log(success.message);
            return;
          case "getorders":
            let orders = await response.json();
            setState((state) => {
              return {
                ...state,
                userOrders: orders
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
                error:"Kyseisell?? haulla ei l??ytynyt yht????n tuotetta"
              }
            })
            console.log(`Server responded with a status ${response.status}: ${response.statusText}`);
            return;
          case "register":
            console.log("Register failed");
            let errorData = await response.json();
            console.log(errorData);
            setState((state) => {
              return {
                ...state,
                error: errorData
              }
            })
            return;
          case "login":
            console.log("Login failed");
            let loginError = await response.json();
            console.log(loginError);
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
      url:"/api/users/register",
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
      url:"/api/users/login",
      request:{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user)
      },
      action: "login"
    })
  }

  const logout = () => {
    setUrlRequest({
      url:"/api/users/logout",
      request:{
        method:"POST",
        headers:{"Content-Type":"application/json"}
      },
      action: "logout"
    })
  }

  const getOrders = () => {
    setUrlRequest({
      url: "/api/orders",
      request:{
        method:"GET",
        headers:{"Content-Type":"application/json"}
      },
      action: "getorders"
    })
  }

  const addOrder = (order) => {
    setUrlRequest({
      url: "/api/orders",
      request:{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(order)
      },
      action: "addorder"
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
  
  //Render??i tuotteet vasta kun data on haettu
  let tempRender = <></>
  if (state.loading) {
    tempRender = <></>
  } else {
    tempRender = <Routes>
                    <Route exact path="/" element={<HomePage products={state.products} error={state.error} categories={state.categories} setCurrentCategory={setCurrentCategory} setHomePageState={setHomePageState}/>}/>
                    <Route path="/search" element = {<SearchPage products={state.products} categories={state.categories} setCurrentCategory={setCurrentCategory} setCart={setCart} cart={state.cart}/>} />
                    <Route path="/cart" element={<ShoppingCart cart={state.cart} setCart={setCart} addOrder={addOrder} orderMessage={state.orderMessage} setOrderMessage={setOrderMessage}/>}/>
                    <Route path="/register" element={<RegisterPage register={register} error={state.error}/>}/>
                    <Route path="/admin" element={<AdminPage isAdmin={state.isAdmin} products={state.products} addProduct={addProduct} removeProduct={removeProduct} editProduct={editProduct} />}/>
                    <Route path="/profile" element={<ProfilePage user={state.user}  getOrders={getOrders} userOrders={state.userOrders} />}/>
                    <Route path="/:category" element={<CategoryPage categories={state.categories} products={state.products} setCurrentCategory={setCurrentCategory} setCart={setCart} cart={state.cart}/>}/>
                    <Route path="/:category/:productId" element={<ProductPage products={state.products} cart={state.cart} setCart={setCart} currentCategory={state.currentCategory}/>}/>
                  </Routes>
  }

  return (
    <div>
      <Navbar searchProducts={searchProducts} login={login} logout={logout} isLogged={state.isLogged} isAdmin={state.isAdmin} user={state.user} error={state.error} />
      {tempRender}
      <Footer/>
    </div>
  );
}

export default App;
