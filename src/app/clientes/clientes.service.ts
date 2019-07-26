import { Injectable, LOCALE_ID } from '@angular/core';
import { formatDate, DatePipe, registerLocaleData } from '@angular/common';
import { Cliente } from './cliente';
import { clientes } from './clientes.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlEndPoint = 'http://localhost:9000/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getClientes(page: number): Observable<any> {
    // return of(clientes);
    //retorna un Observable de tipo any asi que hay q castear
    // return this.http.get<Cliente[]>(this.urlEndPoint);
    //O usar un map
    return this.http.get<any>(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        // const clis = response as Cliente[];
        // return clis.map(cli => {
        (response.content as Cliente[]).map(cli => {
          cli.nombre = cli.nombre.toUpperCase();
          cli.createdAt = new DatePipe('es').transform(cli.createdAt, 'EEEE dd, MMMM yyyy');
          // cli.createdAt = formatDate(cli.createdAt, 'dd-MM-yyy', 'en-US');
          return cli;
        });
        return response;
      }
        )
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
