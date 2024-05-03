import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {provideRouter} from "@angular/router";
import {routes} from "../app.routes";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
      ],
      providers: [provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind username to input field', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const testUsername = 'testUser';
    inputElement.value = testUsername;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.username).toEqual(testUsername);
  });
});
