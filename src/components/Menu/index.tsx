import { FlatList } from 'react-native';
import { Text } from '../Text';
import {
  AddToCartButton,
  Product,
  ProductDetails,
  ProductImage,
  Separator,
} from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import ProductModal from '../ProductModal';
import { useState } from 'react';
import { ProductType } from '../../types/Product';

interface MenuProps {
  onAddToCart: (product: ProductType) => void;
  products: ProductType[];
}

const Menu: React.FC<MenuProps> = ({ products, onAddToCart }) => {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );

  const handleOpenProductModal = (product: ProductType) => {
    setIsProductModalVisible(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <ProductModal
        visible={isProductModalVisible}
        product={selectedProduct}
        onClose={() => setIsProductModalVisible(false)}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <Product onPress={() => handleOpenProductModal(product)}>
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

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </Product>
        )}
      />
    </>
  );
};

export default Menu;
