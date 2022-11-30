import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {MatNativeDateModule} from '@angular/material/core';
import { ContactoService } from './services/contacto.service';



import { ToastrModule } from 'ngx-toastr';

const MATERIAL_MODULES = [
MatAutocompleteModule,
MatButtonModule,
MatButtonToggleModule,
MatCardModule,
MatChipsModule,
MatCheckboxModule,
MatDatepickerModule,
MatTableModule,
MatDialogModule,
MatFormFieldModule,
MatGridListModule,
MatIconModule,
MatInputModule,
MatListModule,
MatMenuModule,
MatPaginatorModule,
MatProgressBarModule,
MatProgressSpinnerModule,
MatRippleModule,
MatSelectModule,
MatSidenavModule,
MatSliderModule,
MatSlideToggleModule,
MatSnackBarModule,
MatSortModule,
MatStepperModule,
MatToolbarModule,
MatTooltipModule,
MatCommonModule,
MatNativeDateModule,
HttpClientModule,
ToastrModule.forRoot(),
];


@NgModule({
  declarations: [
    AppComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MATERIAL_MODULES
  ],
  providers: [ContactoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
