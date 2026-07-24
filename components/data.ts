export interface Client {
  id: string;
  code: string;
  name: string;
  tagline: string;
  testimony: string;
  logoUrl: string;
  bgColor: string;
}

export const GRID_COLS = 5;

export const clients: Client[] = [
  {
    id: '1',
    code: 'C1',
    name: 'CÚPULA CREATIVA',
    tagline: 'Creatividad que impulsa',
    testimony: 'El mejor servicio de dispensado para nuestras oficinas. Los empleados están felices con la variedad y calidad.',
    logoUrl: '/clients/cupula.png',
    bgColor: '#0f1929',
  },
  {
    id: '2',
    code: 'V1',
    name: 'VELOXIS',
    tagline: 'Velocidad y eficiencia',
    testimony: 'Transformó la experiencia de nuestro equipo. La agilidad en el servicio es incomparable.',
    logoUrl: '/clients/veloxis.png',
    bgColor: '#1a1f2e',
  },
  {
    id: '3',
    code: 'S1',
    name: 'SYNC LABS',
    tagline: 'Sincronización perfecta',
    testimony: 'La calidad de servicio es excepcional. Recomendamos sin dudarlo a Snack Pro.',
    logoUrl: '/clients/sync.png',
    bgColor: '#0a1428',
  },
  {
    id: '4',
    code: 'A1',
    name: 'ARISTOS GLOBAL',
    tagline: 'Consultores globales',
    testimony: 'Profesionalismo y eficiencia en cada interacción. Excelente relación comercial.',
    logoUrl: '/clients/aristo.png',
    bgColor: '#1a2332',
  },
  {
    id: '5',
    code: 'T1',
    name: 'TERRAVISTA',
    tagline: 'Soluciones sustentables',
    testimony: 'Simplificaron nuestros procesos. El mejor investment para la empresa sostenible.',
    logoUrl: '/clients/terravista.png',
    bgColor: '#0f2818',
  },
];
