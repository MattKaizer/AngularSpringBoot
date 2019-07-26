import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo = 'Formulario Cliente';
  private errores: string[];

  constructor(private clienteService: ClientesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
        const id = params[`id`];
        if (id) {
          this.clienteService.getCliente(id).subscribe(
            (cliente) => this.cliente = cliente);
        }
      }
    );
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']),
        swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

}
