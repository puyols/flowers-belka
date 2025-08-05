import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Букеты',
    slug: 'bukety_tsvetov',
    description: 'Красивые букеты цветов для любого повода',
    image: '/images/categories/bukety.jpg',
    subcategories: [
      { id: '1-1', name: 'с розами', slug: 'bukety_s_rozami', description: 'Букеты с розами' },
      { id: '1-2', name: 'с альстромерией', slug: 'bukety_s_alstromeriej', description: 'Букеты с альстромерией' },
      { id: '1-3', name: 'с гортензией', slug: 'bukety_s_gortenziej', description: 'Букеты с гортензией' },
      { id: '1-4', name: 'с тюльпанами', slug: 'bukety_s_tulpanami', description: 'Букеты с тюльпанами' },
      { id: '1-5', name: 'с хризантемой', slug: 'bukety_s_hrizantemoj', description: 'Букеты с хризантемой' },
      { id: '1-6', name: 'с диантусами', slug: 'bukety_s_diantusami', description: 'Букеты с диантусами' },
      { id: '1-7', name: 'с эустомой/лизиантусами', slug: 'bukety_s_eustomoj', description: 'Букеты с эустомой' },
      { id: '1-8', name: 'с ромашкой', slug: 'bukety_s_romashkoj', description: 'Букеты с ромашкой' },
      { id: '1-9', name: 'без упаковки', slug: 'bukety_bez_upakovki', description: 'Букеты без упаковки' }
    ]
  },
  {
    id: '2',
    name: 'Розы',
    slug: 'rozy',
    description: 'Элегантные розы различных сортов и цветов',
    image: '/images/categories/rozy.jpg',
    subcategories: [
      { id: '2-1', name: '15 роз', slug: '15_roz', description: 'Букеты из 15 роз' },
      { id: '2-2', name: '25 роз', slug: '25_roz', description: 'Букеты из 25 роз' },
      { id: '2-3', name: 'кустовые розы', slug: 'kustovye_rozy', description: 'Кустовые розы' }
    ]
  },
  {
    id: '3',
    name: 'Тюльпаны',
    slug: 'tulpany',
    description: 'Весенние тюльпаны разных цветов',
    image: '/images/categories/tulpany.jpg'
  },
  {
    id: '4',
    name: 'Цветочные композиции',
    slug: 'tsvety_v_korobke',
    description: 'Стильные композиции в коробках и корзинах',
    image: '/images/categories/kompozicii.jpg'
  },
  {
    id: '5',
    name: 'Пионы',
    slug: 'piony',
    description: 'Роскошные пионы для особых случаев',
    image: '/images/categories/piony.jpg'
  },
  {
    id: '6',
    name: 'Сухоцветы',
    slug: 'sukhotsvety',
    description: 'Долговечные композиции из сухоцветов',
    image: '/images/categories/sukhotsvety.jpg'
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string) => {
  const category = getCategoryBySlug(categorySlug);
  if (!category || !category.subcategories) return undefined;
  
  return category.subcategories.find(sub => sub.slug === subcategorySlug);
};
