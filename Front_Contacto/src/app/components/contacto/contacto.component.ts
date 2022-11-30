import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, EmailValidator} from '@angular/forms'
import {MatDatepicker, MatDatepickerToggle} from '@angular/material/datepicker'
import { MatFormField , MatLabel} from '@angular/material/form-field'
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ContactoService } from '../../services/contacto.service';
import { Contacto } from 'src/app/models/contacto';
import { Injectable ,Inject} from '@angular/core';
import { Observable } from 'rxjs';
import { CiudadEstado } from 'src/app/models/ciudadEstado';
import {map, startWith} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'd,MMM, y',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ContactoComponent implements OnInit {


  tittle = 'Green Leaves';
  form: FormGroup;
  public lstCiudades: Observable<CiudadEstado[]>;
  myControl = new FormControl();
  minDate: Date;
  maxDate: Date;
  options: CiudadEstado[] = [

  ];
  error: string;

  filteredOptions?: Observable<CiudadEstado[]>;

  constructor(private formBuilder: FormBuilder,private contactoService: ContactoService, private toastr: ToastrService) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 100, 11, 31);

    this.error = '';
    this.form = this.formBuilder.group({
      id:0,
      nombre: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: [, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      fecha: [''],
      cuidadEst: ['', Validators.required],
    });

    this.lstCiudades = this.contactoService.GetCiudades();
     this.GetInfo();
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(ciudad: CiudadEstado): string {
    return ciudad && ciudad.nombre ? ciudad.nombre : '';
  }

  private _filter(name: string): CiudadEstado[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }


  public GetInfo(){
    this.lstCiudades = this.contactoService.GetCiudades();
  }
  GuardarContacto(){
    console.log(this.form);

      if (this.form.invalid){
      console.log('Error');
      this.toastr.error('Valide datos','Error en Formulario.')

      if (this.form.get('nombre')?.status == 'INVALID'){
        this.toastr.error('El nombre solo puede contener letras','Error en Formulario.')
      }
      if (this.form.get('nombre')?.value == ''){
        this.toastr.error('El campo nombre no puede estar vacío','Error en Formulario.')
      }
      if (this.form.get('email')?.value == ''){
        this.toastr.error('El campo correo no puede estar vacío','Error en Formulario.')
      }else{
        if (this.form.get('email')?.status == 'INVALID'){
          this.toastr.error('Verifique formato de correo someone@company.com','Error en Formulario.')
        }
      }

      if (this.form.get('tel')?.value == ''){
        this.toastr.error('El campo teléfono no puede estar vacío','Error en Formulario.')
      }else{
        if (this.form.get('tel')?.status == 'INVALID'){
          this.toastr.error('El formato del teléfono son 10 digitos','Error en Formulario.')
        }
      }
      if (this.form.get('fecha')?.value == ''){
        this.toastr.error('El campo fecha no puede estar vacío','Error en Formulario.')
      }else{
        if (this.form.get('fecha')?.status == 'INVALID'){
          this.toastr.error('Verifique formato de fecha 06-Mar-2012','Error en Formulario.')
        }
      }

      if (this.form.get('cuidadEst')?.value == ''){
        this.toastr.error('El campo ciudad y Estado no puede estar vacío','Error en Formulario.')
      }else{
        if (this.form.get('cuidadEst')?.status == 'INVALID'){
          this.toastr.error('Verifique la ciudad o estado','Error en Formulario.')
        }
      }

      return;
    }

    const contacto: Contacto = {
      nombre: this.form.get('nombre')?.value,
      email: this.form.get('email')?.value,
      tel: this.form.get('tel')?.value,
      fecha: this.form.get('fecha')?.value,
      ciudadaEstado: this.form.get('cuidadEst')?.value
    }

    this.contactoService.GuardarContacto(contacto.nombre, contacto.email, contacto.tel, contacto.fecha, contacto.ciudadaEstado, this.form);
    this.toastr.success( 'Recibirás correo de confirmación. Verifica tu bandeja de entrada o SPAM','Registro exitoso');
  }
}
