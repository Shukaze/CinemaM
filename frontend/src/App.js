import React, { Component } from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router} from 'react-router-dom';
import Movies from './pages/Movies';
import NotFound from './pages/Not-Found';
import ScheduleForm from './pages/ScheduleMovies'
import LoginPage from './pages/Login/LoginPage.js';
import NavBar from "./pages/NavBar/NavBar";
import Auth from "./hoc/auth";
import './App.css';
import RegisterPage from './pages/Register/RegisterPage.js';
import AddMovieForm from './pages/AddMovie';
import ChatPage from './pages/ChatPage/ChatPage';
import UploadMoviePage from './pages/UploadPage';
import Footer from './components/Footer'; 
 
class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <NavBar/>
            <Switch> 
              <Route exact path="/movies/uploadMovie"  component={UploadMoviePage}/>
              <Route exact path="/movies/addmovie"  component={Auth(AddMovieForm, null)}/>
              <Route exact path="/movies/schedule"  component={Auth(ScheduleForm, null)}/>
              <Route exact path="/chat" component={Auth(ChatPage, null)}/>
              <Route exact path="/login" component={Auth(LoginPage, null)}/>
              <Route exact path="/register" component={Auth(RegisterPage, null)}/>
              <Route exact path="/movies" component={Auth(Movies, null)}/> 
              <Route path="/not-found" component={Auth(NotFound, null)}/> 

              <Redirect exact from='/' to='/movies'/>
              <Redirect to='not-found'/>
            </Switch> 
            <Footer/>
          </div>
        </Router>
    );
  }
};

// pages for this product
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside


export default App;
