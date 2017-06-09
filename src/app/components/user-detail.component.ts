import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { User, UserService } from '../servises/user.service';
import { Role } from '../servises/roles-resolver.service';

@Component({
  selector: 'if-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  isNew = false;
  user: User;
  allRoles: Role[];
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.userForm = this.fb.group({
      id: [''],
      userName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      roles: this.fb.array([])
    });
  }

  ngOnInit() {
    this.allRoles = this.route.snapshot.data['allRoles'];
    this.route.params
      .switchMap((params: Params) => {
        this.isNew = params['id'] === 'new';
        if (this.isNew) {
          return Observable.of({
            userName: '',
            emailAddress: '',
            roles: []
          });
        } else {
          return this.userService.getUser(params['id']);
        }
      })
      .subscribe(user => {
        this.setFormData(user);
      });
  }

  get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  };

  hasRole(id: string): boolean {
    return this.roles.value.indexOf(id) >= 0;
  }

  updateRole(id: string, event) {
    if (event.target.checked) {
      this.roles.push(this.fb.control(id));
    } else {
      this.roles.removeAt(this.roles.value.indexOf(id));
    }
    this.userForm.markAsDirty();
  }

  setRoles(roles: string[]) {
    const roleFGs = roles.map(role => this.fb.control(role));
    this.userForm.setControl('roles', this.fb.array(roleFGs));
  }

  setFormData(user: User) {
    this.user = user;
    this.userForm.reset({
      id: this.user.id,
      userName: this.user.userName,
      emailAddress: this.user.emailAddress
    });
    this.setRoles(this.user.roles || []);
  }

  onSubmit() {
    this.userService.saveUser(this.userForm.value).subscribe(user => {
      if (this.isNew) {
        this.router.navigate(['/users', user.id]);
      } else {
        this.setFormData(user);
      }
    });
    this.ngOnInit();
  }

  revert() {
    this.setFormData(this.user);
  }
}
