import type { SectionIntroduction } from '../../types'
import type { Language } from '../types'

const INTRODUCTIONS_EN: Record<string, SectionIntroduction> = {
  mand: {
    sectionId: 'mand',
    shortBullets: [
      'A mand is a request - when your child asks for something they want using words, gestures, or picture cards.',
      'Requesting is one of the first and most important communication skills because it gives your child direct control over their environment.',
      'You will assess whether your child can request items at different levels of independence, from prompted requests to fully spontaneous communication.',
      'Each level builds on the previous one, moving from basic requesting with help to independent, flexible communication across different settings.',
    ],
    fullExplanation:
      'The Mand section is based on Applied Behavior Analysis (ABA). A "mand" is a technical term for a request - it is communication motivated by a want or need. Unlike labeling or repeating, requesting is driven by the child\'s own motivation, which makes it a powerful starting point for language development.\n\nThe 5 criteria in this section follow a developmental progression across three dimensions:\n\n- Independence: Moving from prompted requests (Level 1) to fully spontaneous communication (Level 4-5), where the child initiates without any cues from adults.\n\n- Generalization: Expanding from requesting with one person in one place (Level 1-2) to requesting with different people, in different environments, and for different types of items (Level 3).\n\n- Repertoire size: Growing from 2 requests (Level 1) to 10 distinct independent requests (Level 5), reflecting a richer and more flexible communication vocabulary.\n\nDuring the assessment, you will observe or test whether your child demonstrates each skill. For most criteria, you can combine direct testing with observation in natural settings. For spontaneous requesting, you will observe during a 60-minute period without prompting.\n\nCommon things parents find helpful to know:\n- It is perfectly normal for children to be at different levels across these criteria.\n- Prompts are a normal part of learning. The goal is to gradually reduce them, not to eliminate them immediately.\n- "Requesting" includes any intentional communication - spoken words, sign language, gestures, or picture exchange (PECS) all count.\n- The assessment captures where your child is right now. The training guides will show you how to build the next skill.',

    videoSrc: '/assets/video/cookie.mp4',
    videos: [
      { label: 'Variant 1', src: '/assets/video/cookie.mp4' },
      { label: 'Variant 2', src: '/assets/video/mand-notebook-llm.mp4' },
    ],
  },
  tact: {
    sectionId: 'tact',
    shortBullets: [
      'A tact is a label - when your child names something they see, hear, smell, or touch without being asked to.',
      'Labeling is essential for language development because it connects words to the world around your child.',
      'You will assess whether your child can label objects at increasing levels of complexity, from naming favorites to labeling everyday items spontaneously.',
      'This section moves from simple labeling of preferred items to naming non-preferred objects and spontaneous labeling without prompts.',
    ],
    fullExplanation:
      'The Tact section assesses your child\'s ability to label - to name things in their environment. In ABA terminology, a "tact" is a verbal response controlled by a non-verbal stimulus: the child sees a dog and says "dog," or sees mom and says "mama." Unlike requesting (manding), tacting is not driven by wanting the item - it is driven by contact with it.\n\nThe 5 criteria progress through:\n\n- Repertoire size: From 2 objects (Level 1) to 10 objects across categories (Level 5).\n\n- Complexity: From labeling favorite items (Level 1-2) to everyday objects that are not their favorites (Level 3), which is harder because the child is less motivated.\n\n- Independence: From labeling on request during direct testing (Levels 1-3, 5) to spontaneous labeling without prompts (Level 4).\n\nMost criteria use direct testing (TestTrial) - you show the child an object and ask "What is this?" Level 4 uses timed observation (TimedObservation) - you watch for spontaneous labels during a 60-minute period.',
  },
}

