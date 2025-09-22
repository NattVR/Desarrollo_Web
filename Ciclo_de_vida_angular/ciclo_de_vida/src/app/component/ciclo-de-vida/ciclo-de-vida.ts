import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ciclo-de-vida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ciclo-de-vida.html',
  styleUrl: './ciclo-de-vida.css'
})

export class CicloDeVida implements 
  OnChanges, OnInit, DoCheck, 
  AfterContentInit, AfterContentChecked, 
  AfterViewInit, AfterViewChecked, 
  OnDestroy {

  @Input() mensaje: string = '';
  contador:number;

  @ViewChild('contadorRef') contadorRef!: ElementRef;

  constructor() {
    this.contador= 0
    console.log("Constructor: el componente fue creado");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("gOnChanges: cambios detectados en @Input", changes);
  }

  ngOnInit() {
    console.log("ngOnInit: inicializando el componente");
    this.mensaje = this.mensaje + ' (datos iniciales cargados)';
  }

  
  ngDoCheck() {
    console.log("ngDoCheck: verificación de cambios");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit: contenido proyectado inicializado");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked: contenido proyectado verificado");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit: la vista fue inicializada");
    this.contadorRef.nativeElement.style.color = "red";
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked: la vista fue verificada");

  }

  ngOnDestroy() {
    console.log("ngOnDestroy: limpiando recursos");
  }

  aumentar() {
    this.contador += 1;
  }
}
