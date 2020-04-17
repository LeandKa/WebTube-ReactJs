import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DetailsIcon from '@material-ui/icons/Details';
import {Link} from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';


const button = {
    float:'right',
    marginTop:'10px',
    marginLeft:'10px'
  }


export default class VideoDetail extends Component {

    constructor(props){
        super(props);
            this.state={
                video:{}
            }
    }


    componentDidMount(){
        const video = this.props.match.params.videoId
        axios.get(`http://localhost:3000/video/${video}`)
        .then(result =>{
             this.setState({video:result.data.video})
        }).catch(err =>{

        });
    }

    render() {

        const{video} = this.state;

        return (
            <div>
                 <React.Fragment>
              <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
        <h1> {video.title}</h1>
        </Grid>
        <Grid item xs={12}>
        <p>{video.description}</p>
        </Grid>
        <Grid>
          <Grid item xs={12}>
          <ListGroup>
             <ListGroupItem>
                <ReactPlayer url={video.videoUrl} />
                <Link to={`/Video-Detail/${video.id}`} style={button} className="btn btn-light"><DetailsIcon></DetailsIcon></Link>
                <Link to={`/Comment/${video.id}`} style={button} className="btn btn-light"><ChatBubbleIcon></ChatBubbleIcon></Link>
                </ListGroupItem>
          </ListGroup>
          </Grid>
        </Grid>
      </Grid>
   </React.Fragment>
            </div>
        )
    }
}
