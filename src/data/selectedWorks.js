import works01Image from '../assets/works-01.png';
import works02Image from '../assets/works-02.png';

export const selectedWorks = [
  {
    id: 'streamera',
    num: '01',
    // category: 'Branding / Web Design',
    title: 'Streamera',
    desc: 'High Performant Streaming',
    image: works01Image,
    categoryColor: 'var(--color-accent-electric)',
    gradient: 'linear-gradient(145deg, #1A1A1A 0%, #1E1B17 40%, #1A1A1A 100%)',
    layout: 'grid',
  },
  {
    id: 'RSSible',
    num: '02',
    // category: 'Product Design',
    title: 'RSSible',
    desc: 'A platform with everything RSS.',
    image: works02Image,
    categoryColor: 'var(--color-accent-electric)',
    gradient: 'linear-gradient(160deg, #111111 0%, #1A1510 50%, #111111 100%)',
    layout: 'grid',
  },
  // TODO: placeholder projects — replace title/desc and add `image` once real work is ready.
  {
    id: 'project-03',
    num: '03',
    title: 'Project Three',
    desc: 'Placeholder — description coming soon.',
    categoryColor: 'var(--color-accent-glow)',
    gradient: 'linear-gradient(200deg, #1A1A1A 0%, #15181A 50%, #1A1A1A 100%)',
    layout: 'grid',
  },
  {
    id: 'project-04',
    num: '04',
    title: 'Project Four',
    desc: 'Placeholder — description coming soon.',
    categoryColor: 'var(--color-accent-electric)',
    gradient: 'linear-gradient(120deg, #111111 0%, #1A1712 50%, #111111 100%)',
    layout: 'grid',
  },
];
