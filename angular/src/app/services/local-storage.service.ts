import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

setItem(key: string, value: boolean | string): void {
  if(value === 'boolean' )
    localStorage.setItem(key, JSON.stringify(value))
  if(value === 'string')
  localStorage.setItem(key, value)

}

getItem(key: string): string | boolean | null {
  const value = localStorage.getItem(key);

  if (value === 'boolean') return JSON.parse(value);
  if (value === 'string') return value;
  return null;
}

removeItem(key: string): void{
localStorage.removeItem(key);
}
clearItem(): void {
localStorage.clear()
}




}
