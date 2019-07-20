import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { clientes } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor() {}

  getClientes(): Array<Cliente> {
    return clientes;
  }
}
