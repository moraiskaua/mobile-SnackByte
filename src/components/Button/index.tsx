import { Text } from '../Text';
import { Container } from './styles';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  isLoading,
  ...props
}) => {
  return (
    <Container disabled={disabled || isLoading} {...props}>
      {!isLoading ? (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      ) : (
        <ActivityIndicator color="#fff" />
      )}
    </Container>
  );
};

export default Button;
