import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private LANGUAGE_KEY = 'selectedLanguage';

  constructor(private storage: Storage) { }

  async getLanguage(): Promise<string> {
    const selectedLanguage = await this.storage.get(this.LANGUAGE_KEY);
    return selectedLanguage || 'en'; // Valor por defecto si no se encuentra ninguno
  }

  async setLanguage(language: string): Promise<void> {
    await this.storage.set(this.LANGUAGE_KEY, language);
  }

}
