import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './core/services';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  language = 1;
  constructor(private translateSVC: TranslateService, private router: Router, private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this.router.navigate(['/']);

  }

  async ngOnInit() {
    await this.localStorageService.init();

    const selectedLanguage = await this.localStorageService.get('selectedLanguage');
    if (selectedLanguage && selectedLanguage !== 'undefined') { // Verificar si selectedLanguage no es undefined
      this.translateService.setDefaultLang(selectedLanguage);
    } else {
      this.translateService.setDefaultLang('idioma-predeterminado');
    }
    this.translateService.use(this.translateService.getDefaultLang());

  }
}
