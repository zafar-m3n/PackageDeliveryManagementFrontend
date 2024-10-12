import { WeightToGramsPipe } from './weight-to-grams.pipe';

describe('WeightToGramsPipe', () => {
  it('create an instance', () => {
    const pipe = new WeightToGramsPipe();
    expect(pipe).toBeTruthy();
  });
});
