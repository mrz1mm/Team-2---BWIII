import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightNovelFormComponent } from './light-novel-form.component';

describe('LightNovelFormComponent', () => {
  let component: LightNovelFormComponent;
  let fixture: ComponentFixture<LightNovelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LightNovelFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LightNovelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
