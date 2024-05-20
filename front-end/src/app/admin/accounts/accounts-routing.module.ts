import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes),
      MatExpansionModule,
      MatTableModule,
      MatInputModule,
      MatFormFieldModule
    ],
    exports: [
      RouterModule,
      MatTableModule,
      MatInputModule,
      MatFormFieldModule
    ]
})
export class AccountsRoutingModule { }
