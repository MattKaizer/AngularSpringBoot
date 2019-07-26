import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  listaClientes: Array<Cliente>;
  paginator: any;

  constructor(private clienteService: ClientesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      params => {
        let page: number = +params.get('page');

        if (!page) {
          page = 0;
        }

        /* Podria usar un .pipe.tap(this.listaClientes = clientes).subscribe(); */
        this.clienteService.getClientes(page).subscribe(
        /* tengo que meter el content json paginado en lista clientes */
        // (clientes) => this.listaClientes = clientes
        (response => {
            this.listaClientes = response.content as Array<Cliente>;
            this.paginator = response;
        } ));
      }
    );
  }

  delete(cliente: Cliente): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-3'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: `¿Seguro que desea eliminar a ${cliente.nombre} ${cliente.apellido}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'No, cancela!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          (response) => {
            this.listaClientes = this.listaClientes.filter((cli) => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Borrado!',
              `El cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado.`,
              'success'
            );
          }
        );
      }
    });
  }

}
