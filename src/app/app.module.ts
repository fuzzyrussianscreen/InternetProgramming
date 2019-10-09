import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { OrderComponent } from './order/order.component';
import { ExamplesComponent } from './examples/examples.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  {
    path: 'examples',
    component: ExamplesComponent,
    data: { title: 'Товары' }
  },
  {
    path: 'order',
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
    MainComponent
  ],
  imports: [
      RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
