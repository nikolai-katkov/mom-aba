import type { TrainingContent } from '../types'

export const TRAINING_CONTENT: Record<string, TrainingContent> = {
  'mand-1': {
    criterionId: 'mand-1',
    shortGuide: [
      {
        stepNumber: 1,
        instruction: 'Choose 2 items your child loves (e.g., a favorite snack and a toy).',
      },
      {
        stepNumber: 2,
        instruction: 'Hold the item where your child can see it but cannot reach it.',
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
      'At this stage, prompts are allowed and expected. You can use echoic prompts (saying the word for the child to repeat), imitation prompts (modeling a gesture), or show a PECS card for the child to hand to you. The goal is simply to establish that communication leads to getting desired items. Practice during natural moments when your child wants something -- mealtimes, play, getting dressed. Keep sessions short (5-10 minutes) and always end on a success. If your child does not respond after 3-5 seconds, provide the prompt again. Gradually reduce the intensity of your prompt over time as the child becomes more independent.',
    commonMistakes: [
      'Giving the item before the child makes any communicative attempt',
      'Using physical prompts (hand-over-hand) when non-physical prompts would work',
      'Practicing only during structured sessions instead of natural moments',
      'Waiting too long to deliver the item after a successful request',
    ],
  },
  'mand-2': {
    criterionId: 'mand-2',
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
      'The key difference at this level is independence -- the child should request without being prompted. This does not mean you cannot set up the environment to encourage requests. Strategies include: placing desired items in sight but out of reach, giving small portions so the child needs to ask for more, starting a favorite activity and then pausing until the child requests continuation. The object being visible is acceptable -- what matters is that the child initiates communication on their own. Track each unique request to confirm you have at least 4 different ones. Common items that work well: favorite snacks, specific toys, activities like swinging or being tickled, and media like songs or videos.',
    commonMistakes: [
      'Asking "What do you want?" which counts as a prompt',
      'Not creating enough opportunities for the child to need to request',
      'Counting the same request multiple times instead of tracking unique requests',
      'Expecting full sentences -- single words or clear gestures count',
    ],
  },
  'mand-3': {
    criterionId: 'mand-3',
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
      'Generalization means the child can use requesting skills flexibly -- not just with one person in one place for one thing. To build this, systematically vary three dimensions: people (practice with mom, dad, grandparents, siblings, therapists), environments (home, park, store, car, classroom), and reinforcement types (food, toys, activities, social attention). Start by changing one dimension at a time. For example, if the child reliably requests with mom at home, first try with dad at home (new person, same place), then with mom at the park (same person, new place). Only change multiple dimensions once the child is comfortable with single changes. Keep a log of successful requests noting who, where, and what to track the 6 different combinations needed.',
    commonMistakes: [
      'Practicing only at home with the same caregiver',
      'Changing too many variables at once (new person AND new place AND new items)',
      'Not keeping track of which combinations have been achieved',
      'Giving up if the child struggles in a new context instead of providing temporary support',
    ],
  },
  'mand-4': {
    criterionId: 'mand-4',
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
      'Spontaneous requesting means the child communicates a want entirely on their own initiative -- no verbal cues, no questions, no gestures from you to prompt them. To build this skill, engineer the environment to be rich with opportunities: have favorite items visible but slightly out of reach, start activities that naturally pause (e.g., a wind-up toy that stops), offer small amounts of preferred snacks so the child needs more, or play interactive games where the child needs to request "again" or "more." During the observation period, stay nearby and engaged but avoid directing the interaction. If the child makes a request, fulfill it promptly. The 60-minute window does not need to be continuous -- you can observe across a natural routine. Track each request with the time and what was requested.',
    commonMistakes: [
      'Inadvertently prompting by looking at items or gesturing',
      'Choosing an observation time when the child is not motivated (e.g., right after a meal)',
      'Not having enough motivating items available in the environment',
      'Counting echoic responses (child repeating something you said) as spontaneous',
    ],
  },
  'mand-5': {
    criterionId: 'mand-5',
    shortGuide: [
      {
        stepNumber: 1,
        instruction:
          'Make a list of all items and activities your child currently requests independently.',
      },
      {
        stepNumber: 2,
        instruction:
          'Identify gaps -- what motivating items has the child not yet learned to request?',
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
      'Building a repertoire of 10 independent mands requires systematically expanding beyond the child\'s current set of requests. Start by listing every item or activity the child currently requests without prompts. Then identify motivating items the child enjoys but does not yet ask for. Introduce these one at a time: first, use a prompt (echoic or model) to teach the new word or gesture, then gradually fade the prompt across sessions until the child requests independently. Good categories to expand into: foods (apple, juice, cracker), toys (ball, car, blocks), activities (swing, tickle, music), and social actions (up, open, help). Keep a running tally -- you need 10 distinct, independent requests. Remember that "What do you want?" does not count as independent. The child should initiate these requests on their own across natural opportunities.',
    commonMistakes: [
      'Counting prompted requests as independent',
      'Teaching too many new words at once instead of one at a time',
      'Not fading prompts gradually (going from full prompt to no prompt too quickly)',
      'Only counting requests made during structured teaching rather than throughout the day',
    ],
  },
}
