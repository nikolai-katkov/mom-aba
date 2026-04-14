import type { TrainingContent } from '../../types'
import type { Language } from '../types'

const TRAINING_EN: Record<string, TrainingContent> = {
  'mand-1': {
    levelId: 'mand-1',
    shortGuide: [
      {
        stepNumber: 1,
        instruction: 'Choose two items that might interest your child.',
      },
      {
        stepNumber: 2,
        instruction:
          'Hold the item where your child can see it but cannot reach it. For example, place it in a clear container the child cannot open on their own.',
      },
      {
        stepNumber: 3,
        instruction:
          'Say the name of the item clearly (e.g., "cookie") and wait for your child to repeat or gesture.',
      },
      {
        stepNumber: 4,
        instruction:
          'As soon as your child makes any attempt to request (word, gesture, or card), give the item immediately and praise them.',
      },
    ],
    fullGuide:
      'At this stage, prompts are allowed and expected. You can say the word for the child to repeat, model a gesture, or show a PECS card for the child to hand to you. The goal is simply to establish that communication leads to getting desired items. Practice during natural moments when your child wants something — mealtimes, play, getting dressed. Keep sessions short (5-10 minutes) and always end on a success. If your child does not respond after 3-5 seconds, provide the prompt again. Gradually reduce the intensity of your prompt over time as the child becomes more independent.',
    commonMistakes: [
      'Giving the item before the child makes any communicative attempt',
      'Using physical prompts (hand-over-hand) when non-physical prompts would work',
      'Practicing only during structured sessions instead of natural moments',
      'Waiting too long to deliver the item after a successful request',
    ],
    practicePrompt: {
      brief: 'Can your child ask for this?',
      detail:
        'Show the item and wait. Any attempt to request counts: a word, gesture, or reaching.',
    },
  },
  'mand-2': {
    levelId: 'mand-2',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Identify 4 items or activities your child enjoys and is motivated to request.',
      },
      {
        stepNumber: 2,
        instruction:
          'Create opportunities throughout the day where the child needs to request (e.g., place snack in a closed container).',
      },
      {
        stepNumber: 3,
        instruction:
          'Wait for the child to initiate the request without prompting. Do not ask "What do you want?"',
      },
      {
        stepNumber: 4,
        instruction:
          'Immediately deliver the item and give specific praise (e.g., "Great job saying ball!").',
      },
    ],
    fullGuide:
      'The key difference at this level is independence - the child should request without being prompted. This does not mean you cannot set up the environment to encourage requests. Strategies include: placing desired items in sight but out of reach, giving small portions so the child needs to ask for more, starting a favorite activity and then pausing until the child requests continuation. The object being visible is acceptable - what matters is that the child initiates communication on their own. Track each unique request to confirm you have at least 4 different ones. Common items that work well: favorite snacks, specific toys, activities like swinging or being tickled, and media like songs or videos.',
    commonMistakes: [
      'Asking "What do you want?" which counts as a prompt',
      'Not creating enough opportunities for the child to need to request',
      'Counting the same request multiple times instead of tracking unique requests',
      'Expecting full sentences - single words or clear gestures count',
    ],
    practicePrompt: {
      brief: 'Will your child ask for this on their own?',
      detail:
        'Do not prompt or ask "What do you want?" Wait for the child to initiate the request independently.',
    },
  },
  'mand-3': {
    levelId: 'mand-3',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Practice requesting with a second caregiver (e.g., the other parent, a grandparent, or a sibling).',
      },
      {
        stepNumber: 2,
        instruction:
          'Try requesting activities in a new environment (e.g., at the park, in the car, at a store).',
      },
      {
        stepNumber: 3,
        instruction:
          'Vary the items available so the child requests different types of things (food, toys, activities).',
      },
      {
        stepNumber: 4,
        instruction: 'Praise and reinforce successful requests in each new context.',
      },
    ],
    fullGuide:
      'Generalization means the child can use requesting skills flexibly - not just with one person in one place for one thing. To build this, systematically vary three dimensions: people (practice with mom, dad, grandparents, siblings, therapists), environments (home, park, store, car, classroom), and reinforcement types (food, toys, activities, social attention). Start by changing one dimension at a time. For example, if the child reliably requests with mom at home, first try with dad at home (new person, same place), then with mom at the park (same person, new place). Only change multiple dimensions once the child is comfortable with single changes. Keep a log of successful requests noting who, where, and what to track the 6 different combinations needed.',
    commonMistakes: [
      'Practicing only at home with the same caregiver',
      'Changing too many variables at once (new person AND new place AND new items)',
      'Not keeping track of which combinations have been achieved',
      'Giving up if the child struggles in a new setting instead of helping and trying again',
    ],
    practicePrompt: {
      brief: 'Can your child request this in a new situation?',
      detail:
        'Try with a different person, in a different place, or for a different type of item than usual.',
    },
  },
  'mand-4': {
    levelId: 'mand-4',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Set up a 60-minute observation period during a natural routine (e.g., playtime, mealtime).',
      },
      {
        stepNumber: 2,
        instruction:
          'Ensure motivating items and activities are accessible but require the child to request them.',
      },
      {
        stepNumber: 3,
        instruction: 'Do not prompt or suggest items. Let the child initiate all communication.',
      },
      {
        stepNumber: 4,
        instruction: 'Record each spontaneous request. Aim for at least 5 within the hour.',
      },
    ],
    fullGuide:
      'Spontaneous requesting means the child communicates a want entirely on their own initiative - no verbal cues, no questions, no gestures from you to prompt them. To build this skill, engineer the environment to be rich with opportunities: have favorite items visible but slightly out of reach, start activities that naturally pause (e.g., a wind-up toy that stops), offer small amounts of preferred snacks so the child needs more, or play interactive games where the child needs to request "again" or "more." During the observation period, stay nearby and engaged but avoid directing the interaction. If the child makes a request, fulfill it promptly. The 60-minute window does not need to be continuous - you can observe across a natural routine. Track each request with the time and what was requested.',
    commonMistakes: [
      'Inadvertently prompting by looking at items or gesturing',
      'Choosing an observation time when the child is not motivated (e.g., right after a meal)',
      'Not having enough motivating items available in the environment',
      'Counting echoic responses (child repeating something you said) as spontaneous',
    ],
    practicePrompt: {
      brief: 'Did your child spontaneously ask for this?',
      detail:
        'No prompts, no questions from you. The child should initiate communication entirely on their own.',
    },
  },
  'mand-5': {
    levelId: 'mand-5',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Make a list of all items and activities your child currently requests independently.',
      },
      {
        stepNumber: 2,
        instruction:
          'Identify gaps - what motivating items has the child not yet learned to request?',
      },
      {
        stepNumber: 3,
        instruction:
          'Introduce new items one at a time, using prompts initially and fading them over several days.',
      },
      {
        stepNumber: 4,
        instruction: 'Once the child independently requests 10 different items, assess again.',
      },
    ],
    fullGuide:
      "Building a repertoire of 10 independent mands requires systematically expanding beyond the child's current set of requests. Start by listing every item or activity the child currently requests without prompts. Then identify motivating items the child enjoys but does not yet ask for. Introduce these one at a time: first, use a word or gesture, then gradually fade the prompt across sessions until the child requests independently. Good categories to expand into: foods (apple, juice, cracker), toys (ball, car, blocks), activities (swing, tickle, music), and social actions (up, open, help). Keep a running tally — you need 10 distinct, independent requests. The child should initiate these requests on their own across natural opportunities.",
    commonMistakes: [
      'Counting prompted requests as independent',
      'Teaching too many new words at once instead of one at a time',
      'Not fading prompts gradually (going from full prompt to no prompt too quickly)',
      'Only counting requests made during structured teaching rather than throughout the day',
    ],
    practicePrompt: {
      brief: 'Can your child request this independently?',
      detail:
        'The child should say the word without any prompts. Count each unique item they can ask for.',
    },
  },
  'tact-1': {
    levelId: 'tact-1',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Choose 2 items your child loves and can already request (e.g., a favorite toy, a family member).',
      },
      {
        stepNumber: 2,
        instruction: 'Hold up the item and ask "What is this?" in a clear, enthusiastic voice.',
      },
      {
        stepNumber: 3,
        instruction:
          'If your child does not answer, say the name yourself (e.g., "ball!") and wait for them to repeat it.',
      },
      {
        stepNumber: 4,
        instruction:
          'When your child says the name, give enthusiastic praise and a small reward. Repeat with the second item.',
      },
    ],
    fullGuide:
      'Start with items your child already requests (mands), since these words are already in their vocabulary. The idea is to transfer from requesting to labeling: after the child asks for the ball and gets it, hold it up and ask "What is this?" The child already knows the word, so the leap to labeling is small. Use real objects first, not pictures. Keep sessions short (5-10 minutes) and playful. If the child does not respond after a few seconds, provide the word as a prompt and let them echo it. Gradually wait a bit longer before prompting, giving the child more time to answer independently. Practice in natural moments: during play, at mealtimes, while getting dressed. The goal is 2 different objects the child can name when shown.',
    commonMistakes: [
      'Using only flashcards or pictures instead of real, familiar objects',
      'Saying the answer too quickly without giving the child time to respond',
      'Practicing only during structured sessions rather than natural moments',
      'Choosing items the child has never seen before instead of familiar favorites',
    ],
    practicePrompt: {
      brief: 'Can your child name this?',
      detail:
        'Show the item and ask "What is this?" If needed, say the word and let your child repeat it.',
    },
  },
  'tact-2': {
    levelId: 'tact-2',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Pick 4 items your child knows well: mix favorites (teddy bear, mom) with familiar everyday things (cup, shoe).',
      },
      {
        stepNumber: 2,
        instruction:
          'Show one item at a time and ask "What is this?" Wait 3-5 seconds for a response.',
      },
      {
        stepNumber: 3,
        instruction:
          'If the child needs help, say just the first sound of the word (e.g., "b..." for ball) instead of the full word.',
      },
      {
        stepNumber: 4,
        instruction:
          'Praise correct answers warmly. Alternate between items the child knows well and newer ones.',
      },
    ],
    fullGuide:
      'At this level, you are expanding from 2 to 4 labels. The strategy is to build one new label at a time alongside items the child already names confidently. Start each session with a known item to build confidence, then introduce the new one. Fade your prompts gradually: begin by saying the full word for the child to echo, then give only the first sound, then wait silently. This prompt-fading sequence (full word, first sound, independent) is key. Mix people, animals, and characters to keep it interesting. If the child struggles with a new item, pair it with the real object during play so the connection between word and thing becomes natural. Track which 4 labels your child can produce independently.',
    commonMistakes: [
      'Trying to teach all 4 new labels at once instead of adding one at a time',
      'Not fading prompts gradually (jumping from full prompt to no prompt)',
      'Testing only with pictures when the child learns better with real objects',
      "Skipping practice with already-known items, which reduces the child's confidence",
    ],
    practicePrompt: {
      brief: 'Can your child label this on their own?',
      detail: 'Show the item and wait. If the child needs help, try giving just the first sound.',
    },
  },
  'tact-3': {
    levelId: 'tact-3',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Gather 6 everyday objects the child is not especially interested in (e.g., shoe, hat, spoon, cup, chair, book).',
      },
      {
        stepNumber: 2,
        instruction:
          'Use a reward system: give a token (sticker, chip) for each correct label. Collect tokens to earn a favorite item.',
      },
      {
        stepNumber: 3,
        instruction:
          'After each correct label, briefly distract the child (clap, sing a line), then ask about the same object again.',
      },
      {
        stepNumber: 4,
        instruction:
          'Give 1 token for saying just the word, and 2 tokens for saying "This is a [word]" to encourage fuller answers.',
      },
    ],
    fullGuide:
      'This level is harder because the child needs to label objects they do not particularly want. Without natural motivation, you need an external reward system. Set up a token board: the child earns tokens (stickers, chips, stars) for each correct label and exchanges them for a favorite item or activity after a set number. Award 1 token for a single word ("spoon") and 2 tokens for a phrase ("This is a spoon") to encourage more complete language. Use the distraction method between trials: show the object, get the answer, give the token and praise, do a brief fun distraction (clap hands, sing a short line), then ask about the same object again. The child should answer correctly 3 times after distractions before the word is considered learned. Practice with real household objects the child encounters daily.',
    commonMistakes: [
      'Skipping non-preferred items and only practicing with things the child likes',
      'Not using a token reward system, leading to low motivation for everyday objects',
      'Moving on to new words before the child can consistently name the current ones after distractions',
      'Forgetting to make the reward exchange motivating enough (tokens should lead to something the child really wants)',
    ],
    practicePrompt: {
      brief: 'Can your child name this everyday object?',
      detail: 'Use the token system: 1 token for the word, 2 tokens for "This is a [word]."',
    },
  },
  'tact-4': {
    levelId: 'tact-4',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Set up a 60-minute observation during a natural routine (play, walk, mealtime).',
      },
      {
        stepNumber: 2,
        instruction:
          'Fill the environment with interesting, labelable objects but do not point at or name anything yourself.',
      },
      {
        stepNumber: 3,
        instruction:
          'When your child spontaneously names something on their own, respond with enthusiastic praise.',
      },
      {
        stepNumber: 4,
        instruction:
          'Note each spontaneous label with the time. The goal is at least 2 within the hour.',
      },
    ],
    fullGuide:
      'Spontaneous labeling means the child names things entirely on their own initiative, without you asking "What is this?" or pointing at objects. To build this skill, create an environment rich with things to notice: bring out new toys, take a walk in an interesting place, look at a picture book together without directing the conversation. The key is to be present and responsive without prompting. When the child says "dog!" while pointing at a dog, give warm, enthusiastic praise: "Yes, that is a dog! Great noticing!" This differential reinforcement teaches the child that naming things on their own gets an especially good reaction. During the 60-minute window, stay engaged but let the child lead. The observation does not need to be one continuous block; you can spread it across a natural routine. Record each spontaneous label with the time and context.',
    commonMistakes: [
      'Inadvertently prompting by pointing at objects or looking at them expectantly',
      'Choosing an observation time when the child is tired, hungry, or not engaged',
      'Not having enough interesting objects or scenery to spark spontaneous labeling',
      'Counting labels that came after you asked a question or named something first',
    ],
    practicePrompt: {
      brief: 'Did your child name this spontaneously?',
      detail:
        'Do not ask "What is this?" The child should label things entirely on their own initiative.',
    },
  },
  'tact-5': {
    levelId: 'tact-5',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'List all objects your child can currently label. Identify which categories are missing (household items, body parts, pictures).',
      },
      {
        stepNumber: 2,
        instruction:
          'Introduce new words one category at a time, starting with simple, familiar items from each category.',
      },
      {
        stepNumber: 3,
        instruction:
          'Check mastery: the child should label the item correctly for 3 days in a row without any help.',
      },
      {
        stepNumber: 4,
        instruction:
          'Keep a running count. Once the child can independently label 10 different objects, reassess.',
      },
    ],
    fullGuide:
      'Building a repertoire of 10 labels requires systematic vocabulary expansion across categories. Start by listing every object your child currently names without help. Then identify gaps: can they name household items (cup, chair)? People (mom, dad)? Body parts (nose, hand)? Pictures in books? Introduce new words one at a time from underrepresented categories. Use the token system from Level 3 for less motivating items. For each new word, check mastery by testing it without any prompts for 3 consecutive days. If the child gets it right all 3 days, the word is learned. If not, continue practicing. Rotate between review of known words and introduction of new ones. Start with simple words from each category: short, common words the child encounters daily and can pronounce easily. Track your cumulative count to reach 10 distinct, independently labeled objects.',
    commonMistakes: [
      'Teaching too many new words at once instead of one at a time',
      'Not checking mastery before counting a word as learned (3 consecutive days without help)',
      'Focusing on only one category instead of spreading across household items, people, body parts, and pictures',
      'Counting labels that still require a prompt as independent',
    ],
    practicePrompt: {
      brief: 'Can your child label this without help?',
      detail:
        'No prompts at all. The child should name the item independently for 3 days in a row.',
    },
  },
}

