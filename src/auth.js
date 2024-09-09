import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import config from './cognitoConfig';

const userPool = new CognitoUserPool({
  UserPoolId: config.UserPoolId,
  ClientId: config.ClientId
});

export const signUp = (username, password, email, phone) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, [
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phone }
    ], null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const confirmSignUp = (username, confirmationCode) => {
  const userData = {
    Username: username,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const signIn = (username, password) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err)
    });
  });
};

export const signOut = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};

export const getCurrentUser = () => {
  return userPool.getCurrentUser();
};
