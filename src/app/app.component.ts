import { Component } from '@angular/core';

@Component({
  selector: 'if-app',
  template: `
    <div class="container">
      <h1>iFlavours assessment application</h1>
      <router-outlet></router-outlet>
    </div>`
})
export class AppComponent { }
