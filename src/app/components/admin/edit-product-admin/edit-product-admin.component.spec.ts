import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductAdminComponent } from './edit-product-admin.component';

describe('EditProductAdminComponent', () => {
  let component: EditProductAdminComponent;
  let fixture: ComponentFixture<EditProductAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
