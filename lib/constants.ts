export const STYLES = [
  { id: 'pixar',  name: 'Pixar 3D',   emoji: '🎬', bg: '#E6F3FC', desc: 'Warm & cinematic',    img: '/assets/after.png' },
  { id: 'anime',  name: 'Anime',      emoji: '🌸', bg: '#FBE9EF', desc: 'Bright & expressive', img: '/assets/after-anime.png' },
  { id: 'disney', name: 'Classic',    emoji: '🪄', bg: '#FCEBB8', desc: 'Hand-drawn magic',    img: '/assets/after-classic.png' },
  { id: 'water',  name: 'Watercolor', emoji: '🎨', bg: '#E8F5E9', desc: 'Soft & dreamy',       img: '/assets/after-water.png' },
  { id: 'comic',  name: 'Superhero',  emoji: '💥', bg: '#FFE7D6', desc: 'Bold comic action',   img: '/assets/after-comic.png' },
  { id: 'clay',   name: 'Claymation', emoji: '🧸', bg: '#EDE7FB', desc: 'Playful & tactile',   img: '/assets/after-clay.png' },
] as const

export type StyleId = typeof STYLES[number]['id']

export const THEMES = [
  'Outer space', 'Under the sea', 'Dragons & castles', 'Jungle safari',
  'Superhero rescue', 'Dinosaur world', 'Magical forest', 'Pirate voyage', 'Bedtime dreams',
]

export const READING_TIERS = [
  { min: 3, max: 4,  l: 'First Words',      p: 'Short, rhythmic lines and big friendly words — perfect for cuddle-up read-alouds.', demo: '“Max put on his cape. Whoosh! Off he flew into the bright blue sky!”' },
  { min: 5, max: 6,  l: 'Early Reader',     p: 'Simple sentences and gentle repetition to build budding confidence.',                demo: '“Max found a glowing map. Where would it lead him today?”' },
  { min: 7, max: 8,  l: 'Growing Reader',   p: 'Richer vocabulary and a real story arc with a problem to solve.',                    demo: '“The bridge had vanished, but Max remembered exactly what his friend taught him.”' },
  { min: 9, max: 10, l: 'Confident Reader', p: 'Chapter-style pacing, vivid description and a satisfying twist.',                   demo: '“Beyond the misty ridge, an ancient secret waited — and only Max could unlock it.”' },
]

export const tierFor = (age: number) =>
  READING_TIERS.find((t) => age >= t.min && age <= t.max) ?? READING_TIERS[1]

export const STEP_LABELS = ['Photo', 'Style', 'Story', 'Reader', 'Review', 'Pay']

export const SAMPLE_PHOTOS = ['/assets/before.png', '/assets/after.png']
