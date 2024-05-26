import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  showAuthSection: boolean;
  showNoAuthSection: boolean;

  constructor(
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = !this.showAuthSection;
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
          this.showNoAuthSection = headerInfo.showNoAuthSection;
        }
      }
    );
  }

  navigateTo(route: string):void {
    this.router.navigateByUrl(route);
  }

  // dashboard(): void {
  //   this.router.navigateByUrl('dashboard');
  // }

  // home(): void {
  //   this.router.navigateByUrl('home');
  // }

  // login(): void {
  //   this.router.navigateByUrl('login');
  // }

  // register(): void {
  //   this.router.navigateByUrl('register');
  // }

  // adminPosts(): void {
  //   this.router.navigateByUrl('posts');
  // }

  // adminCategories(): void {
  //   this.router.navigateByUrl('categories');
  // }

  // profile(): void {
  //   this.router.navigateByUrl('profile');
  // }

  login(): void {

    this.showAuthSection = true;
    this.showNoAuthSection = false;
    const headerInfo: HeaderMenus = {
      showAuthSection: true,
      showNoAuthSection: false,
    };
    this.headerMenusService.headerManagement.next(headerInfo);

    // Guarda l'estat de l'autenticació a localStorage
    this.localStorageService.set('access_token', 'some_token');
  }

  logout(): void {
    // Elimino les dades d'autenticació de localStorage
    this.localStorageService.remove('user_id');
    this.localStorageService.remove('access_token');

    // Actualitza els valors de showAuthSection i showNoAuthSection
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true,
    };

    this.headerMenusService.headerManagement.next(headerInfo);

    this.router.navigateByUrl('home');
  }
}
