import { FlatList, TouchableOpacity } from 'react-native';
import { CartItemType } from '../../types/CartItem';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import Button from '../Button';
import { ProductType } from '../../types/Product';
import OrderConfirmModal from '../OrderConfirmModal';
import { useState } from 'react';
import { api } from '../../utils/api';

interface CartProps {
  cartItems: CartItemType[];
  selectedTable: string;
  onAdd: (product: ProductType) => void;
  onRemove: (product: ProductType) => void;
  onConfirmOrder: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  selectedTable,
  onAdd,
  onRemove,
  onConfirmOrder,
}) => {
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    await api.post('/orders', {
      table: selectedTable,
      products: cartItems.map(cartItem => ({
        product: cartItem.product,
        quantity: cartItem.quantity,
      })),
    });
    setIsLoading(false);
    setIsOrderModalVisible(true);
  };

  return (
    <>
      <OrderConfirmModal
        visible={isOrderModalVisible}
        onOk={() => {
          onConfirmOrder();
          setIsOrderModalVisible(false);
        }}
      />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          style={{ marginBottom: 20, maxHeight: 150 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `https://back-end-snackbyte.vercel.app/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onRemove(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          disabled={cartItems.length === 0}
          onPress={handleConfirmOrder}
          isLoading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
};

export default Cart;
