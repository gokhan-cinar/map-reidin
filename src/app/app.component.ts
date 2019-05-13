import { UserService } from './_services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    users: User[] = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.getUser();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    //get user
    getUser() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}