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
import { createElement } from 'react'

import type { VerbalOperant, WordDifficulty } from '../types'

function icon(component: React.ElementType) {
  return createElement(component, { 'size': 20, 'aria-hidden': 'true' })
}

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'toys': icon(Baby),
  'shapes': icon(Shapes),
  'fruits': icon(Apple),
  'body-parts': icon(Footprints),
  'domestic-animals': icon(Bone),
  'vegetables': icon(ShoppingBasket),
  'forest-animals': icon(TreePine),
  'clothing': icon(Shirt),
  'footwear': icon(Footprints),
  'furniture': icon(Sofa),
  'dishes': icon(UtensilsCrossed),
  'food': icon(Drumstick),
  'transport': icon(Bus),
  'school-supplies': icon(Pencil),
  'appliances': icon(Lamp),
  'sports-equipment': icon(Swords),
  'berries': icon(Cherry),
  'domestic-birds': icon(Egg),
  'wild-birds': icon(Bird),
  'fish': icon(Fish),
  'trees-flowers': icon(Flower2),
  'headwear': icon(HardHat),
  'professions': icon(GraduationCap),
  'musical-instruments': icon(Guitar),
  'insects': icon(Bug),
  'sea-creatures': icon(Anchor),
  'dinosaurs': icon(BrickWall),
}

export const DIFFICULTIES: WordDifficulty[] = ['simple', 'medium', 'complex']

export const DIFFICULTY_KEYS: Record<
  WordDifficulty,
  'difficultySimple' | 'difficultyMedium' | 'difficultyComplex'
> = {
  simple: 'difficultySimple',
  medium: 'difficultyMedium',
  complex: 'difficultyComplex',
}

export const OPERANT_LABEL_KEYS: Record<
  VerbalOperant,
  'operantMand' | 'operantTact' | 'operantListener' | 'operantEchoic'
> = {
  mand: 'operantMand',
  tact: 'operantTact',
  listenerResponding: 'operantListener',
  echoic: 'operantEchoic',
}
