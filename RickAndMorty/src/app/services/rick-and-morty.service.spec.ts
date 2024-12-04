import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RickAndMortyService } from './rick-and-morty.service';

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickAndMortyService]
    });
    service = TestBed.inject(RickAndMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});