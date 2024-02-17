import { Modal } from 'react-native';
import { Text } from '../Text';
import { ProductType } from '../../types/Product';
import { CloseButton, Image } from './styles';
import { Close } from '../Icons/Close';

interface ProductModalProps {
  visible: boolean;
  product: ProductType | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  product,
  onClose,
}) => {
  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.0.98:8080/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <Text>Product Modal</Text>
    </Modal>
  );
};

export default ProductModal;
