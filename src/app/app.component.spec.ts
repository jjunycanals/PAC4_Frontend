import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AuthService } from './Services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    // Obtenim una instància de authservice
    authService = TestBed.inject(AuthService);

    // Detectem els canvis
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a header component', () => {
    const headerComponent = fixture.nativeElement.querySelector('app-header');
    expect(headerComponent).toBeTruthy();
  });

  it('should have a footer component', () => {
    const footerComponent = fixture.nativeElement.querySelector('app-footer');
    expect(footerComponent).toBeTruthy();
  });


  // Ex5. Prova que verifica els elements del menú quan l'usuari està autenticat
  it('should display menu items when user is authenticated', () => {
    // Simulem que l'usuari està autenticat
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const menuItems = fixture.debugElement.queryAll(By.css('.menu-item'));
    console.log(menuItems);
    console.log(localStorage);
    // Detecta els canvis per a que es reflecteixin els canvis en la vista
    // fixture.detectChanges();

    // Comprova que existeixi l'element del menú Home
    const homeMenuItem = fixture.nativeElement.querySelector('#home-menu-item');
    expect(homeMenuItem).toBeTruthy();

    // // Comprova que existeixi l'element del menú Profile
    // const profileMenuItem = fixture.nativeElement.querySelector('#profile-menu-item');
    // expect(profileMenuItem).toBeTruthy();

    // // Comprova que existeixi l'element del menú Logout
    // const logoutMenuItem = fixture.nativeElement.querySelector('#logout-menu-item');
    // expect(logoutMenuItem).toBeTruthy();


    // const buttons = fixture.nativeElement.querySelectorAll('button') as HTMLButtonElement[];
    // console.log(buttons.length);
    // const homeMenuItem = Array.from(buttons).find(button => button.id === 'home-menu-item');
    // const postsMenuItem = Array.from(buttons).find(button => button.id === 'posts-menu-item');
    // const categoriesMenuItem = Array.from(buttons).find(button => button.id === 'categories-menu-item');
    // const profileMenuItem = Array.from(buttons).find(button => button.id === 'profile-menu-item');
    // const logoutMenuItem = Array.from(buttons).find(button => button.id === 'logout-menu-item');


    // expect(homeMenuItem).toBeTruthy();
    // expect(postsMenuItem).toBeTruthy();
    // expect(categoriesMenuItem).toBeTruthy();
    // expect(profileMenuItem).toBeTruthy();
    // expect(logoutMenuItem).toBeTruthy();


    // // Comprovem els elements del menú esperats
    // const menuItems = fixture.nativeElement.querySelectorAll('button');
    // console.log('Menu items:', menuItems);
    // console.log('Menu items:', menuItems.length);
    // expect(menuItems.length).toBe(5); // Esperem 5 botons quan l'usuari està autenticat

    // // Comprovem que els botons esperats estiguin presents
    // expect(menuItems[0].textContent).toContain('Home');
    // expect(menuItems[1].textContent).toContain('Posts');
    // expect(menuItems[2].textContent).toContain('Categories');
    // expect(menuItems[3].textContent).toContain('Profile');
    // expect(menuItems[4].textContent).toContain('Logout');

  });

  // Prova que verifica els elements del menú quan l'usuari no està autenticat
  it('should display correct menu items when user is NOT authenticated', () => {
     // Simulem que l'usuari no està autenticat
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    // Detecta els canvis per a que es reflecteixin els canvis en la vista
    fixture.detectChanges();

    // // Comprova que existeixi l'element del menú Home
    // const homeMenuItem = fixture.nativeElement.querySelector('#home-menu-item');
    // expect(homeMenuItem).toBeTruthy();

    // // Comprova que existeixin els elements del menú Login i Register
    // const loginMenuItem = fixture.nativeElement.querySelector('#login-menu-item');
    // expect(loginMenuItem).toBeTruthy();

    // const registerMenuItem = fixture.nativeElement.querySelector('#register-menu-item');
    // expect(registerMenuItem).toBeTruthy();
    const buttons = fixture.nativeElement.querySelectorAll('button') as HTMLButtonElement[];
    const homeMenuItem = Array.from(buttons).find(button => button.id === 'home-menu-item');
    const loginMenuItem = Array.from(buttons).find(button => button.id === 'login-menu-item');
    const registerMenuItem = Array.from(buttons).find(button => button.id === 'register-menu-item');


    expect(homeMenuItem).toBeTruthy();
    expect(loginMenuItem).toBeTruthy();
    expect(registerMenuItem).toBeTruthy();


  });
});
