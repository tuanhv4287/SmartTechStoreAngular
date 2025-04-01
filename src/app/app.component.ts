import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    console.log('platformId:', this.platformId);
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = this.translate.getBrowserLang() ?? 'vi';
      const lang =
        localStorage.getItem('language') ||
        (browserLang.match(/vi|en/) ? browserLang : 'vi');
      this.translate.use(lang);
      console.log('language', lang);
      localStorage.setItem('language', lang);
    } else {
      console.log(
        'localStorage of app.component is not available on the server'
      );
    }
  }
  title = 'shopapp-angular';
}
