import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CicloDeVida } from "./component/ciclo-de-vida/ciclo-de-vida";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [CommonModule, FormsModule, CicloDeVida]
})
export class App {
  texto: string = 'Hola desde el padre';
  mostrar: boolean = true;
}