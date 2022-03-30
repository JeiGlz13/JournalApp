import React, { useEffect } from 'react';
import {firebase} from '../firebase/firebaseConfig';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { useState } from 'react';

import {PrivateRoute} from './PrivateRoute';
import {PublicRoute} from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';
import { JournalLoading } from '../components/journal/JournalLoading';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) =>{
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking]);

    if (checking) {
        return <JournalLoading/>;
    }

    return (
            <Router>
                <div>
                    <Switch>
                        <PublicRoute path = "/auth" component = {AuthRouter} isAuthenticated = {isLoggedIn} />
                        <PrivateRoute exact path = "/" component = {JournalScreen} isAuthenticated = {isLoggedIn} />
                        
                        <Redirect to = '/auth/login' />
                    </Switch>
                </div>
            </Router>
    )
}
