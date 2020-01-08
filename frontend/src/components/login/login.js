import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import './login.scss';

const Login = props => {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/dashboard',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => {
        if (!firebase.auth().currentUser.emailVerified) {
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(email => {
              console.log(firebase.auth().currentUser.getIdToken(true));
              props.history.push('/dashboard');
            })
            .catch(err => console.log(err));
        } else {
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
              console.log(token);
            });
        }
      }
    }
  };
  return (
    <div className='login'>
      <div className='text'>
        <h2>Welcome to mNeme Flashcards!</h2>
        <p>An effective, fun, and easy to use flashcards app</p>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default Login;
