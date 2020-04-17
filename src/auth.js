import React from 'react';
import {Route,Redirect} from 'react-router-dom';


const isAuth = () =>{
    if(localStorage.getItem('token') !== null){
        return true;
    }else{
        return false;
    }
}

const privateRoute = ({component: Component,...rest}) =>{

    return(
        <Route {...rest}
        render={props =>
        isAuth () ?(
            <Component {...props}></Component>
        ):(
            <Redirect to={{pathname:'/'}}></Redirect>
        )
        }>
        </Route>
    )

}

export default privateRoute;