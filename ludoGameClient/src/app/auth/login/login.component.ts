import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

function mustContainQuestionMark(control:AbstractControl){
        if(control.value.includes('?')){
          return null;
        }

        return {doesNotContainQuestionMark : true};
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    form = new FormGroup({
        email : new FormControl('',{
          validators:[Validators.email,Validators.required ,mustContainQuestionMark]
        }),
        password : new FormControl('',{
          validators :[Validators.required,Validators.minLength(6)]
        })
    });

    get emailInvalid(){
      return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
    }
    
    get passwordInvalid(){
      return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;
    }

    OnSubmit(){
      console.log(this.form);
      const enteredEmail = this.form.value.email;
      const enteredPass =this.form.value.password;
      console.log(enteredEmail,enteredPass);
    }

    ngOnInit(): void {
      const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
        next:(value)=>{
          window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email}));
        },

      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
}
