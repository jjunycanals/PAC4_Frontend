import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListComponent } from './posts-list.component';
import { PostService } from '../../../Services/post.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostDTO } from '../../../Models/post.dto';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let postService: PostService;
  let router: Router;
  let localStorageService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PostsListComponent],
      providers: [
        PostService,
        {
          provide: LocalStorageService,
          useValue: {
            get: jasmine.createSpy('get').and.returnValue('1') // Mock de LocalStorageService retornant userId '1'
          }
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    router = TestBed.inject(Router);
    localStorageService = TestBed.inject(LocalStorageService);
    fixture.detectChanges();
  });

  // TEST 1: 2.1. Test que valida que es crea el component correctament
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: 2.2.1 + 2.2.2  Mirem que quan es crida loadPosts es llanci getPostsByUserId + Que la resposta sigui l'esperada
  it('should call loadPosts and load the list of posts', () => {
    const postsList: PostDTO[] = [{ postId: '1', title: 'Post 1', description: 'Content 1', userId: '1', num_likes: 0, num_dislikes: 0, publication_date: new Date(), categories: [], userAlias: '' }];
    const spy = spyOn(postService, 'getPostsByUserId').and.returnValue(of(postsList));

    component.loadPosts();

    expect(spy).toHaveBeenCalledWith('1'); // Assumim que user ID sigui '1'
    expect(component.posts).toEqual(postsList);
  });


  // TEST 3: 2.3. Test que valida que es crida el navigateByUrl amb l’argument correcte quan creem un post
  it('should navigate to correct URL when createPost is called', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.createPost();

    expect(navigateSpy).toHaveBeenCalledWith('/user/post/');
  });

  // TEST 4: 2.4. Test que valida que es crida el navigateByUrl amb l’argument correcte quan actualitzem un post
  it('should navigate to correct URL when updatePost is called', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const postId = '1';

    component.updatePost(postId);

    expect(navigateSpy).toHaveBeenCalledWith('/user/post/' + postId);
  });

});
