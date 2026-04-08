import type { SectionIntroduction } from '../types'

export const SECTION_INTRODUCTIONS: Record<string, SectionIntroduction> = {
  mand: {
    sectionId: 'mand',
    shortBullets: [
      'A mand is a request -- when your child asks for something they want using words, gestures, or picture cards.',
      'Requesting is one of the first and most important communication skills because it gives your child direct control over their environment.',
      'You will assess whether your child can request items at different levels of independence, from prompted requests to fully spontaneous communication.',
      'Each level builds on the previous one, moving from basic requesting with help to independent, flexible communication across different settings.',
    ],
    fullExplanation:
      'The MAND section is based on the verbal operant framework from Applied Behavior Analysis (ABA). A "mand" is a technical term for a request -- it is communication motivated by a want or need. Unlike labeling (tacting) or repeating (echoics), manding is driven by the child\'s own motivation, which makes it a powerful starting point for language development.\n\nThe 5 criteria in this section follow a developmental progression across three dimensions:\n\n- Independence: Moving from prompted requests (Level 1) to fully spontaneous communication (Level 4-5), where the child initiates without any cues from adults.\n\n- Generalization: Expanding from requesting with one person in one place (Level 1-2) to requesting with different people, in different environments, and for different types of items (Level 3).\n\n- Repertoire size: Growing from 2 requests (Level 1) to 10 distinct independent requests (Level 5), reflecting a richer and more flexible communication vocabulary.\n\nDuring the assessment, you will observe or test whether your child demonstrates each skill. For most criteria, you can combine direct testing with observation in natural settings. For spontaneous requesting, you will observe during a 60-minute period without prompting.\n\nCommon things parents find helpful to know:\n- It is perfectly normal for children to be at different levels across these criteria.\n- Prompts are a normal part of learning. The goal is to gradually reduce them, not to eliminate them immediately.\n- "Requesting" includes any intentional communication -- spoken words, sign language, gestures, or picture exchange (PECS) all count.\n- The assessment captures where your child is right now. The training guides will show you how to build the next skill.',
    videoPlaceholderLabel: 'Video coming soon',
  },
  tact: {
    sectionId: 'tact',
    shortBullets: [
      'A tact is a label -- when your child names something they see, hear, smell, or touch without being asked to.',
      'Labeling is essential for language development because it connects words to the world around your child.',
      'You will assess whether your child can label objects at increasing levels of complexity, from naming favorites to labeling everyday items spontaneously.',
      'This section moves from simple labeling of preferred items to naming non-preferred objects and spontaneous labeling without prompts.',
    ],
    fullExplanation:
      'The TACT section assesses your child\'s ability to label -- to name things in their environment. In ABA terminology, a "tact" is a verbal response controlled by a non-verbal stimulus: the child sees a dog and says "dog," or sees mom and says "mama." Unlike requesting (manding), tacting is not driven by wanting the item -- it is driven by contact with it.\n\nThe 5 criteria progress through:\n\n- Repertoire size: From 2 objects (Level 1) to 10 objects across categories (Level 5).\n\n- Complexity: From labeling favorite, reinforcing items (Level 1-2) to non-reinforcing everyday objects (Level 3), which is harder because the child is less motivated.\n\n- Independence: From labeling on request during direct testing (Levels 1-3, 5) to spontaneous labeling without prompts (Level 4).\n\nMost criteria use direct testing (TCT) -- you show the child an object and ask "What is this?" Level 4 uses timed observation (NOV) -- you watch for spontaneous labels during a 60-minute period.\n\nNote: This section is coming soon and is not yet available for assessment.',
    videoPlaceholderLabel: 'Video coming soon',
  },
}
