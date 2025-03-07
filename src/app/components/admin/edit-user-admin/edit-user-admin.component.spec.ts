import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAdminComponent } from './edit-user-admin.component';

describe('EditUserAdminComponent', () => {
  let component: EditUserAdminComponent;
  let fixture: ComponentFixture<EditUserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
