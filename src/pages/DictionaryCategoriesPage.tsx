import {
  Anchor,
  Apple,
  Baby,
  Bird,
  Bone,
  BrickWall,
  Bug,
  Bus,
  Cherry,
  Drumstick,
  Egg,
  Fish,
  Flower2,
  Footprints,
  GraduationCap,
  Guitar,
  HardHat,
  Lamp,
  Pencil,
  Shapes,
  Shirt,
  ShoppingBasket,
  Sofa,
  Swords,
  TreePine,
  UtensilsCrossed,
} from 'lucide-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Card, PageLayout } from '../components/ui'
import { useLanguage } from '../hooks'
import { tProps } from '../i18n'
import type { VocabularyCategory } from '../types'
import styles from './DictionaryCategoriesPage.module.css'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'toys': <Baby size={20} aria-hidden="true" />,
  'shapes': <Shapes size={20} aria-hidden="true" />,
  'fruits': <Apple size={20} aria-hidden="true" />,
  'body-parts': <Footprints size={20} aria-hidden="true" />,
  'domestic-animals': <Bone size={20} aria-hidden="true" />,
  'vegetables': <ShoppingBasket size={20} aria-hidden="true" />,
  'forest-animals': <TreePine size={20} aria-hidden="true" />,
  'clothing': <Shirt size={20} aria-hidden="true" />,
  'footwear': <Footprints size={20} aria-hidden="true" />,
  'furniture': <Sofa size={20} aria-hidden="true" />,
  'dishes': <UtensilsCrossed size={20} aria-hidden="true" />,
  'food': <Drumstick size={20} aria-hidden="true" />,
  'transport': <Bus size={20} aria-hidden="true" />,
  'school-supplies': <Pencil size={20} aria-hidden="true" />,
  'appliances': <Lamp size={20} aria-hidden="true" />,
  'sports-equipment': <Swords size={20} aria-hidden="true" />,
  'berries': <Cherry size={20} aria-hidden="true" />,
  'domestic-birds': <Egg size={20} aria-hidden="true" />,
  'wild-birds': <Bird size={20} aria-hidden="true" />,
  'fish': <Fish size={20} aria-hidden="true" />,
  'trees-flowers': <Flower2 size={20} aria-hidden="true" />,
  'headwear': <HardHat size={20} aria-hidden="true" />,
  'professions': <GraduationCap size={20} aria-hidden="true" />,
  'musical-instruments': <Guitar size={20} aria-hidden="true" />,
  'insects': <Bug size={20} aria-hidden="true" />,
  'sea-creatures': <Anchor size={20} aria-hidden="true" />,
  'dinosaurs': <BrickWall size={20} aria-hidden="true" />,
}

function CategoryCard({ category }: { category: VocabularyCategory }) {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`/dictionary/${category.id}`)
  }, [navigate, category.id])

  return (
    <Card onClick={handleClick}>
      <div className={styles.cardContent}>
        <span className={styles.categoryIcon}>{CATEGORY_ICONS[category.id]}</span>
        <span className={styles.categoryName}>{category.name}</span>
      </div>
    </Card>
  )
}

export function DictionaryCategoriesPage() {
  const { t, vocabulary } = useLanguage()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('home'), path: '/' },
    { label: t('dictionaryTitle'), path: '/dictionary' },
  ]

  return (
    <PageLayout title={t('dictionaryTitle')} breadcrumbs={breadcrumbs} wide>
      <p className={styles.subtitle} {...tProps('dictionarySubtitle')}>
        {t('dictionarySubtitle')}
      </p>
      <div className={styles.categoryGrid}>
        {vocabulary.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </PageLayout>
  )
}
