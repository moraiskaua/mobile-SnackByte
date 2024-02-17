import { Text } from '../Text';
import { Container } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Text weight="600" color="#fff">
        {children}
      </Text>
    </Container>
  );
};

export default Button;
