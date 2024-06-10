import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLightNovelComponent } from './create-light-novel.component';

describe('CreateLightNovelComponent', () => {
  let component: CreateLightNovelComponent;
  let fixture: ComponentFixture<CreateLightNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLightNovelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLightNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
