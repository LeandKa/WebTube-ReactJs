import React, { Component } from 'react'
import {Grid} from '@material-ui/core';
import {Link} from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import ReactPlayer from 'react-player'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DetailsIcon from '@material-ui/icons/Details';


const video = {
   marginTop:'50px'
}

const button = {
  float:'right',
  marginTop:'10px',
  marginLeft:'10px'
}



export default class Home extends Component {
      constructor(props){
        super(props);
            this.state={
                videos:[]
            }
    }
   
 
    componentDidMount(){
      axios.get('http://localhost:3000/videosAll')
      .then(result =>{
        this.setState({videos:result.data.videos,isLoading:true});
      })
      .catch(err =>{
        console.log('Nop')
      });
    }
    render() {

          const {videos} = this.state
          const {isSearch,search} = this.props;

          if(isSearch){
              return(
                <div>
                <React.Fragment>
                   <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                       <Grid item xs={12}>
                       <h1>Video Here</h1>
                       </Grid>
                       <Grid item xs={12}>
                       <ListGroup>
                       {search.map(videos => (
                          <ListGroupItem key={videos.id} style={video}>
                              <h3>{videos.title}</h3>
                              <ReactPlayer url={videos.videoUrl} />
                              <Link to={`/Video-Detail/${videos.id}`} style={button} className="btn btn-light"><DetailsIcon></DetailsIcon></Link>
                              <Link to={`/Comment/${videos.id}`} style={button} className="btn btn-light"><ChatBubbleIcon></ChatBubbleIcon></Link>
                          </ListGroupItem>))}
                       </ListGroup>
                       </Grid>
                    </Grid>                  
                </React.Fragment>
            </div>
              )
          }else{
            return (
                <div>
                    <React.Fragment>
                       <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                           <Grid item xs={12}>
                           <h1>Video Here</h1>
                           </Grid>
                           <Grid item xs={12}>
                           <ListGroup>
                           {videos.map(videos => (
                              <ListGroupItem key={videos.id} style={video}>
                                  <h3>{videos.title}</h3>
                                  <ReactPlayer url={videos.videoUrl} />
                                  <Link to={`/Video-Detail/${videos.id}`} style={button} className="btn btn-light"><DetailsIcon></DetailsIcon></Link>
                                  <Link to={`/Comment/${videos.id}`} style={button} className="btn btn-light"><ChatBubbleIcon></ChatBubbleIcon></Link>
                              </ListGroupItem>))}
                           </ListGroup>
                           </Grid>
                        </Grid>                  
                    </React.Fragment>
                </div>
            )
          }
    }
}
