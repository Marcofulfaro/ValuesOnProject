import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/demo/service/register.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {

    registerForm!: FormGroup;
    subscription!: Subscription;

    constructor(
        public layoutService: LayoutService, 
        private formBuilder: FormBuilder, 
        private registerService: RegisterService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.registerForm = this.formBuilder.group({
            mail: [null, Validators.required], 
            nome: [null, Validators.required], 
            cognome: [null, Validators.required], 
            password: [null, Validators.required]
        })
    }

    executeRegister() {
        if(this.registerForm.valid) {
        this.subscription = this.registerService.callRegisterService(this.registerForm.value).subscribe({
            next: (response) => {
                this.router.navigate(['/auth/login']);
              }, 
              error: (errorResponse) => {
                alert('Errore nella registrazione. Verificare la console');
                console.log(errorResponse);
              }
            })
        } else {
            alert('Inserire tutti i dati necessari');
        }
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe;
    }
}
