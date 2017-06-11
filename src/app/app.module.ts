import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserDetailComponent } from './components/user-detail.page';
import { UserListComponent } from './components/user-list.page';
import { UserService } from './servises/user.service';
import { UserRolesResolverService } from './servises/roles-resolver.service';
import { CheckboxListComponent } from './components/checkbox-list.component';

const appRoutes: Routes = [
  {
    path: 'users/:id',
    component: UserDetailComponent,
    resolve: {
      allRoles: UserRolesResolverService
    }
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [BrowserModule, HttpModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, UserDetailComponent, UserListComponent, CheckboxListComponent],
  providers: [UserService, UserRolesResolverService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
