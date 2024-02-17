import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Text } from '../Text';
import { Close } from '../Icons/Close';
import Button from '../Button';
import { useState } from 'react';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

const TableModal: React.FC<TableModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [table, setTable] = useState('');

  const handleSave = () => {
    onSave(table);
    setTable('');
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
            <Button disabled={table.length === 0} onPress={handleSave}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
};

export default TableModal;
