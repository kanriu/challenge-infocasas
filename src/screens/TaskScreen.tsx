import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {AddTask} from '../components/AddTask';
import {SearchInput} from '../components/SearchInput';
import {TaskCard} from '../components/TaskCard';
import {Task} from '../interfaces/taskInterface';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ModalComponent} from '../components/ModalComponent';
import {TaskContext} from '../context/TaskContext';
import {CustomSwitch} from '../components/CustomSwitch';

export const TaskScreen = () => {
  const {
    tasks,
    isModal,
    selectedTask,
    callModal,
    addSelectedTask,
    removeTask,
    updateTask,
  } = useContext(TaskContext);
  const [term, setTerm] = useState('');
  const [tasksFiltered, setTasksFiltered] = useState<Task[]>([]);
  const [isFilterCompleted, setIsFilterCompleted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (term.length === 0) return setTasksFiltered([]);
    setTasksFiltered(
      tasks.filter(item =>
        item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
      ),
    );
  }, [term]);

  useEffect(() => {
    if (selectedTask.subTasks.every(currentValue => currentValue.isCompleted))
      updateTask({...selectedTask, isFinalized: true});
  }, [selectedTask]);

  useEffect(() => {
    if (isFilterCompleted)
      return setTasksFiltered(tasks.filter(item => item.isFinalized));
    setTasksFiltered([]);
  }, [isFilterCompleted]);

  //TODO: Faltaria una limpieza de las tareas que esten vacías

  return (
    <View style={styles.container}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={styles.searchInput}
      />
      <View
        style={{
          marginTop: 80,
        }}>
        <CustomSwitch
          isOn={isFilterCompleted}
          onChange={setIsFilterCompleted}
        />
        <AddTask
          onHandle={() =>
            navigation.dispatch(CommonActions.navigate('DetailTaskScreen'))
          }
        />
        <FlatList
          data={tasksFiltered.length > 0 ? tasksFiltered : tasks}
          renderItem={({item, index}) => (
            <TaskCard
              index={String(index + 1)}
              task={item}
              setModal={callModal}
              addSelectedTask={addSelectedTask}
            />
          )}
          keyExtractor={(_, index) => String(index)}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <ModalComponent
        modal={isModal}
        setModal={callModal}
        message={`¿Está seguro de remover la tarea "${selectedTask.title}"?`}
        removeTask={removeTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 75,
  },
  searchInput: {
    position: 'absolute',
    zIndex: 999,
    marginTop: 15,
  },
});
