import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { OrderComponent } from './order/order.component';
import { ExamplesComponent } from './examples/examples.component';
import { MainComponent } from './main/main.component';
import { MaterialListComponent } from './order/material-list/material-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './user/shared/user.service';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserComponent } from './user/user.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {
    path: 'examples',
    component: ExamplesComponent,
    data: { title: 'Товары' }
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: { title: 'Контакты' }
  },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },

  {
    path: '',
    component: MainComponent,
    data: { title: 'Главная' }
  },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    OrderComponent,
    ExamplesComponent,
    MainComponent,
    MaterialListComponent,
    SignUpComponent,
    SignInComponent,
    UserComponent,
    FileSelectDirective
  ],
  imports: [
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
