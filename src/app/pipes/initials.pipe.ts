import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true  // This makes it a standalone pipe
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    return value
      .split(' ')  // Split by spaces
      .map(name => name[0])  // Take first letter of each part
      .join('')   // Combine letters
      .toUpperCase()  // Convert to uppercase
      .substring(0, 2);  // Take max 2 initials
  }
}