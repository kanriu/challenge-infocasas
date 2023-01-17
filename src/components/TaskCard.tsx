import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Task} from '../interfaces/taskInterface';

interface Props {
  index: string;
  task: Task;
  setModal: (value: boolean) => void;
  addSelectedTask: (task: Task) => void;
}

export const TaskCard = ({index, task, setModal, addSelectedTask}: Props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    setModal(true);
    addSelectedTask(task);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={styles.cardContainer}
      onPress={() =>
        navigation.dispatch(
          CommonActions.navigate('DetailTaskScreen', {
            task,
          }),
        )
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          top: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              borderColor: 'gray',
              borderEndWidth: 1,
              height: 35,
              justifyContent: 'center',
              marginRight: 10,
              paddingRight: 10,
            }}>
            <Text style={{...styles.nameContainer, fontSize: 20}}>{index}</Text>
          </View>
          <Text style={styles.nameContainer}>{task.title}</Text>
          {task.isFinalized && (
            <Icon
              style={{marginLeft: 5}}
              name="checkmark-circle"
              size={25}
              color="green"
            />
          )}
        </View>
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
          <Icon name="close-circle" size={25} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  nameContainer: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
});
