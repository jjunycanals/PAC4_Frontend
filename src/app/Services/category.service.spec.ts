import { TestBed } from '@angular/core/testing';
import { CategoryService, deleteResponse } from './category.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryDTO } from '../Models/category.dto';


const categoriesList: CategoryDTO[] = [
  {
    userId:'',
    categoryId: '1',
    css_color:'',
    description: '',
    title: '',
  },
  {
    userId:'',
    categoryId: '2',
    css_color:'',
    description: '',
    title: '',
  },
  {
    userId:'',
    categoryId: '3',
    css_color:'',
    description: '',
    title: '',
  },
];


describe('CategoryService', () => {
  // declarem la variable service de tipo CategoryService per cridar les diferents funcions del servei
  let service: CategoryService;
  // declarem una variable httpMock de tipo HttpTestingController per fer les peticions del "mock"
  // per no fer peticions reals
  let httpMock: HttpTestingController;

  // abans de cada test configurem
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    // Instancies necessàries per cada test del servei
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // després de cada test, pq no s'enllaci amb el següent test
  afterEach(() => {
    httpMock.verify();
  })

  // TEST 1: comprovar que el servei es creii correcte
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TEST 2: comprovar que getCategoriesByUserId torna la llista de categories
  it('GET method and getCategoriesByUserId return a list of categories', () => {
    // cridem al servei i ens subscribim. 
    // El resutlat esperat seria que la resposta fos = a 'categoriesList'
    service.getCategoriesByUserId('1').subscribe((resp: CategoryDTO[]) => {
      expect(resp).toEqual(categoriesList);
    });

    // definim la petició 'mock' a la url determinada
    const req = httpMock.expectOne('http://localhost:3000/users/categories/1');

    // verifiquem que el mètode sigui GET
    expect(req.request.method).toBe('GET');

    // llancem la petició: simula la petició i ens torna un observable del tipus CategoryDTO[]
    // Validem que sugui del tipus GET i que torni un llistat de categories 
    req.flush(categoriesList);
  });

  // TEST 3: comprovar que createCategory crea la categoria
  it('POST method and createCategory', () => {
    const newCategory: CategoryDTO = { userId: '', categoryId: '4', css_color: '', description: '', title: '' };
    service.createCategory(newCategory).subscribe((resp: CategoryDTO) => {
      expect(resp).toEqual(newCategory);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('POST');
    req.flush(newCategory);
  });

  // TEST 4: comprovar que getCategoryById torna una categoria
  it('GET method and getCategoryById', () => {
    const category: CategoryDTO = categoriesList[0];
    service.getCategoryById('1').subscribe((resp: CategoryDTO) => {
      expect(resp).toEqual(category);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('GET');
    req.flush(category);
  });

  // TEST 5: comprovar que updateCategory actualitza categories
  it('PUT method and updateCategory', () => {
    const updatedCategory: CategoryDTO = { userId: '', categoryId: '1', css_color: '', description: 'updated', title: 'updated' };
    service.updateCategory('1', updatedCategory).subscribe((resp: CategoryDTO) => {
      expect(resp).toEqual(updatedCategory);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCategory);
  });

  // TEST 6: comprovar que deleteCategory elimina categories
  it('DELETE method and deleteCategory', () => {
    const deleteResponse = { affected: 1 };
    service.deleteCategory('1').subscribe((resp: deleteResponse) => {
      expect(resp).toEqual(deleteResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteResponse);
  });






});
