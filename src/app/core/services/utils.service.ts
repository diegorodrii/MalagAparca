import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Removes a prefix from a string if it exists
   * @param str The string to remove the prefix from
   * @param pref The prefix to remove
   * @returns The string with the prefix removed
   */
  removePrefix(str: string, pref: string): string {
    if (str.startsWith(pref)) {
      return str.slice(pref.length);
    } else {
      return str;
    }
  }

}