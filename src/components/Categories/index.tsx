import { categories } from '../../mocks/categories';
import { Category, Icon } from './styles';
import { Text } from '../Text';
import { FlatList } from 'react-native';

const Categories = () => {
  return (
    <FlatList
      horizontal
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => (
        <Category>
          <Icon>
            <Text>{category.icon}</Text>
          </Icon>

          <Text size={14} weight="600">
            {category.name}
          </Text>
        </Category>
      )}
    />
  );
};

export default Categories;
