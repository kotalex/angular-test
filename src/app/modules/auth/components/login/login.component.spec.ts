import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { AppState } from 'src/app/store';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;
  let actions$: Observable<any>;
  let submitButton: any;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        NgxsModule.forRoot(AppState),
        NgxsRouterPluginModule.forRoot(),
        RouterTestingModule,
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login form', () => {
    fixture.debugElement.query(By.css('#login_form'))
  });

  it('should not submit set the form invalid if no data set', () => {
    spyOn(component, 'onSubmit');

    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.form.invalid).toBeTruthy();
  });

  it('should submit the login form successfully', () => {
    spyOn(component, 'onSubmit');

    component.form.controls['email'].setValue('admin@user.com');
    component.form.controls['password'].setValue('test1234');
    expect(component.form.valid).toBeTruthy();

    submitButton.click();
  
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
