import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import MenuNavBar from '../src/Components/NavBar/MenuAppBar';
import MyProfile from './Components/User/MyProfile';
import Login from './Components/User/Login';
import Upload from './Components/Video/Upload';
import SignIn from './Components/User/SignIn';
import Comment from './Components/Comments/Comment';
import VideoDetail from './Components/Video/VideoDetail';
import Home from '../src/Components/Video/Home';
import PrivateRouter from './auth';

export default class App extends Component {

  constructor(props){
    super(props);
        this.state={
            search:'',
            videos:[],
            isSearch:false,
            isLogging:false,
            userId:0
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
}

onChange (event) {
  this.setState({search:event.target.value});
}

componentDidMount(){
  const localToken = localStorage.getItem('token')
  const localId = localStorage.getItem('id');
  if(localToken === null){
     console.log('Nop')
  }else{
    this.setState({
     isLogging:true,
     userId:localId
    })
  }
}

onSubmit(event){
  event.preventDefault();
  axios.get(`http://localhost:3000/videos/result/search:${this.state.search}`)
  .then(result =>{
    this.setState({videos:result.data.videos})
    this.setState({isSearch:true})
  }).catch(err =>{
     console.log('Lognot')
  })
}


render(){
  return (
    <div className="App">
     <React.Fragment>
       <Router>
       <MenuNavBar onChange={this.onChange} onSubmit={this.onSubmit} isLogging={this.state.isLogging} ></MenuNavBar>
         <Switch>
           <Route path="/" render={(props)=> <Home {...props} search={this.state.videos} isSearch={this.state.isSearch}/>} exact></Route>
           <PrivateRouter path="/Upload" component={Upload} exact></PrivateRouter>
           <Route path="/My-Profile" component={MyProfile} exact></Route>
           <Route path="/Login" component={Login} exact></Route>
           <Route path="/Video-Detail/:videoId" exact component={VideoDetail}></Route>
           <Route path="/Search/:search" exact></Route>
           <PrivateRouter path="/Upload/:videoId" component={Upload}></PrivateRouter>
           <Route path="/Comment/:videoId" render={(props)=> <Comment {...props} userId={this.state.userId}></Comment>} exact></Route>
           <Route path="/SignIn" component={SignIn} exact></Route>
         </Switch>
       </Router>
     </React.Fragment>
    </div>
  );
}
  
}

