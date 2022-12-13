import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthNavigation from './AuthNavigation';
import Navigation from './Navigation';

const Routes = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
      {/* <Navigation /> */}
    </NavigationContainer>
  );
};

export default Routes;
