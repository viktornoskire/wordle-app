import { it, describe, expect } from '@jest/globals';
import loadChosenWord from './words.js';

describe('single word return', () => {
  it('returns a random word', () => {
    const word = loadChosenWord(['bolla', 'smita', 'spring', 'bowla', 'pumpa', 'pekat', 'gorgo'], 5, false);

    expect(word).toHaveLength(5);
  });

  it('returns a random word', () => {
    const word = loadChosenWord(['bolla', 'smita', 'spring', 'bowla', 'pumpa', 'pekat', 'gorgo'], 6, false);

    expect(word).toHaveLength(6);
    expect(word).toEqual('spring');
  });

  it('returns a random word', () => {
    const word = loadChosenWord(['boll', 'smed', 'spring', 'pokebowl', 'pumpor', 'pekade', 'moln'], 5, false);

    expect(word).toEqual('no word available');
  });

  it('returns a random word', () => {
    const word = loadChosenWord(['bolla', 'smidd', 'spring', 'pokebowl', 'pumpa', 'pekade', 'skåll'], 5, true);

    expect(word).toEqual('no word available');
  });
});
