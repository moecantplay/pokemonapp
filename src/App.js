import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import List from "./pages/List/List";
import Detail from "./pages/Detail/Detail";
import MyFavorites from "./pages/MyFavorites/MyFavorites";
import Header from "./components/Header/Header";
import ToastWrapper from "./components/Toast/ToastWrapper";
import "./scss/global.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <ToastWrapper />
        {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop pauseOnHover closeOnClick /> */}
        <Header />
        <Switch>
          <Route path="/" exact component={props => <List {...props} />} />
          <Route path="/detail/:name" exact component={props => <Detail {...props} />} />
          <Route path="/favorites" exact component={props => <MyFavorites {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
