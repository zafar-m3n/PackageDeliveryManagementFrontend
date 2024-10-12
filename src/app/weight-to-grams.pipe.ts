import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightToGrams',
  standalone: true,
})
export class WeightToGramsPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '0.00 g';
    const grams = value * 1000;
    return `${grams.toFixed(2)} g`;
  }
}
