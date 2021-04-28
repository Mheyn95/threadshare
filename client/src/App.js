import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Home from "./pages/Home";
// import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Nav from "./components/Nav";
import Charity from './components/Charity';
import ProductListNav from "./components/ProductListNav";
import { Provider } from 'react-redux';
import store from './utils/store';

import SuccessfulPurchase from "./pages/SuccessfulPurchase";
import OrderHistory from "./pages/OrderHistory";

import TShirts from './pages/TShirts';
import Sweatshirts from './pages/Sweatshirts';

const client = new ApolloClient({
    request: (operation) => {
      const token = localStorage.getItem('id_token')
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    },
    uri: '/graphql',
  })
  
  function App() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Provider store ={store}>
              <Nav />
              <Charity />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/successfulPurchase" component={SuccessfulPurchase} />
                <Route exact path="/orderHistory" component={OrderHistory} />
                <Route exact path="/tShirts" component={TShirts} />
                <Route exact path="/sweatshirts" component={Sweatshirts} />
                {/* <Route exact path="/hoodies" component={Hoodies} /> */}
                {/* <Route exact path="/jackets" component={Jackets} /> */}
                {/* NEED TO FINISH <Route exact path="/products/:id" component={Detail} /> */}
              </Switch>
              <ProductListNav />
            </Provider>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
  
  export default App;
  