import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { PostDTO } from '../Models/post.dto';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const postsList: PostDTO[] = [
  { postId: '1', title: 'Post 1', description: 'Content 1', userId: '', num_likes: 0, num_dislikes: 0, publication_date: new Date(), categories: [], userAlias: '' },
  { postId: '2', title: 'Post 2', description: 'Content 2', userId: '', num_likes: 0, num_dislikes: 0, publication_date: new Date(), categories: [], userAlias: '' },
  { postId: '3', title: 'Post 3', description: 'Content 3', userId: '', num_likes: 0, num_dislikes: 0, publication_date: new Date(), categories: [], userAlias: '' },
];

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // TEST 1: comprovar que el servei es creii correcte
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TEST 2: comprovar que getPosts torna la llista de posts
  it('GET method and getPosts return a list of posts', () => {
    service.getPosts().subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postsList);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('GET');
    req.flush(postsList);
  });

  // TEST 3: comprovar que createPost crea posts
  it('POST method and createPost', () => {
    const newPost: PostDTO = { postId: '4', title: 'Post 4', description: 'Content 4', userId: '', num_likes: 0, num_dislikes: 0, publication_date: new Date(), categories: [], userAlias: ''  };
    service.createPost(newPost).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(newPost);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  // TEST 4: comprovar que getPostById torna un post
  it('GET method and getPostById', () => {
    const post: PostDTO = postsList[0];
    service.getPostById('1').subscribe((resp: PostDTO) => {
      expect(resp).toEqual(post);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('GET');
    req.flush(post);
  });

  // TEST 5: comprovar que updatePost permet actualitzar posts
  it('PUT method and updatePost', () => {
    const updatedPost: PostDTO = { postId: '1', title: 'Updated Post 1', description: 'Updated Content 1', userId: '', num_likes: 0, num_dislikes: 0, publication_date: new Date(), categories: [], userAlias: '' };
    service.updatePost('1', updatedPost).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(updatedPost);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  // TEST 6: comprovar que getPosts actualitza likes de posts
  it('PUT method and likePost', () => {
    const updateResponse = { affected: 1 };
    service.likePost('1').subscribe((resp: { affected: number }) => {
      expect(resp).toEqual(updateResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/like/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updateResponse);
  });

  // TEST 7: comprovar que podem actualitzar els dislikes de posts
  it('PUT method and dislikePost', () => {
    const updateResponse = { affected: 1 };
    service.dislikePost('1').subscribe((resp: { affected: number }) => {
      expect(resp).toEqual(updateResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/dislike/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updateResponse);
  });

  // TEST 8: comprovar que deletePost elimina posts
  it('DELETE method and deletePost', () => {
    const deleteResponse = { affected: 1 };
    service.deletePost('1').subscribe((resp: { affected: number }) => {
      expect(resp).toEqual(deleteResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteResponse);
  });
});
