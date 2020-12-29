import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { NgChartjsModule } from 'ng-chartjs';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebase } from '@firebase/app';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
firebase.initializeApp(environment.firebase)
@NgModule({
  declarations: [DeleteConfirmComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    BsDatepickerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireAuthModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BsDatepickerModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgChartjsModule
  ]
})
export class SharedModule { }