const TRAINING_RU: Record<string, TrainingContent> = {
  'mand-1': {
    levelId: 'mand-1',
    shortGuide: [
      {
        stepNumber: 1,
        instruction: 'Выберите два предмета, которые могут заинтересовать вашего ребенка.',
      },
      {
        stepNumber: 2,
        instruction:
          'Держите предмет так, чтобы ребенок его видел, но не мог достать. Например, поместите его в прозрачный контейнер так, чтобы ребенок не смог сам его открыть.',
      },
      {
        stepNumber: 3,
        instruction:
          'Четко произнесите название предмета (например, «печенье») и подождите, пока ребенок не повторит или не покажет жестом.',
      },
      {
        stepNumber: 4,
        instruction:
          'Как только ребенок попытается попросить (словом, жестом или карточкой), сразу дайте предмет и похвалите.',
      },
    ],
    fullGuide:
      'На этом этапе подсказки допустимы и ожидаемы. Можно произнести слово, чтобы ребенок повторил, имитационные подсказки (показать жест) или показать карточку PECS, чтобы ребенок передал ее вам. Цель — просто установить связь: коммуникация ведет к получению желаемого. Практикуйте в естественные моменты, когда ребенок чего-то хочет: во время еды, игры, одевания. Занятия должны быть короткими (5-10 минут) и всегда заканчиваться успехом. Если ребенок не реагирует через 3-5 секунд, повторите подсказку. Постепенно снижайте интенсивность подсказки по мере роста самостоятельности ребенка.',
    commonMistakes: [
      'Давать предмет до того, как ребенок попытался попросить',
      'Использовать физические подсказки (рука в руке), когда достаточно невербальных',
      'Практиковать только во время занятий, а не в естественных ситуациях',
      'Слишком долго ждать с выдачей предмета после успешной просьбы',
    ],
    practicePrompt: {
      brief: 'Может ли ребёнок попросить это?',
      detail:
        'Покажите предмет и подождите. Любая попытка попросить считается: слово, жест или тянуться рукой.',
    },
  },
  'mand-2': {
    levelId: 'mand-2',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Определите 4 предмета или занятия, которые ребенок любит и будет мотивирован попросить.',
      },
      {
        stepNumber: 2,
        instruction:
          'Создавайте ситуации в течение дня, когда ребенку нужно попросить (например, положите перекус в закрытый контейнер).',
      },
      {
        stepNumber: 3,
        instruction: 'Ждите, пока ребенок сам инициирует просьбу. Не спрашивайте «Что ты хочешь?».',
      },
      {
        stepNumber: 4,
        instruction:
          'Сразу дайте предмет и конкретно похвалите (например, «Молодец, что сказал мяч!»).',
      },
    ],
    fullGuide:
      'Ключевое отличие на этом уровне - самостоятельность: ребенок должен просить без подсказок. Это не значит, что нельзя организовать среду так, чтобы стимулировать просьбы. Стратегии: располагайте желаемые предметы в поле зрения, но вне досягаемости; давайте маленькие порции, чтобы ребенку нужно было попросить еще; начинайте любимое занятие и делайте паузу, пока ребенок не попросит продолжить. Предмет может быть виден - важно, чтобы ребенок сам инициировал коммуникацию. Отмечайте каждую уникальную просьбу, чтобы убедиться, что их минимум 4 разных. Хорошо работают: любимые перекусы, конкретные игрушки, занятия вроде качания или щекотки, и медиа вроде песен или видео.',
    commonMistakes: [
      'Спрашивать «Что ты хочешь?» - это считается подсказкой',
      'Не создавать достаточно ситуаций, когда ребенку нужно попросить',
      'Считать одну и ту же просьбу несколько раз вместо отслеживания уникальных',
      'Ожидать полные предложения - отдельные слова или четкие жесты тоже считаются',
    ],
    practicePrompt: {
      brief: 'Попросит ли ребёнок это сам?',
      detail:
        'Не подсказывайте и не спрашивайте «Что ты хочешь?». Подождите, пока ребёнок сам инициирует просьбу.',
    },
  },
  'mand-3': {
    levelId: 'mand-3',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Практикуйте просьбы со вторым взрослым (другой родитель, бабушка/дедушка или старший ребенок).',
      },
      {
        stepNumber: 2,
        instruction: 'Попробуйте просьбы в новой обстановке (на площадке, в машине, в магазине).',
      },
      {
        stepNumber: 3,
        instruction:
          'Меняйте доступные предметы, чтобы ребенок просил разные вещи (еда, игрушки, занятия).',
      },
      {
        stepNumber: 4,
        instruction: 'Хвалите и подкрепляйте успешные просьбы в каждом новом контексте.',
      },
    ],
    fullGuide:
      'Обобщение означает, что ребенок может использовать навыки просьбы гибко - не только с одним человеком в одном месте для одной вещи. Для этого систематически варьируйте три измерения: людей (практика с мамой, папой, бабушками, братьями/сестрами, терапистами), среды (дом, площадка, магазин, машина, класс) и виды подкрепления (еда, игрушки, занятия, социальное внимание). Начинайте с изменения одного измерения за раз. Например, если ребенок уверенно просит с мамой дома, сначала попробуйте с папой дома (новый человек, то же место), потом с мамой на площадке (тот же человек, новое место). Меняйте несколько измерений одновременно только когда ребенок освоится с одиночными изменениями. Ведите журнал успешных просьб: кто, где, что - чтобы отслеживать нужные 6 комбинаций.',
    commonMistakes: [
      'Практиковать только дома с одним и тем же взрослым',
      'Менять слишком много переменных сразу (новый человек И новое место И новые предметы)',
      'Не отслеживать, какие комбинации уже достигнуты',
      'Сдаваться, если ребенок затрудняется в новой обстановке, вместо того чтобы помочь и попробовать снова',
    ],
    practicePrompt: {
      brief: 'Может ли ребёнок попросить это в новой ситуации?',
      detail:
        'Попробуйте с другим человеком, в другом месте или с другим типом предмета, чем обычно.',
    },
  },
  'mand-4': {
    levelId: 'mand-4',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Организуйте 60-минутный период наблюдения во время привычного распорядка (игра, еда).',
      },
      {
        stepNumber: 2,
        instruction:
          'Обеспечьте доступ к мотивирующим предметам и занятиям, но так, чтобы ребенку нужно было попросить.',
      },
      {
        stepNumber: 3,
        instruction:
          'Не подсказывайте и не предлагайте предметы. Пусть ребенок сам инициирует общение.',
      },
      {
        stepNumber: 4,
        instruction: 'Записывайте каждую спонтанную просьбу. Цель - минимум 5 за час.',
      },
    ],
    fullGuide:
      'Спонтанная просьба означает, что ребенок сообщает о желании полностью по своей инициативе - без вербальных подсказок, вопросов, жестов с вашей стороны. Для развития этого навыка создайте среду, богатую возможностями: расположите любимые предметы на виду, но чуть вне досягаемости; начинайте занятия, которые естественно останавливаются (заводная игрушка останавливается); давайте небольшие порции любимого перекуса, чтобы ребенку нужно было попросить еще; играйте в интерактивные игры, где ребенку нужно попросить «еще» или «снова». Во время наблюдения будьте рядом и вовлечены, но не направляйте взаимодействие. Если ребенок просит - выполняйте просьбу быстро. 60-минутное окно не обязательно должно быть непрерывным - можно наблюдать в течение привычного распорядка. Записывайте каждую просьбу с временем и содержанием.',
    commonMistakes: [
      'Невольно подсказывать взглядом на предметы или жестами',
      'Выбирать время наблюдения, когда ребенок не мотивирован (например, сразу после еды)',
      'Недостаточно мотивирующих предметов в окружении',
      'Считать эхоические ответы (повторение за вами) спонтанными',
    ],
    practicePrompt: {
      brief: 'Ребёнок спонтанно попросил это?',
      detail:
        'Никаких подсказок, никаких вопросов от вас. Ребёнок должен начать общение полностью сам.',
    },
  },
  'mand-5': {
    levelId: 'mand-5',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Составьте список всех предметов и занятий, которые ребенок уже просит самостоятельно.',
      },
      {
        stepNumber: 2,
        instruction:
          'Определите пробелы: какие мотивирующие предметы ребенок еще не научился просить?',
      },
      {
        stepNumber: 3,
        instruction:
          'Вводите новые предметы по одному: сначала с подсказкой, постепенно убирая ее за несколько дней.',
      },
      {
        stepNumber: 4,
        instruction:
          'Когда ребенок самостоятельно просит 10 разных предметов, проведите повторную оценку.',
      },
    ],
    fullGuide:
      'Формирование репертуара из 10 самостоятельных просьб требует систематического расширения за пределы текущего набора. Начните со списка всех предметов и занятий, которые ребенок уже просит без подсказок. Затем определите мотивирующие предметы, которые ребенок любит, но еще не просит. Вводите их по одному: сначала используйте слово или жест, а затем постепенно убирайте подсказку в течение нескольких занятий, пока ребенок не начнет просить самостоятельно. Хорошие категории для расширения: еда (яблоко, сок, крекер), игрушки (мяч, машинка, кубики), занятия (качели, щекотка, музыка) и социальные действия (вверх, открой, помоги). Ведите подсчет — нужно 10 различных самостоятельных просьб. Ребенок должен инициировать просьбы сам в естественных ситуациях.',
    commonMistakes: [
      'Считать просьбы с подсказкой самостоятельными',
      'Учить слишком много новых слов одновременно вместо одного за раз',
      'Не убирать подсказки постепенно (слишком резкий переход от полной подсказки к отсутствию)',
      'Считать только просьбы на занятиях, а не в течение всего дня',
    ],
    practicePrompt: {
      brief: 'Может ли ребёнок попросить это самостоятельно?',
      detail:
        'Ребёнок должен произнести слово без подсказок. Считайте каждый уникальный предмет, который он может попросить.',
    },
  },
  'tact-1': {
    levelId: 'tact-1',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Выберите 2 предмета, которые ребенок любит и уже умеет просить (любимая игрушка, член семьи).',
      },
      {
        stepNumber: 2,
        instruction: 'Покажите предмет и спросите «Что это?» четким, заинтересованным голосом.',
      },
      {
        stepNumber: 3,
        instruction:
          'Если ребенок не отвечает, назовите предмет сами (например, «мяч!») и подождите, пока повторит.',
      },
      {
        stepNumber: 4,
        instruction:
          'Когда ребенок назовет предмет, похвалите с энтузиазмом и дайте маленькую награду. Повторите со вторым предметом.',
      },
    ],
    fullGuide:
      'Начинайте с предметов, которые ребенок уже умеет просить (манд), поскольку эти слова уже есть в его словаре. Идея в том, чтобы перенести навык с просьбы на называние: после того как ребенок попросил мяч и получил его, покажите его и спросите «Что это?». Ребенок уже знает слово, поэтому переход к называнию небольшой. Используйте сначала реальные предметы, а не картинки. Занятия должны быть короткими (5-10 минут) и игровыми. Если ребенок не реагирует через несколько секунд, произнесите слово как подсказку, чтобы он повторил. Постепенно увеличивайте паузу перед подсказкой, давая ребенку больше времени ответить самостоятельно. Практикуйте в естественные моменты: во время игры, еды, одевания. Цель — 2 предмета, которые ребенок может назвать при показе.',
    commonMistakes: [
      'Использовать только карточки вместо реальных знакомых предметов',
      'Произносить ответ слишком быстро, не давая ребенку времени подумать',
      'Практиковать только на занятиях, а не в естественных ситуациях',
      'Выбирать предметы, которые ребенок никогда не видел, вместо знакомых любимых',
    ],
    practicePrompt: {
      brief: 'Может ли ребёнок назвать это?',
      detail:
        'Покажите предмет и спросите «Что это?». Если нужно, назовите сами и дайте ребёнку повторить.',
    },
  },
  'tact-2': {
    levelId: 'tact-2',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Подберите 4 предмета, которые ребенок хорошо знает: сочетайте любимые (мишка, мама) с привычными повседневными (чашка, ботинок).',
      },
      {
        stepNumber: 2,
        instruction: 'Показывайте по одному предмету и спрашивайте «Что это?». Ждите 3-5 секунд.',
      },
      {
        stepNumber: 3,
        instruction:
          'Если ребенку нужна помощь, произнесите только первый звук слова (например, «м...» для мяч) вместо целого слова.',
      },
      {
        stepNumber: 4,
        instruction: 'Хвалите правильные ответы. Чередуйте знакомые предметы с новыми.',
      },
    ],
    fullGuide:
      'На этом уровне вы расширяете набор с 2 до 4 названий. Стратегия — добавлять по одному новому слову рядом с теми, которые ребенок уже уверенно называет. Начинайте каждое занятие с известного предмета для уверенности, затем вводите новый. Постепенно убирайте подсказки: сначала произносите полное слово для повторения, затем только первый звук, затем ждите молча. Эта последовательность (полное слово, первый звук, самостоятельно) — ключевая. Чередуйте людей, животных и персонажей, чтобы было интересно. Если ребенок затрудняется с новым предметом, используйте его во время игры, чтобы связь между словом и вещью стала естественной. Отслеживайте, какие 4 названия ребенок может произнести самостоятельно.',
    commonMistakes: [
      'Пытаться обучить всем 4 новым словам сразу, а не по одному',
      'Не убирать подсказки постепенно (резкий переход от полной подсказки к отсутствию)',
      'Тестировать только по картинкам, когда ребенок лучше учится с реальными предметами',
      'Пропускать практику с уже известными предметами, что снижает уверенность ребенка',
    ],
    practicePrompt: {
      brief: 'Может ли ребёнок назвать это сам?',
      detail:
        'Покажите предмет и подождите. Если нужна помощь, попробуйте дать только первый звук.',
    },
  },
  'tact-3': {
    levelId: 'tact-3',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Соберите 6 повседневных предметов, которые не особо интересны ребенку (ботинок, шапка, ложка, чашка, стул, книга).',
      },
      {
        stepNumber: 2,
        instruction:
          'Используйте систему наград: давайте жетон (наклейку, фишку) за каждое правильное название. Жетоны обмениваются на любимую вещь.',
      },
      {
        stepNumber: 3,
        instruction:
          'После правильного ответа ненадолго отвлеките ребенка (хлопните в ладоши, спойте строчку), затем снова спросите про тот же предмет.',
      },
      {
        stepNumber: 4,
        instruction:
          'Давайте 1 жетон за слово и 2 жетона за «Это [слово]», поощряя более полные ответы.',
      },
    ],
    fullGuide:
      'Этот уровень сложнее, потому что ребенку нужно называть предметы, которые он не особенно хочет. Без естественной мотивации нужна внешняя система подкрепления. Сделайте жетонную доску: ребенок получает жетоны (наклейки, фишки, звездочки) за каждое правильное название и обменивает их на любимый предмет или занятие. Давайте 1 жетон за одно слово («ложка») и 2 жетона за фразу («Это ложка»), поощряя более полную речь. Используйте метод отвлечения между пробами: покажите предмет, получите ответ, дайте жетон и похвалите, проведите короткое отвлечение (хлопните в ладоши, спойте строчку), затем снова спросите про тот же предмет. Ребенок должен правильно ответить 3 раза после отвлечений, прежде чем слово считается усвоенным. Практикуйте с реальными бытовыми предметами, которые ребенок встречает каждый день.',
    commonMistakes: [
      'Пропускать непривлекательные предметы и практиковать только с тем, что нравится ребенку',
      'Не использовать систему жетонов, что ведет к низкой мотивации для повседневных предметов',
      'Переходить к новым словам до того, как ребенок уверенно называет текущие после отвлечений',
      'Не делать обмен жетонов достаточно мотивирующим (жетоны должны вести к чему-то, что ребенок действительно хочет)',
    ],
    practicePrompt: {
      brief: 'Может ли ребёнок назвать этот обычный предмет?',
      detail: 'Используйте жетоны: 1 жетон за слово, 2 жетона за «Это [слово]».',
    },
  },
  'tact-4': {
    levelId: 'tact-4',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Организуйте 60-минутное наблюдение во время привычного распорядка (игра, прогулка, еда).',
      },
      {
        stepNumber: 2,
        instruction:
          'Наполните окружение интересными предметами, но не показывайте на них и не называйте ничего сами.',
      },
      {
        stepNumber: 3,
        instruction: 'Когда ребенок спонтанно называет что-то сам, отреагируйте с энтузиазмом.',
      },
      {
        stepNumber: 4,
        instruction: 'Записывайте каждое спонтанное название с временем. Цель — минимум 2 за час.',
      },
    ],
    fullGuide:
      'Спонтанное называние означает, что ребенок называет вещи полностью по собственной инициативе, без вопроса «Что это?» или указывания на предметы. Для развития этого навыка создайте среду, богатую вещами, которые можно заметить: достаньте новые игрушки, сходите на прогулку в интересное место, рассматривайте книжку с картинками вместе, не направляя разговор. Ключ — быть рядом и отзывчивым, но не подсказывать. Когда ребенок говорит «собака!», показывая на собаку, дайте теплую, восторженную похвалу: «Да, это собака! Отлично заметил!». Такое подкрепление учит ребенка, что называние вещей по своей инициативе вызывает особенно хорошую реакцию. В течение 60-минутного окна оставайтесь вовлеченными, но пусть ребенок ведет. Наблюдение не обязательно должно быть непрерывным; можно распределить его по привычному распорядку. Записывайте каждое спонтанное название с временем и контекстом.',
    commonMistakes: [
      'Невольно подсказывать, показывая на предметы или смотря на них выжидающе',
      'Выбирать время наблюдения, когда ребенок устал, голоден или не вовлечен',
      'Недостаточно интересных предметов или обстановки для спонтанного называния',
      'Считать названия, которые последовали за вашим вопросом или после того, как вы что-то назвали',
    ],
    practicePrompt: {
      brief: 'Ребёнок назвал это спонтанно?',
      detail:
        'Не спрашивайте «Что это?». Ребёнок должен называть предметы полностью по своей инициативе.',
    },
  },
  'tact-5': {
    levelId: 'tact-5',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Составьте список всех предметов, которые ребенок сейчас называет. Определите, каких категорий не хватает (бытовые предметы, части тела, картинки).',
      },
      {
        stepNumber: 2,
        instruction:
          'Вводите новые слова по одной категории за раз, начиная с простых знакомых предметов из каждой категории.',
      },
      {
        stepNumber: 3,
        instruction:
          'Проверяйте усвоение: ребенок должен правильно назвать предмет 3 дня подряд без помощи.',
      },
      {
        stepNumber: 4,
        instruction:
          'Ведите текущий подсчет. Когда ребенок самостоятельно называет 10 разных предметов, проведите переоценку.',
      },
    ],
    fullGuide:
      'Формирование репертуара из 10 названий требует систематического расширения словаря по категориям. Начните со списка всех предметов, которые ребенок называет без помощи. Затем определите пробелы: может ли он назвать бытовые предметы (чашка, стул)? Людей (мама, папа)? Части тела (нос, рука)? Картинки в книгах? Вводите новые слова по одному из недостающих категорий. Используйте систему жетонов с уровня 3 для менее мотивирующих предметов. Для каждого нового слова проверяйте усвоение: тестируйте без подсказок 3 дня подряд. Если ребенок отвечает правильно все 3 дня — слово усвоено. Если нет — продолжайте практику. Чередуйте повторение известных слов и введение новых. Начинайте с простых слов каждой категории: коротких, часто встречающихся слов, которые ребенок слышит каждый день и может легко произнести. Отслеживайте общий счет, чтобы достичь 10 различных самостоятельно называемых предметов.',
    commonMistakes: [
      'Учить слишком много новых слов сразу вместо одного за раз',
      'Не проверять усвоение перед тем как считать слово выученным (3 дня подряд без помощи)',
      'Сосредотачиваться на одной категории вместо распределения по бытовым предметам, людям, частям тела и картинкам',
      'Считать называния, для которых ещё нужна подсказка, самостоятельными',
    ],
    practicePrompt: {
      brief: 'Может ли ребёнок назвать это без помощи?',
      detail: 'Никаких подсказок. Ребёнок должен самостоятельно назвать предмет 3 дня подряд.',
    },
  },
}

export const TRAINING_BY_LANGUAGE: Record<Language, Record<string, TrainingContent>> = {
  en: TRAINING_EN,
  ru: TRAINING_RU,
}
