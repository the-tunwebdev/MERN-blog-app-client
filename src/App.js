import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import AddBlog from "./Blog/Add Blog/AddBlog";
import FavBlog from "./Blog/Myblog/FavBlog";
import StrangerUserBlog from "./Blog/StrangerUserBlog/StrangerUserBlog";
import Confirmation from "./confirmation/confirmation";
import HomePage from './Home/HomePage';
import Nav from './NavBar/Nav'
import Login from './user/login/login';
import Register from './user/register/register';
import * as Cookies from "js-cookie";
import UserBlog from "./Blog/UserBlog/UserBlog";
import EditBlog from "./Blog/UserBlog/EditBlog";
import PageNotFound from "./PageNotFound/PageNotFound"
function App() {
  return (
   
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/confirmation/:id" component={Confirmation} />
          <Route path="/" exact component={HomePage} />
          {
            Cookies.get('token') ? 
            <div>
              <Route path = '/addblog' component={AddBlog} />
              <Route path = '/blog/:id' component={StrangerUserBlog} />
              <Route path = '/edit/:id' component={EditBlog} />

              <Route path = '/favblog' component={FavBlog} />

              <Route path = '/me' component={UserBlog} />
              </div>

            : <PageNotFound />
          }
          



          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
