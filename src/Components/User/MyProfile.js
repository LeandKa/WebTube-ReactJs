import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import axios from 'axios';
import ReactPlayer from 'react-player'
import {Link} from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const button = {
  float:'right',
  marginTop:'10px',
  marginLeft:'10px'
}
const cropper = {
    width: '100px',
    height: '100px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
}
const profile = {
  display: 'inline',
  margin: '0',
  marginLeft: '-25%', //centers the image
  height: '100%',
  width: 'auto'
}

export default class MyProfile extends Component {

  constructor(props){
    super(props);
        this.state={
            img:'',
            name:'',
            videos:[]
        }
}

   componentDidMount(){
    const userId = localStorage.getItem('id');
    axios.get(`http://localhost:3000/userMe/my-Videos/${userId}`)
    .then(result =>{
       this.setState({
         img:result.data.avatarUrl,
         name:result.data.name,
         videos:result.data.Videos
       })
       console.log('Ok')
    })
    .catch(err =>{
      console.log('No')
    })
   }

   onClickDel(id){
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:3000/delete/video/${id}`,{
            headers:{
               'authorization':token
            }
        })
        .then(result =>{
           window.location.reload();
        }).catch(err =>{
           console.log('Not')
        })
    }

    render() {
      const {videos} = this.state;
        return (
              <React.Fragment>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
        <Grid item xs={2}>
            <div style={cropper}>
            <img src={this.state.img} alt= "avatar" style={profile}></img>
            </div>
        </Grid>
        <Grid item xs={10}>
        <h1>This is {this.state.name}</h1>
        </Grid>
        <Grid>
        {videos.map(videos => (
          <div>
          <Grid item xs={12}>
          <ListGroup>
           <Typography>Meus Videos</Typography>
             <ListGroupItem key={videos.id}>
                 <h1>{videos.title}</h1>
                <ReactPlayer url={videos.videoUrl} />
                <Link to={`/Upload/${videos.id}`} style={button} className="btn btn-light"><EditIcon></EditIcon></Link>
                <Button style={button} onClick={this.onClickDel.bind(this,videos.id)}><DeleteIcon></DeleteIcon></Button>
                </ListGroupItem>
          </ListGroup>
          </Grid>
          </div>
          ))}
        </Grid>
      </Grid>
   </React.Fragment>
  );
}
}