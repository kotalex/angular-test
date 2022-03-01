import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Observable, zipWith } from 'rxjs';
import { zip } from 'rxjs/operators';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppState } from 'src/app/store';
import { AuthState } from 'src/app/store/auth/auth.state';
import { GetTasks } from 'src/app/store/tasks/tasks.actions';
import { TasksState } from 'src/app/store/tasks/tasks.state';
import { GetUsers } from 'src/app/store/users/users.actions';
import { UsersState } from 'src/app/store/users/users.state';
import { taskMock } from 'src/app/utils/mocks/task.mock';
import { userMock } from 'src/app/utils/mocks/user.mock';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store;
  let actions$: Observable<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(AppState), SharedModule, HttpClientModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch').withArgs(new GetTasks()).and.stub();

    spyOn(store, 'select').and.returnValue(of(userMock));

    Object.defineProperty(component, 'tasks$', { writable: true });
    component.tasks$ = of([taskMock]);

    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch GetTasks action', () => {
    expect(store.dispatch).toHaveBeenCalled();
  });

  it(`should display a hello message for user`, () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent.trim()).toContain(userMock.firstName);
  });

  it(`should display user's tasks`, () => {
    const taskCardTitle = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(taskCardTitle.textContent.trim()).toContain(taskMock.name);
  });
});
