import { FlatList } from 'react-native';
import { products } from '../mocks/products';
import { Text } from '../components/Text';
import {
  AddToCartButton,
  Product,
  ProductDetails,
  ProductImage,
  Separator,
} from './styles';
import { formatCurrency } from '../utils/formatCurrency';
import { PlusCircle } from '../components/Icons/PlusCircle';

interface MenuProps {}

const Menu: React.FC<MenuProps> = ({}) => {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={product => product._id}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => (
        <Product>
          <ProductImage
            source={{
              uri: `http://192.168.0.98:8080/uploads/${product.imagePath}`,
            }}
          />

          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text size={14} color="#666" style={{ marginVertical: 8 }}>
              {product.description}
            </Text>
            <Text size={14} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
    />
  );
};

export default Menu;
