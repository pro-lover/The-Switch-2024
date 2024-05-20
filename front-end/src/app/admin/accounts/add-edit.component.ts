import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

import { SystemRole ,CompanyRole, DepartmentRole , DepartmentCategory,WorkersPosition } from '@app/_models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    systemRole:string[]=[""];
    companyRole:string[]=[""];
    departmentCategory:string[]=[""];
    departmentRole:string[]=[""];
    workersPosition:string[]=[""];


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        for (const [key, value] of Object.entries(WorkersPosition)) {
          this.workersPosition.push(value);
        }
        for (const [key, value] of Object.entries(SystemRole)) {
          this.systemRole.push(value);
        }

        for (const [key, value] of Object.entries(CompanyRole)) {
          this.companyRole.push(value);
        }
        for (const [key, value] of Object.entries(DepartmentRole)) {
          this.departmentCategory.push(value);
        }

        for (const [key, value] of Object.entries(DepartmentCategory)) {
          this.departmentRole.push(value);
        }

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            systemRole: ['', Validators.required],
            companyRole: ['', Validators.required],
            workersPosition: ['', Validators.required],
            departmentCategory: ['', Validators.required],
            departmentRole: ['', Validators.required],
            moneyIn:['', Validators.required],
            moneyOut:['', Validators.required],
            password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
            confirmPassword: ['']
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });

        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        console.log('onSubmit');
        console.log(this.form);
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createAccount();
        } else {
            this.updateAccount();
        }
    }

    private createAccount() {
        this.accountService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Account created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateAccount() {
        this.accountService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
