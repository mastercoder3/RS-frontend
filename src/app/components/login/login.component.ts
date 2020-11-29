import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  response;

  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService, private router: Router) { 
    if(localStorage.getItem('userId') && localStorage.getItem('token')){
      this.router.navigate(['/locations']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  login(form) {
    this.api.login(form.value.email, form.value.password).
      subscribe(response => {
        console.log('response', response);
        this.response = response;
        localStorage.setItem('userId', this.response.user._id);
        localStorage.setItem('token', this.response.token);
        this.toastr.success('Login successful');
        this.router.navigate(['/locations']);
      }, err => this.toastr.error(err) );
  }

}
