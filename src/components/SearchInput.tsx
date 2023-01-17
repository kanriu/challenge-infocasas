import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, StyleProp, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');
  const debounceValue = useDebouncedValue(textValue);

  useEffect(() => {
    onDebounce(String(debounceValue));
  }, [debounceValue]);

  return (
    <View style={{...styles.container, ...(style as any)}}>
      <TextInput
        placeholder="Buscar tarea"
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        value={textValue}
        onChangeText={setTextValue}
      />
      <Icon name="search-outline" size={20} color="grey" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
  },
});
