import { TestBed } from '@angular/core/testing';

import { BulletinBoardPostsService } from './bulletin-board-posts.service';

describe('BulletinBoardPostsService', () => {
  let service: BulletinBoardPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulletinBoardPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
