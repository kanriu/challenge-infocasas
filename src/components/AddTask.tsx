import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onHandle: (event: GestureResponderEvent) => void;
}

export const AddTask = ({onHandle}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onHandle}
      activeOpacity={0.8}>
      <Icon name="add-circle" size={35} color="#c46f50" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
