import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightNovelDetailsComponent } from './light-novel-details.component';

describe('LightNovelDetailsComponent', () => {
  let component: LightNovelDetailsComponent;
  let fixture: ComponentFixture<LightNovelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LightNovelDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LightNovelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
