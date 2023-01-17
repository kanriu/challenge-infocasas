import React from 'react';
import {Modal, View, Text, Button, TouchableOpacity} from 'react-native';

interface Props {
  message: string;
  modal: boolean;
  setModal: (value: boolean) => void;
  removeTask: () => void;
}

export const ModalComponent = ({
  message,
  modal,
  setModal,
  removeTask,
}: Props) => {
  return (
    <Modal animationType="fade" transparent visible={modal}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            elevation: 10,
            borderRadius: 5,
            padding: 10,
            maxWidth: '80%',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
              color: 'black',
            }}>
            {message}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '60%',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
              onPress={() => setModal(false)}
              activeOpacity={0.8}>
              <Text style={{color: 'white'}}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: 'green',
                borderRadius: 10,
              }}
              onPress={() => {
                setModal(false);
                removeTask();
              }}
              activeOpacity={0.8}>
              <Text style={{color: 'white'}}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
