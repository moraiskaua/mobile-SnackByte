import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedTable, onCancelOrder }) => {
  return (
    <Container>
      {!selectedTable ? (
        <>
          <Text size={14} opacity={0.9}>
            Bem vindo(a) ao
          </Text>
          <Text size={24} weight="700">
            Snack<Text size={24}>Byte</Text>
          </Text>
        </>
      ) : (
        <Content>
          <OrderHeader>
            <Text size={24} weight="600">
              Pedido
            </Text>

            <TouchableOpacity onPress={onCancelOrder}>
              <Text color="#d73035" weight="600" size={14}>
                cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <Text color="#666">Mesa {selectedTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  );
};

export default Header;
