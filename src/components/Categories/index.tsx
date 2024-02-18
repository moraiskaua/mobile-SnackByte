import { Category, Icon } from './styles';
import { Text } from '../Text';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { CategoryType } from '../../types/Category';

interface CategoriesProps {
  categories: CategoryType[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = (categoryId: string) => {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <FlatList
      horizontal
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <Category onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>

            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </Category>
        );
      }}
    />
  );
};

export default Categories;
