export interface VideoVariant {
  label: string
  src: string
}

export interface SectionIntroduction {
  sectionId: string
  shortBullets: string[]
  fullExplanation: string
  videoSrc?: string
  videos?: VideoVariant[]
}
