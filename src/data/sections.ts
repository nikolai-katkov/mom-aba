import type { Section } from '../types'

export const MAND_SECTION: Section = {
  id: 'mand',
  title: 'MAND',
  subtitle: 'Requests',
  isAvailable: true,
  criteria: [
    {
      id: 'mand-1',
      sectionId: 'mand',
      level: 1,
      title: 'Uses 2 words or gestures',
      description:
        'The child uses at least 2 words, gestures, or PECS cards to request desired items or activities. Prompts such as echoic, imitation, or non-physical cues are allowed.',
      question: 'Can the child request at least 2 items using words, gestures, or cards?',
      scoringType: 'KOM',
      conditions: ['Prompts allowed (echoic, imitation, non-physical)'],
      examples: ['cookie', 'book'],
      developmentDimension: 'RepertoireSize',
    },
    {
      id: 'mand-2',
      sectionId: 'mand',
      level: 2,
      title: 'Makes 4 independent requests',
      description:
        'The child independently makes at least 4 different requests without prompts. The question "What do you want?" is not counted as independent. The desired object may be visible.',
      question: 'Can the child make 4 different requests without any prompts?',
      scoringType: 'KOM',
      conditions: ['No prompts allowed', 'Excludes "What do you want?"', 'Object may be visible'],
      examples: ['musical toy', 'spring toy', 'ball'],
      developmentDimension: 'Independence',
    },
    {
      id: 'mand-3',
      sectionId: 'mand',
      level: 3,
      title: 'Generalizes 6 requests',
      description:
        'The child generalizes at least 6 mand responses across different people, environments, and types of reinforcement. This shows the skill transfers beyond a single context.',
      question:
        'Can the child make requests with different people, in different places, and for different things?',
      scoringType: 'KOM',
      conditions: [
        'With at least 2 different people',
        'In at least 2 different environments',
        'For at least 2 types of reinforcement',
      ],
      examples: ['Asks mom and dad', 'At home and outside', 'Different items each time'],
      developmentDimension: 'Generalization',
    },
    {
      id: 'mand-4',
      sectionId: 'mand',
      level: 4,
      title: 'Spontaneously makes 5 requests',
      description:
        'The child spontaneously makes at least 5 requests within a 60-minute observation period without any verbal prompts. The desired object may be visible.',
      question: 'Does the child spontaneously request at least 5 items within 60 minutes?',
      scoringType: 'NOV',
      conditions: ['No verbal prompts', 'Object may be visible', 'Time constraint: 60 minutes'],
      examples: [],
      developmentDimension: 'Independence',
    },
    {
      id: 'mand-5',
      sectionId: 'mand',
      level: 5,
      title: 'Has 10 independent requests',
      description:
        'The child has a repertoire of at least 10 independent mand responses without any prompts. The question "What do you want?" is excluded from counting.',
      question: 'Does the child independently request at least 10 different items?',
      scoringType: 'KOM',
      conditions: ['No prompts allowed', 'Excludes "What do you want?"'],
      examples: ['apple', 'swing', 'car', 'juice'],
      developmentDimension: 'RepertoireSize',
    },
  ],
}

export const TACT_SECTION: Section = {
  id: 'tact',
  title: 'TACT',
  subtitle: 'Labeling',
  isAvailable: false,
  criteria: [
    {
      id: 'tact-1',
      sectionId: 'tact',
      level: 1,
      title: 'Labels 2 objects',
      description:
        'The child can label at least 2 objects when presented with them. Objects can include people, animals, characters, or favorite items.',
      question: 'Can the child name at least 2 objects when shown them?',
      scoringType: 'TCT',
      conditions: [],
      examples: ['people', 'animals', 'characters', 'favorite items'],
      developmentDimension: 'RepertoireSize',
    },
    {
      id: 'tact-2',
      sectionId: 'tact',
      level: 2,
      title: 'Labels 4 objects',
      description:
        'The child can label at least 4 objects including people, animals, or characters when directly tested.',
      question: 'Can the child name at least 4 objects?',
      scoringType: 'TCT',
      conditions: [],
      examples: ['people', 'animals', 'characters'],
      developmentDimension: 'RepertoireSize',
    },
    {
      id: 'tact-3',
      sectionId: 'tact',
      level: 3,
      title: 'Labels 6 non-reinforcing objects',
      description:
        'The child can label at least 6 objects that are not inherently reinforcing or preferred. These are everyday items the child may not be motivated by.',
      question: 'Can the child name at least 6 everyday objects that are not their favorites?',
      scoringType: 'TCT',
      conditions: [],
      examples: ['shoe', 'hat', 'spoon', 'car', 'mug', 'bed'],
      developmentDimension: 'RepertoireSize',
    },
    {
      id: 'tact-4',
      sectionId: 'tact',
      level: 4,
      title: 'Spontaneously labels 2 objects',
      description:
        'The child spontaneously labels at least 2 objects during a 60-minute observation period without any prompts.',
      question: 'Does the child spontaneously name at least 2 objects within 60 minutes?',
      scoringType: 'NOV',
      conditions: ['No prompts', '60-minute observation'],
      examples: [],
      developmentDimension: 'Independence',
    },
    {
      id: 'tact-5',
      sectionId: 'tact',
      level: 5,
      title: 'Labels 10 objects',
      description:
        'The child can label at least 10 objects across categories including household items, people, body parts, and pictures.',
      question: 'Can the child name at least 10 objects from different categories?',
      scoringType: 'TCT',
      conditions: [],
      examples: ['household items', 'people', 'body parts', 'pictures'],
      developmentDimension: 'RepertoireSize',
    },
  ],
}

export const SECTIONS: Section[] = [MAND_SECTION, TACT_SECTION]
