/**
 * Photos de portrait (Unsplash) utilisees pour les avatars.
 * Selection deterministe a partir d'une graine (matricule, nom...) pour
 * qu'une meme personne ait toujours la meme photo.
 */
const UNSPLASH_PORTRAITS = [
  'photo-1494790108377-be9c29b29330',
  'photo-1500648767791-00dcc994a43e',
  'photo-1438761681033-6461ffad8d80',
  'photo-1472099645785-5658abf4ff4e',
  'photo-1544005313-94ddf0286df2',
  'photo-1547425260-76bcadfb4f2c',
  'photo-1517841905240-472988babdf9',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1534528741775-53994a69daeb',
  'photo-1539571696357-5a69c17a67c6',
  'photo-1502685104226-ee32379fefbe',
  'photo-1568602471122-7832951cc4c5',
  'photo-1531123897727-8f129e1688ce',
  'photo-1546961329-78bef0414d7c',
  'photo-1487412720507-e7ab37603c6f',
  'photo-1521119989659-a83eee488004',
  'photo-1488161628813-04466f872be2',
  'photo-1524504388940-b1c1722653e1',
  'photo-1463453091185-61582044d556',
];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

/** URL Unsplash recadree sur le visage pour une graine donnee. */
export function portraitUrl(seed: string, size = 160): string {
  const id = UNSPLASH_PORTRAITS[hashSeed(seed) % UNSPLASH_PORTRAITS.length];
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=faces&w=${size}&h=${size}&q=80`;
}
