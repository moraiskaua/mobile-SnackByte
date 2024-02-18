import { Modal } from 'react-native';
import { Container, OkButton } from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

interface OrderConfirmModalProps {
  visible: boolean;
  onOk: () => void;
}

const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  visible,
  onOk,
}) => {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />

        <Text size={20} color="#fff" weight="600" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          o pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onOk}>
          <Text color="#d73035" weight="600">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
};

export default OrderConfirmModal;
