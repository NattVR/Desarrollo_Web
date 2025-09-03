import { Component ,inject,} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  router=inject(Router);

  fb=inject(FormBuilder);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin() {
    if (!this.loginForm.valid) {
      alert('Faltan campos por diligenciar');
      return;
    }
    let user = this.loginForm.value;
    console.log(user);
    let userStr = localStorage.getItem(user.username!)

    if (userStr) {
      let userRegistered = JSON.parse(userStr)
      if (userRegistered.password === user.password) {
        alert('Login correcto')
        this.router.navigate(['/home']);
        return;
      }
    }
    alert('Login incorrecta');
  }

}
