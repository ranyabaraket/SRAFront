import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    imports: [
        MatSelectModule,
        FormsModule,
        MatTableModule,
        MatAutocompleteModule,
        MatSortModule,
        MatTabsModule,
        MatBadgeModule,
        MatStepperModule,
        MatDialogModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,

    ],
    exports: [
        FormsModule,
        MatSelectModule,
        MatTableModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatSortModule,
        MatTabsModule,
        MatBadgeModule,
        MatStepperModule,
        MatDialogModule,
        MatFormFieldModule,

    ]
})
export class MaterialModule { }
