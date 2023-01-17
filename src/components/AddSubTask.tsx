import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import {SubTask, Task} from '../interfaces/taskInterface';
import {filterSubTask} from '../utils/filterSubTask';

interface Props {
  subTask: SubTask;
  task: Task;
  onChange: (value: Task) => void;
  isFocus: boolean;
  removeSubTask: (task: Task) => void;
  checkCompleted: (task: Task) => void;
  textRef: React.MutableRefObject<string | boolean | null>;
}

export const AddSubTask = ({
  subTask,
  task,
  onChange,
  isFocus,
  removeSubTask,
  checkCompleted,
  textRef,
}: Props) => {
  const setTask = (newValue: boolean | string | Task, prop: string) => {
    const updateTask: Task = {
      ...task,
      subTasks: task.subTasks.map(item =>
        item.id === subTask.id ? {...item, [prop]: newValue} : item,
      ),
    };
    switch (typeof newValue) {
      case 'boolean':
        onChange(updateTask);
        checkCompleted(updateTask);
        break;
      case 'string':
        onChange(updateTask);
        textRef.current = newValue;
        break;
      default:
        onChange(newValue);
        break;
    }
  };
  const handleRemove = (task: Task, id: string) => {
    const newTask = filterSubTask(task, id);
    setTask(newTask, 'remove');
    removeSubTask(newTask);
  };
  return (
    <View style={styles.container}>
      <CheckBox
        style={styles.checkBox}
        value={subTask.isCompleted}
        onValueChange={newValue => setTask(newValue, 'isCompleted')}
      />
      <TextInput
        style={styles.textInput}
        multiline
        value={subTask.description}
        onChangeText={text => setTask(text, 'description')}
        autoFocus={isFocus}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          handleRemove(task, subTask.id);
        }}
        style={styles.trash}>
        <Icon name="close-circle" size={26} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 0,
    marginBottom: 10,
    borderBottomColor: '#c46f50',
    borderBottomWidth: 1,
  },
  checkBox: {
    top: 8,
  },
  textInput: {
    flex: 1,
  },
  trash: {
    top: 11,
  },
});
