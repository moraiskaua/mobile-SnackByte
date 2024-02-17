import { Text } from '../Text';
import { Container } from './styles';

const Header = () => {
  return (
    <Container>
      <Text size={14} opacity={0.9}>
        Bem vindo(a) ao
      </Text>
      <Text size={24} weight="700">
        Snack<Text size={24}>Byte</Text>
      </Text>
    </Container>
  );
};

export default Header;
