import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userSearchPipe', standalone: true })
export class UserSearchPipe implements PipeTransform {
  transform(users: any[], search: string): any[] {
    if (!search) return users;
    return users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
  }
}