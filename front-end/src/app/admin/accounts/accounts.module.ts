import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AccountsRoutingModule } from './accounts-routing.module';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountsRoutingModule,

    ],
    declarations: [
        AddEditComponent
    ]
})
export class AccountsModule { }
