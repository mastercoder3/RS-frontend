import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  response;

  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService, private router: Router) { 
    if(localStorage.getItem('userId') && localStorage.getItem('token')){
      this.router.navigate(['/locations']);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  signup(form) {
    this.api.signup(
      form.value.name,
      form.value.email,
      form.value.password
      )
      .subscribe(data => {
        this.response = data;
        console.log(data);
        localStorage.setItem('userId', this.response.user._id);
        this.api.setToken(this.response.token);
        this.toastr.success('Signup Sucessfull');
        this.router.navigate(['/locations']);

      }, err => {
        this.toastr.error('Something went wrong:'+err,'Error! signup failed');

      })
  }

}
