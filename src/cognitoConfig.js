const config = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
  region: process.env.REACT_APP_REGION
};

console.log('Cognito Config:', config); // For debugging

export default config;
