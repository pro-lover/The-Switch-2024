import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Account, CompanyRole } from '@app/_models';


@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
 })
export class ListComponent implements OnInit {
    accounts: any[];
    companyRole:string[]=[""];
    company_clients: any[];
    company_employees: any[];
    company_notPositioned: any[];

    constructor(private accountService: AccountService) {}
    panelOpenState = false;
    ngOnInit() {
      for (const [key, value] of Object.entries(CompanyRole)) {
        this.companyRole.push(value);
      }

      var coll = document.getElementsByClassName("collapsible");
      var i;

        for (i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => {
              this.accounts = accounts;
              this.company_clients = [{}];
              this.company_employees = [{}];
              this.company_notPositioned = [{}];
              let clientCount = 0;
              let employCount = 0;
              let notPodCount = 0;
              for (var c = 0; c < this.accounts.length; c++) {
                 if(this.accounts[c].companyRole == this.companyRole[1])
                 {
                  this.company_clients[clientCount] = this.accounts[c]
                  clientCount = clientCount + 1;

                 }else if(this.accounts[c].companyRole == this.companyRole[2])
                 {
                  this.company_employees[employCount] = this.accounts[c]
                  employCount = employCount + 1;

                }else
                {

                  this.company_notPositioned[notPodCount] = this.accounts[c]
                  notPodCount = notPodCount + 1;

                }

              }

            });
    }

    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id)
            });
    }
}
