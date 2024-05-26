import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  it('create an instance', () => {
    const pipe = new FormatDatePipe();
    expect(pipe).toBeTruthy();
  });

  // Test 1: Verifiquem que es crea el pipe correctament
  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  // Test 2: Donada una data i l’argument 1 retorna el format esperat
  it('should format date correctly with format 1', () => {
    const date = new Date('2024-05-24T00:00:00');
    const result = pipe.transform(date, 1);
    expect(result).toBe('24052024');
  });

  // Test 3: Donada una data i l’argument 2 retorna el format esperat
  it('should format date correctly with format 2', () => {
    const date = new Date('2024-05-24T00:00:00');
    const result = pipe.transform(date, 2);
    expect(result).toBe('24 / 05 / 2024');
  });

  // Test 4: Donada una data i l’argument 3 retorna el format esperat
  it('should format date correctly with format 3', () => {
    const date = new Date('2024-05-24T00:00:00');
    const result = pipe.transform(date, 3);
    expect(result).toBe('24/05/2024');
  });

  // Test 5: Donada una data i l’argument 4 retorna el format esperat
  it('should format date correctly with format 4', () => {
    const date = new Date('2024-05-24T00:00:00');
    const result = pipe.transform(date, 4);
    expect(result).toBe('2024-05-24');
  });
});
