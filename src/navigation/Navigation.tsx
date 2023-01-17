import {createStackNavigator} from '@react-navigation/stack';
import {Task} from '../interfaces/taskInterface';
import {DetailTaskScreen} from '../screens/DetailTaskScreen';
import {TaskScreen} from '../screens/TaskScreen';

export type RootStackParams = {
  TaskScreen: undefined;
  DetailTaskScreen: {task: Task};
};
const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FCEEBC',
        },
      }}>
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
      <Stack.Screen name="DetailTaskScreen" component={DetailTaskScreen} />
    </Stack.Navigator>
  );
};
