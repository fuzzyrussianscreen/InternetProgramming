import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';
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


const appRoutes: Routes = [
  {
    path: 'examples',
    component: ExamplesComponent,
    data: { title: 'Товары' }
  },
  {
    path: 'orders',
    component: OrderComponent,
    data: { title: 'Прайс' }
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: { title: 'Контакты' }
},
  {
    path: 'main',
    component: MainComponent,
    data: { title: 'Главная' }
},
  {
    path: '',
    component: MainComponent,
    data: { title: 'Главная' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    OrderComponent,
    ExamplesComponent,
    MainComponent,
    MaterialListComponent
  ],
  imports: [
      ToastrModule.forRoot(),
      RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
