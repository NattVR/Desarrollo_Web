import { Component, signal,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  vidaJugador1 = signal(100)

  vidaJugador2 = signal(100)

  turno = signal(Math.floor(Math.random() * 2) + 1);

  ngOnInit() {
    console.log('Componente inicializado');
    Swal.fire({
      title: 'Bienvenido a Battlefield',
      text: '¡Prepárate para la batalla! Empieza el Jugador ' + this.turno(),
      confirmButtonText: 'Listo',
      background: '#383838ff',
      color: 'rgba(255, 255, 255, 1)',
      customClass: {
        popup: 'swal-personalizado',
        title: 'swal-titulo',
        confirmButton: 'swal-boton'
      }
    });
  }


  Atacar() {
    console.log ("atacar")
    let ataque = Math.floor(Math.random() * 100);

    if(this.turno() === 1) {
      this.vidaJugador2.update(vidaJugador2 => vidaJugador2 -= ataque);
      this.turno.set(2);
      this.MensajeTurno();
      this.VerificarGanador();
    }
    else{
      this.vidaJugador1.update(vidaJugador1 => vidaJugador1 -= ataque);
      this.turno.set(1);
      this.MensajeTurno();
      this.VerificarGanador();
    };
  
  }


  ReiniciarJuego() {
    this.vidaJugador1.set(100);
    this.vidaJugador2.set(100);
    this.ngOnInit();
  }

  
  VerificarGanador() {
    if (this.vidaJugador1() <= 0) {
      this.ReiniciarJuego();
      console.log('Jugador 2 gana!');
      this.MensajeFinDeJuego();
    } else if (this.vidaJugador2() <= 0) {
      this.ReiniciarJuego();
      console.log('Jugador 1 gana!');
      this.MensajeFinDeJuego();
    }

  };

  MensajeFinDeJuego() {
  Swal.fire({
    title: 'Ganador: ' + (this.vidaJugador1() <= 0 ? 'Jugador 2' : 'Jugador 1'),
    text: '¡El juego ha terminado!',
    confirmButtonText: 'Reiniciar',
    background: '#383838ff',
    color: 'rgba(255, 255, 255, 1)',
    customClass: {
      popup: 'swal-personalizado',
      title: 'swal-titulo',
      confirmButton: 'swal-boton'
    }
  }).then(() => {
    this.ReiniciarJuego();
    });
  };

  MensajeTurno(){
    Swal.fire({
      title: 'Turno del Jugador ' + this.turno(),
      text: 'Es tu turno para atacar',
      allowOutsideClick: true,
      background: '#383838ff',
      color: 'rgba(255, 255, 255, 1)',
      customClass: {
      popup: 'swal-personalizado',
      title: 'swal-titulo',
      confirmButton: 'swal-boton'
      }
    })
  }


  
}
