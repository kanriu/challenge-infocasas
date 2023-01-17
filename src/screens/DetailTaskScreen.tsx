import React, {useRef, useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/Navigation';
import {AddTask} from '../components/AddTask';
import {AddSubTask} from '../components/AddSubTask';
import {TaskContext} from '../context/TaskContext';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {Task} from '../interfaces/taskInterface';
import {newId} from '../utils/newId';

interface Props extends StackScreenProps<RootStackParams, 'DetailTaskScreen'> {}

export const DetailTaskScreen = ({route}: Props) => {
  const {params} = route;

  const {tasks, updateTask, addTask, checkCompleted} = useContext(TaskContext);

  const [task, setTask] = useState<Task>(
    params?.task || {
      id: '',
      title: '',
      isFinalized: false,
      subTasks: [],
    },
  );
  const textRef = useRef<string | boolean | null>(null);
  const debounceValue = useDebouncedValue(textRef.current);

  useEffect(() => {
    if (debounceValue !== null) {
      if (task.id.length > 0) return updateTask(task);
      const newTask = {...task, id: newId(tasks)};
      setTask(newTask);
      addTask(newTask);
    }
  }, [debounceValue]);

  const isFocusRef = useRef(false);

  const emptyTask = () => {
    const newSubTask = [
      ...task.subTasks,
      {
        id: newId(task.subTasks),
        description: '',
        isCompleted: false,
        isFocus: false,
      },
    ];
    setTask({...task, subTasks: newSubTask});
    isFocusRef.current = true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Titulo:</Text>
      <TextInput
        style={styles.textInput}
        placeholder={'Insertar titulo...'}
        autoCapitalize="none"
        autoCorrect={false}
        value={task.title}
        onChangeText={value => {
          setTask({...task, title: value});
          textRef.current = value;
        }}
      />
      <Text style={styles.titulo}>Subtareas:</Text>
      <AddTask onHandle={emptyTask} />
      <FlatList
        data={task.subTasks}
        renderItem={({item, index}) => (
          <AddSubTask
            subTask={item}
            task={task}
            onChange={setTask}
            isFocus={isFocusRef.current}
            removeSubTask={updateTask}
            textRef={textRef}
            checkCompleted={checkCompleted}
          />
        )}
        keyExtractor={(_, index) => String(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  titulo: {
    color: 'black',
    fontSize: 20,
  },
  textInput: {
    borderBottomColor: '#CAAC6C',
    borderBottomWidth: 1,
    paddingBottom: 0,
    marginBottom: 10,
  },
});
