import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CiudadEstado } from '../models/ciudadEstado';
import { Contacto } from '../models/contacto';
import { FormGroup } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})




export class ContactoService {

  AppUrl = 'https://localhost:44321/';
  ApiUrlContacto = '/api/Contacto/PostContacto';
  ApiURLCiudad = '/api/CiudadEstado';
  ApiURLSendCorreo = '/api/Contacto/SendMail';
  // baseUrl: string;

  constructor(private http: HttpClient) {

  }

  public GetCiudades(): Observable<CiudadEstado[]> {
    return this.http.get<CiudadEstado[]>(this.ApiURLCiudad);
  }

  public SendMail(To: string, name: string, mail: string, date: string, place: string) {
    this.http.post(this.ApiURLSendCorreo, {
      "To": To,
      "Name": name,
      "Mail": mail,
      "Date": date,
      "Place": place
    }, httpOptions).subscribe(result => {
      console.log(result);
    }, error => console.error(error)
    );
  }

  public SendMailDefaukt(To: string, name: string, mail: string, date: string, place: string) {
    this.http.post(this.ApiURLSendCorreo, {
      "To": To,
      "Name": name,
      "Mail": mail,
      "Date": date,
      "Place": place
    }, httpOptions).subscribe(result => {
      console.log(result);
    }, error => console.error(error)
    );
  }


  public GuardarContacto(nombre: string, email: string, tel: string, fecha: Date, ciudadEst: string, form: FormGroup) {
    //  return this.http.post<Contacto>( this.ApiUrlContacto, contacto);
    this.http.post(this.ApiUrlContacto, {
      'Nombre': nombre,
      'Email': email,
      'Telefono': tel,
      'Fecha': fecha,
      'CiudadEst': ciudadEst
    }, httpOptions).subscribe(result => {
      console.log(result);
      form.reset();
      this.SendMailDefaukt("flaria@ectotec.com", nombre, email, fecha.toString(), ciudadEst);
      this.SendMail(email, nombre, email, fecha.toString(), ciudadEst);
    }, error => console.error(error)
    );
  }

}
