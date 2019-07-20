import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-directiva",
  templateUrl: "./directiva.component.html",
  styleUrls: ["./directiva.component.scss"]
})
export class DirectivaComponent implements OnInit {
  listaCurso = ["TypeScript", "JavaScript", "Java SE", "C#", "PHP"];
  habilitar = true;

  constructor() {}

  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;
  }

  ngOnInit() {}
}
