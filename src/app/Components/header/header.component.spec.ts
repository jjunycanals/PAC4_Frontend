import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

class TemporalComponentForRoutes {}

describe('HeaderComponent', () => {
  // Declarem la variable compoenent de tipo HeaderComponent
  let component: HeaderComponent;
  // declarem el "fixture" per poder gestionar posterioment el "component"
  let fixture: ComponentFixture<HeaderComponent>;

  // abans del test
  beforeEach(async () => {
    // configuració del test per un component
    await TestBed.configureTestingModule({
      // ens fa falta importar el mòdul per testejar rutas
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: TemporalComponentForRoutes,
          },
          { path: 'login', component: TemporalComponentForRoutes },
          { path: 'register', component: TemporalComponentForRoutes },
          { path: 'posts', component: TemporalComponentForRoutes },
          { path: 'categories', component: TemporalComponentForRoutes },
          { path: 'profile', component: TemporalComponentForRoutes },
        ]),
      ],
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // fem que se instancii el component i pasi per ngOnInit
    fixture.detectChanges();
  });

  // TEST 1: que es creei correctament el component
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: navaguem correctament quan es llença el mètode 'home' del component HeaderComponent
  it('should navigate to home', () => {
    // declarem el router
    const router = TestBed.inject(Router);
    // fem que el router escolti si es crida al mètode de nav 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    // executem el mètode home del HeaderComponent
    component.navigateTo('home');
    // enllaç de 'navigateByUrl' amb 'home'
    expect(spy).toHaveBeenCalledWith('home');
  });

  // TEST 3: navaguem correctament quan es llença el mètode 'login' del component HeaderComponent
  it('should navigate to login', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.navigateTo('login');
    expect(spy).toHaveBeenCalledWith('login');
  });

  // TEST 4: navaguem correctament quan es llença el mètode 'register' del component HeaderComponent
  it('should navigate to register', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.navigateTo('register');
    expect(spy).toHaveBeenCalledWith('register');
  });

  // TEST 5: navaguem correctament quan es llença el mètode 'posts' del component HeaderComponent
  it('should navigate to posts', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.navigateTo('posts');
    expect(spy).toHaveBeenCalledWith('posts');
  });

  // TEST 6: navaguem correctament quan es llença el mètode 'categories' del component HeaderComponent
  it('should navigate to categories', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.navigateTo('categories');
    expect(spy).toHaveBeenCalledWith('categories');
  });

  // TEST 7: navaguem correctament quan es llença el mètode 'profile' del component HeaderComponent
  it('should navigate to profile', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.navigateTo('profile');
    expect(spy).toHaveBeenCalledWith('profile');
  });
});
