import React, { Component } from 'react'
import {Grid} from '@material-ui/core';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';


export default class Upload extends Component {
    constructor(props){
        super(props);
            this.state={
               video:{
                   title:'',
                   description:'',
                   videoUrl:''
               },
               isEdit:false,
               videoId:0
            }
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
    }


     onSubmit (event){
        event.preventDefault();
        const token = localStorage.getItem('token')
        const video = this.state.video;
        if(this.state.isEdit === true){
            axios.put(`http://localhost:3000/update/video/${this.props.match.params.videoId}`,video,{
              headers:{
                  'authorization':token
              }
          }).then(result =>{
            alert('Editado com Sucesso');
            this.props.history.push('/My-Profile')
          })
          .catch(err =>{
              console.log('Deu Erro')
          })
          }else{
              axios.post('http://localhost:3000/video',video,{
                  headers:{
                      'authorization':token
                  }
              }).then(result =>{
                 alert('Criado com Sucesso');
                 this.props.history.push('/My-Profile')
              })
              .catch(err =>{
                console.log('Not')
              })
          }
    }

    onChange(event){
       this.setState({video:{...this.state.video,[event.target.name]:event.target.value}})
    }

   componentDidMount(){
       if(this.props.match.params.videoId == null){
         this.setState({isEdit:false})
       }else{
           this.setState({isEdit:true})
           axios.get(`http://localhost:3000/video/${this.props.match.params.videoId}`)
           .then(result =>{
               console.log(result.data.video)
               this.setState({video:result.data.video})
           }).catch(err =>{
               console.log('Erro')
           })
       }
   }

    render() {
        const{isEdit} = this.state
        const {video} =this.state
        if(isEdit){
          return (
            <div>
                <React.Fragment>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch">
                        <Grid item xs={12}>
                           <h1>Edit Video</h1> 
                        </Grid>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup for="title">
                            <Grid item xs={12} sm={6}>
                              <Label>Title</Label>
                              <Input type="text" name="title" onChange={this.onChange} value={video.title} placeholder="put title here" id="title"></Input>
                          </Grid>
                            </FormGroup>
                            <FormGroup for="description">
                              <Grid item xs={12} sm={6}>
                                <Label>Description</Label>
                                <Input type="textarea" onChange={this.onChange} value={video.description} name="description" id="description"></Input>
                             </Grid>
                            </FormGroup>
                            <FormGroup for="videoUrl">
                              <Grid item xs={12} sm={6}>
                                <Label>Link from Youtube</Label>
                                <Input type="text" onChange={this.onChange} value={video.videoUrl} name="videoUrl" id="videoUrl"></Input>
                             </Grid>
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Grid>
                </React.Fragment>
            </div>
          )
        }else{
            return(
                <div>
                <React.Fragment>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch">
                        <Grid item xs={12}>
                           <h1>Uploads</h1> 
                        </Grid>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup for="title">
                            <Grid item xs={12} sm={6}>
                              <Label>Title</Label>
                              <Input type="text" name="title" onChange={this.onChange} placeholder="put title here" id="title"></Input>
                          </Grid>
                            </FormGroup>
                            <FormGroup for="description">
                              <Grid item xs={12} sm={6}>
                                <Label>Description</Label>
                                <Input type="textarea" onChange={this.onChange} name="description" id="description"></Input>
                             </Grid>
                            </FormGroup>
                            <FormGroup for="videoUrl">
                              <Grid item xs={12} sm={6}>
                                <Label>Link from Youtube</Label>
                                <Input type="text" onChange={this.onChange} name="videoUrl" id="videoUrl"></Input>
                             </Grid>
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Grid>
                </React.Fragment>
            </div>
            )
        }
    }
}
