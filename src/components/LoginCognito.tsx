import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from '../aws-exports';
import {Route} from 'react-router-dom';
import App from '../App';

Amplify.configure(awsconfig);

const AuthStateApp: React.FunctionComponent = () => {
    const [authState, setAuthState] = React.useState<AuthState>();
    const [user, setUser] = React.useState<object | undefined>();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);
    console.log("USR:",user);
    console.log("AuthState:",authState);
  return authState === AuthState.SignedIn && user ? (
    <App></App>
  ) : (
      <AmplifyAuthenticator />
  );
}

export default AuthStateApp;