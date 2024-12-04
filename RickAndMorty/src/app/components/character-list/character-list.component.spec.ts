import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CharacterListComponent } from './character-list.component';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let rickAndMortyService: RickAndMortyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CharacterListComponent // Importa el component autònom
      ],
      providers: [RickAndMortyService]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    rickAndMortyService = TestBed.inject(RickAndMortyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', () => {
    const mockResponse = {
      results: [{ id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' }],
      info: { count: 1, pages: 1, next: null, prev: null }
    };
    spyOn(rickAndMortyService, 'getCharacters').and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.characters.length).toBe(1);
    expect(component.characters[0].name).toBe('Rick Sanchez');
  });

  it('should navigate to the next page', () => {
    spyOn((component as any).router, 'navigate');

    component.goToPage(2);

    expect((component as any).router.navigate).toHaveBeenCalledWith([], {
      relativeTo: (component as any).route,
      queryParams: { page: 2 },
      queryParamsHandling: 'merge'
    });
  });

  it('should disable previous button on first page', () => {
    component.info = { prev: null };
    fixture.detectChanges();

    const prevButton = fixture.nativeElement.querySelector('.pagination button:first-child');
    expect(prevButton.disabled).toBeTruthy();
  });

  it('should enable next button if there is a next page', () => {
    component.info = { next: 'https://rickandmortyapi.com/api/character?page=2' };
    fixture.detectChanges();

    const nextButton = fixture.nativeElement.querySelector('.pagination button:last-child');
    expect(nextButton.disabled).toBeFalsy();
  });
});