const INTRODUCTIONS_RU: Record<string, SectionIntroduction> = {
  mand: {
    sectionId: 'mand',
    shortBullets: [
      'Манд - это просьба: ребенок просит то, что хочет, с помощью слов, жестов или карточек PECS.',
      'Просьба - один из первых и важнейших навыков коммуникации, потому что дает ребенку прямой контроль над своим окружением.',
      'Вы оцените, может ли ваш ребенок просить предметы на разных уровнях самостоятельности: от просьб с подсказкой до полностью спонтанной коммуникации.',
      'Каждый уровень опирается на предыдущий: от базовых просьб с помощью до самостоятельного, гибкого общения в разных ситуациях.',
    ],
    fullExplanation:
      'Раздел Манд основан на прикладном анализе поведения (ABA). «Манд» - это технический термин для просьбы: коммуникация, мотивированная желанием или потребностью. В отличие от называния или повторения, просьба определяется собственной мотивацией ребенка, что делает его мощной отправной точкой для развития речи.\n\n5 критериев в этом разделе следуют за развитием по трем направлениям:\n\n- Самостоятельность: от просьб с подсказкой (уровень 1) к полностью спонтанной коммуникации (уровни 4-5), когда ребенок инициирует общение без каких-либо подсказок со стороны взрослых.\n\n- Обобщение: от просьб с одним человеком в одном месте (уровни 1-2) к просьбам с разными людьми, в разных местах и по разным поводам (уровень 3).\n\n- Размер репертуара: от 2 просьб (уровень 1) до 10 различных самостоятельных просьб (уровень 5), что отражает более богатый и гибкий коммуникативный словарь.\n\nВ ходе оценки вы будете наблюдать или проверять, демонстрирует ли ваш ребенок каждый навык. Для большинства критериев можно сочетать прямое тестирование с наблюдением в естественных условиях. Для спонтанных просьб вы будете наблюдать в течение 60 минут без подсказок.\n\nЧто полезно знать родителям:\n- Совершенно нормально, когда ребенок находится на разных уровнях по разным критериям.\n- Подсказки - нормальная часть обучения. Цель - постепенно уменьшать их, а не убирать сразу.\n- «Просьба» включает любую намеренную коммуникацию: устные слова, жестовый язык, жесты или обмен карточками (PECS).\n- Оценка фиксирует, где ваш ребенок находится сейчас. Руководства по отработке покажут, как развить следующий навык.',

    videoSrc: '/assets/video/cookie.mp4',
    videos: [
      { label: 'Вариант 1', src: '/assets/video/cookie.mp4' },
      { label: 'Вариант 2', src: '/assets/video/mand-notebook-llm.mp4' },
    ],
  },
  tact: {
    sectionId: 'tact',
    shortBullets: [
      'Такт - это называние: ребенок называет то, что видит, слышит, ощущает на ощупь или по запаху, без просьбы назвать.',
      'Называние важно для развития речи, потому что связывает слова с окружающим миром ребенка.',
      'Вы оцените, может ли ваш ребенок называть предметы на возрастающих уровнях сложности: от называния любимых вещей до спонтанного обозначения повседневных предметов.',
      'Этот раздел продвигается от простого называния предпочитаемых предметов к обозначению нейтральных предметов и спонтанному называнию без подсказок.',
    ],
    fullExplanation:
      'Раздел Такт оценивает способность ребенка называть — обозначать предметы в своем окружении. В терминологии ABA «такт» - это вербальная реакция, контролируемая невербальным стимулом: ребенок видит собаку и говорит «собака», видит маму и говорит «мама». В отличие от просьбы (манд), такт определяется не желанием получить предмет, а контактом с ним.\n\n5 критериев проходят через:\n\n- Размер репертуара: от 2 предметов (уровень 1) до 10 предметов из разных категорий (уровень 5).\n\n- Сложность: от называния любимых предметов (уровни 1-2) к обычным повседневным предметам (уровень 3), что сложнее, поскольку мотивация ребенка ниже.\n\n- Самостоятельность: от называния по запросу при прямом тестировании (уровни 1-3, 5) к спонтанному называнию без подсказок (уровень 4).\n\nБольшинство критериев используют прямое тестирование (TestTrial) - вы показываете ребенку предмет и спрашиваете «Что это?». Уровень 4 использует наблюдение по времени (TimedObservation) - вы наблюдаете за спонтанным называнием в течение 60 минут.',
  },
}

