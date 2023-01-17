import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Navigation} from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import {TaskProvider} from './src/context/TaskContext';

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return <TaskProvider>{children}</TaskProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
