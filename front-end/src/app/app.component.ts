import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Account, SystemRole } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    SystemRole = SystemRole;
    account: Account;

    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => {this.account = x
        console.log("acc",this.account.systemRole)});
    }

    logout() {
        this.accountService.logout();
    }
}