const PLACEHOLDER_INTRODUCTIONS_EN: Record<string, SectionIntroduction> = {
  'listener-responding': {
    sectionId: 'listener-responding',
    shortBullets: [
      'Listener responding measures whether your child understands and follows spoken language.',
      'This section assesses skills like looking at named objects, following simple instructions, and selecting items when asked.',
    ],
    fullExplanation: 'This section is coming soon and is not yet available for assessment.',
  },
  'visual-perceptual': {
    sectionId: 'visual-perceptual',
    shortBullets: [
      'Visual perceptual skills involve matching, sorting, and recognizing visual patterns.',
      'This section assesses whether your child can match identical objects, sort by category, and complete simple puzzles.',
    ],
    fullExplanation: 'This section is coming soon and is not yet available for assessment.',
  },
  'independent-play': {
    sectionId: 'independent-play',
    shortBullets: [
      'Independent play measures how your child explores toys and activities on their own.',
      'This section assesses functional play, sustained attention, and appropriate use of toys without adult direction.',
    ],
    fullExplanation: 'This section is coming soon and is not yet available for assessment.',
  },
  'social-behaviour': {
    sectionId: 'social-behaviour',
    shortBullets: [
      'Social behaviour assesses how your child interacts with other people.',
      'This section looks at eye contact, joint attention, turn-taking, and social play with peers.',
    ],
    fullExplanation: 'This section is coming soon and is not yet available for assessment.',
  },
  'motor-imitation': {
    sectionId: 'motor-imitation',
    shortBullets: [
      'Motor imitation measures whether your child can copy physical movements.',
      'This section assesses copying gestures, body movements, and actions with objects.',
    ],
    fullExplanation: 'This section is coming soon and is not yet available for assessment.',
  },
  'echoic': {
    sectionId: 'echoic',
    shortBullets: [
      'Echoic skills measure whether your child can repeat sounds and words.',
      'This section assesses vocal imitation from single sounds to multi-word phrases.',
    ],
    fullExplanation: 'This section is coming soon and is not yet available for assessment.',
  },
  'spontaneous-vocal': {
    sectionId: 'spontaneous-vocal',
    shortBullets: [
      'Spontaneous vocal behaviour measures the sounds your child produces on their own.',
      'This section assesses babbling, sound variety, and spontaneous word approximations.',
    ],
    fullExplanation: 'This section is coming soon and is not yet available for assessment.',
  },
}

const PLACEHOLDER_INTRODUCTIONS_RU: Record<string, SectionIntroduction> = {
  'listener-responding': {
    sectionId: 'listener-responding',
    shortBullets: [
      'Реакция слушателя измеряет, понимает ли ребенок устную речь и следует ли указаниям.',
      'Этот раздел оценивает навыки: смотреть на названные предметы, выполнять простые инструкции, выбирать предметы по просьбе.',
    ],
    fullExplanation: 'Этот раздел скоро появится и пока недоступен для оценки.',
  },
  'visual-perceptual': {
    sectionId: 'visual-perceptual',
    shortBullets: [
      'Навыки визуального восприятия включают сопоставление, сортировку и распознавание зрительных паттернов.',
      'Этот раздел оценивает, может ли ребенок сопоставлять одинаковые предметы, сортировать по категориям и собирать простые пазлы.',
    ],
    fullExplanation: 'Этот раздел скоро появится и пока недоступен для оценки.',
  },
  'independent-play': {
    sectionId: 'independent-play',
    shortBullets: [
      'Самостоятельная игра измеряет, как ребенок исследует игрушки и занятия без помощи.',
      'Этот раздел оценивает функциональную игру, устойчивое внимание и правильное использование игрушек без руководства взрослого.',
    ],
    fullExplanation: 'Этот раздел скоро появится и пока недоступен для оценки.',
  },
  'social-behaviour': {
    sectionId: 'social-behaviour',
    shortBullets: [
      'Социальное поведение оценивает, как ребенок взаимодействует с другими людьми.',
      'Этот раздел рассматривает зрительный контакт, совместное внимание, очередность и социальную игру со сверстниками.',
    ],
    fullExplanation: 'Этот раздел скоро появится и пока недоступен для оценки.',
  },
  'motor-imitation': {
    sectionId: 'motor-imitation',
    shortBullets: [
      'Моторная имитация измеряет, может ли ребенок копировать физические движения.',
      'Этот раздел оценивает копирование жестов, движений тела и действий с предметами.',
    ],
    fullExplanation: 'Этот раздел скоро появится и пока недоступен для оценки.',
  },
  'echoic': {
    sectionId: 'echoic',
    shortBullets: [
      'Эхоические навыки измеряют, может ли ребенок повторять звуки и слова.',
      'Этот раздел оценивает голосовую имитацию от отдельных звуков до многословных фраз.',
    ],
    fullExplanation: 'Этот раздел скоро появится и пока недоступен для оценки.',
  },
  'spontaneous-vocal': {
    sectionId: 'spontaneous-vocal',
    shortBullets: [
      'Спонтанное вокальное поведение измеряет звуки, которые ребенок производит самостоятельно.',
      'Этот раздел оценивает лепет, разнообразие звуков и спонтанные приближения к словам.',
    ],
    fullExplanation: 'Этот раздел скоро появится и пока недоступен для оценки.',
  },
}

export const INTRODUCTIONS_BY_LANGUAGE: Record<Language, Record<string, SectionIntroduction>> = {
  en: { ...INTRODUCTIONS_EN, ...PLACEHOLDER_INTRODUCTIONS_EN },
  ru: { ...INTRODUCTIONS_RU, ...PLACEHOLDER_INTRODUCTIONS_RU },
}
