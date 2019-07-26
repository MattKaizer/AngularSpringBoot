import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginatorChild: any;
  paginas: number[];
  desde: number;
  hasta: number;

  constructor() { }

  ngOnInit() {
    this.initPaginator();
}

  ngOnChanges(changes: SimpleChanges) {
    let paginadorActualizado = changes.paginatorChild;
    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }


  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginatorChild.number - 4), this.paginatorChild.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginatorChild.totalPages, this.paginatorChild.number + 4), 3);

    if (this.paginatorChild.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1)
        .fill(0)
        .map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginatorChild.totalPages)
        .fill(0)
        .map((valor, indice) => indice + 1);
    }
  }

}
