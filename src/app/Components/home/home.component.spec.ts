import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from 'src/app/Services/post.service';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '../../../../node_modules/@angular/core';
import { PostDTO } from '../../Models/post.dto';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  //declarem la variable component tipo HomeComponent
  let component: HomeComponent;
  // declarem el fixture per poder gestionar posteriorment el component
  let fixture: ComponentFixture<HomeComponent>;

  // Abans de cada test hem de...
  beforeEach(async () => {
    // Aqui importem i vinculem totes les dep. 
    await TestBed.configureTestingModule({
      // ens fa falta importar el modul per testejar crides api simulades
      imports: [HttpClientTestingModule],
      //en declarations posem el component a provar (testejar)
      declarations: [HomeComponent],
      // dependencies (serveis que tinguin injectat el component en el seu constructor)
      // En cas de homecomponent només faria falta el servei PostService
      providers: [PostService],
      // Es posa per evita errors:
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  // Abans de cada test hem de..
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // Fem que el component s'instancie, i detectChanges es com si passes per el ngOnInit
    fixture.detectChanges();
  });

// TEST 1: crear correctament el component
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2:  load posts success
  it('loadPosts success from subscription', () => {
    // Definim la dep. del servei
    const postsService = fixture.debugElement.injector.get(PostService);
    // llistar de post "mock", llista buida
    const listPosts: PostDTO[] = [];
    // espia per simular el métode getPosts del servei
    // Li diem que ens torni una llista de posts i que serà un observable, per això l'ús de of()
    const spy = spyOn(postsService, 'getPosts').and.returnValue(of(listPosts));
    // Cridem al mètode privat loadposts del component HomeComponent
    component['loadPosts']();
    // Esperem que el getPosts del PostService sigui cridat
    expect(spy).toHaveBeenCalled();
    // Que esperem? Esperem que la variable posts del HomeComponent on es mapeja el resultat de la crida anterior
    // tingui el número de posts correcte, en aquest cas, com listPosts "mock" té 0 posts, el resultat esperat es 0.
    expect(component.posts.length).toBe(0);

  })
});
