import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLightNovelComponent } from './my-light-novel.component';

describe('MyLightNovelComponent', () => {
  let component: MyLightNovelComponent;
  let fixture: ComponentFixture<MyLightNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyLightNovelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyLightNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
