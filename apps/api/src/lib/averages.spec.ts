import { moyenneTrimestrielle, rangDansSalle, moyenneParCoursSession } from './averages';
import { sequelize } from '../db';

jest.mock('../db', () => ({
  sequelize: {
    query: jest.fn(),
  },
}));

describe('Averages Lib', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calculates course average session correctly', async () => {
    (sequelize.query as jest.Mock).mockResolvedValueOnce([
      [{ idCours: 1, libelle: 'Math', coefficient: 4, moyenne_eleve: 15, moyenne_classe: 12, appreciation: 'Bien' }],
    ]);
    const res = await moyenneParCoursSession(1, 1);
    expect(res).toHaveLength(1);
    expect(res[0].moyenne_eleve).toBe(15);
  });

  it('calculates term average correctly', async () => {
    (sequelize.query as jest.Mock).mockResolvedValueOnce([[{ moy_gen: 14.5 }]]);
    const res = await moyenneTrimestrielle(1, 1);
    expect(res).toBe(14.5);
  });

  it('calculates class rank correctly', async () => {
    (sequelize.query as jest.Mock).mockResolvedValueOnce([[{ rang: 2 }]]);
    const res = await rangDansSalle(1, 1, 1);
    expect(res).toBe(2);
  });
});
