import React from 'react';
import {Route,Redirect} from 'react-router-dom';
const PrivateRoute = ({children,...rest}) =>{
    const isAuth = localStorage.getItem('auth_token')?true:false;
    return (<Route {...rest} render={()=>isAuth?(children):(<Redirect to={'/login'}/>)}/>);
}
export default PrivateRoute;