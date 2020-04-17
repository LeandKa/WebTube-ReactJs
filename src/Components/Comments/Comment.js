import React, { Component } from 'react';
import axios from 'axios';
import {Grid,Box, Typography,Card, CardContent,Button} from '@material-ui/core';
import ReactPlayer from 'react-player';
import CommentNew from '../Comments/CommentNew';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const button = {
    float:'right'
}


export default class Comment extends Component {

    constructor(props){
        super(props);
            this.state={
                video:{},
                comment:[],
                commentNew:{
                    text:'',
                    userId:0,
                    videoId:0
                },
                userId:'',
                isEdit:false,
                commentEdit:0

            }

            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        const videoId = this.props.match.params.videoId
        const userId = localStorage.getItem('id');
        axios.get(`http://localhost:3000/video/withComments/${videoId}`)
        .then(result =>{
           this.setState({video:result.data.video})
           this.setState({comment:result.data.video.Comments})
           this.setState({userId:userId})
           
        }).catch(err =>{
           console.log('Nop')
        })

    }

    onChange(event){
     this.setState({commentNew:{text:event.target.value,userId:this.props.userId,videoId:this.props.match.params.videoId}});
    }

    onSubmit(event){
       const comment = this.state.commentNew;
       const token = localStorage.getItem('token')
       if(this.state.isEdit== true){
         axios.put(`http://localhost:3000/update/comment/${this.state.commentEdit}`,comment,{
             headers:{
                'authorization':token
             }
         }).then(result =>{
           console.log('Ok')
         }).catch(err =>{
           console.log('Not Ok')
         }) 
       }else{
        axios.post('http://localhost:3000/comment',comment,{
            headers:{
                'authorization':token
            }
        }).then(result =>{
         this.setState(values => ({ ...values, comment: comment }));
        })
        .catch(err =>{
           console.log('Nop');
        })
       }
    }

    onClickEdit(id,text,video,idComment) {
        const token = localStorage.getItem('id')
       if(!token === id ){
           alert('Este não e o seu comentario')
       }else{
         this.setState({isEdit:true})
         this.setState({commentNew:{text:text,videoId:video,userId:id}})
         this.setState({commentEdit:idComment});
       }
   }

   onClickDel(id){
    const token = localStorage.getItem('token');
    const idLocal = localStorage.getItem('id');
    if(!idLocal === id ){
        alert('Este não e o seu comentario')
    }else{
        axios.delete(`http://localhost:3000/delete/comment/${id}`,{
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
   }


    render() {
        const {video,comment,userId} = this.state;
        return (
            <div>
                <React.Fragment>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
                      <Grid item xs={12}><h1>{video.title}</h1></Grid>
                      <Grid item xs={12}>
                          <ReactPlayer url={video.videoUrl}></ReactPlayer>
                      </Grid>
                      <Grid item xs={12}><CommentNew onChange={this.onChange} onSubmit={this.onSubmit} comment={this.state.commentNew}></CommentNew></Grid>
                      <Grid item xs={12}>
                          {
                              comment.map(comments =>(
                                <Box key={comments.id}>
                                <Grid container direction="row" spacing={2}>
                                     <Grid item xs={12}>
                                         <Card>
                                             <CardContent>
                                             <Button style={button} onClick={this.onClickDel.bind(this,comments.id)}><DeleteIcon></DeleteIcon></Button>
                                             <Button style={button} onClick={this.onClickEdit.bind(this,comments.userId,comments.text,comments.videoId,comments.id)}><EditIcon></EditIcon></Button>
                                             <Typography>Username says:</Typography>
                                             <Typography>{comments.text}</Typography>
                                             </CardContent>
                                         </Card>
                                     </Grid>
                                </Grid>
                            </Box>
                              ))}
                      </Grid>
                    </Grid>
                </React.Fragment>
            </div>
        )
    }
}
