import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

interface Props {
  isOn: boolean;
  onChange: (enabled: boolean) => void;
}

export const CustomSwitch = ({isOn, onChange}: Props) => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#D9D9DB', true: '#c46f50'}}
        thumbColor={'#c46f50'}
        //ios_backgroundColor="#3e3e3e"
        onValueChange={onChange}
        value={isOn}
      />
      <Text style={styles.text}>Tareas finalizadas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    bottom: 1,
  },
});
