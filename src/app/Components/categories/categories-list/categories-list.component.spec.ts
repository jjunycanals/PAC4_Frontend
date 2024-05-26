import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesListComponent } from './categories-list.component';
import { CategoryService } from '../../../Services/category.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryDTO } from '../../../Models/category.dto';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from 'src/app/Services/local-storage.service';


describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let categoryService: CategoryService;
  let router: Router;
  let localStorageService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CategoriesListComponent],
      providers: [CategoryService, LocalStorageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    localStorageService = TestBed.inject(LocalStorageService);
    fixture.detectChanges();
  });

  // TEST 1: 1.1. Test que valida que es crea el component ok
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: 1.2.1 + 1.2.2 Assegura que loadCategories llanci getCategoriesByUserId + Assegura que la resposta sigui l'esperada
  it('should call loadCategories and load the list of categories', () => {
    const categoriesList: CategoryDTO[] = [{ categoryId: '1', userId: '', css_color: '', description: '', title: '' }];
    const userIdFromLocalStorage = '1'; // definim userId del local storage
    spyOn(localStorageService, 'get').and.returnValue(userIdFromLocalStorage); // Espia el mètode get del localStorageService
    const spy = spyOn(categoryService, 'getCategoriesByUserId').and.returnValue(of(categoriesList));

    component.loadCategories();

    expect(localStorageService.get).toHaveBeenCalledWith('user_id'); // Assegura que el mètode get del localStorageService sigui cridat amb 'user_id'
    expect(spy).toHaveBeenCalledWith(userIdFromLocalStorage); // Assegura que getCategoriesByUserId sigui cridat amb l'userId correcte obtingut del local storage
    expect(component.categories).toEqual(categoriesList);
  });

  // TEST 3: 1.3. Validem que navigateByUrl crea una categoria
  it('should navigate to correct URL when createCategory is called', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.createCategory();

    expect(navigateSpy).toHaveBeenCalledWith('/create-category');
  });

  // TEST 4: 1.4. Valida que si cridem navigateByUrl actualitzem una categoria
  it('should navigate to correct URL when updateCategory is called', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const categoryId = '1';
    component.updateCategory(categoryId);

    expect(navigateSpy).toHaveBeenCalledWith(`/update-category/${categoryId}`);
  });
});
