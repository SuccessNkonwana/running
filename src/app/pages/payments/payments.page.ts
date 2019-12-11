import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  user = {} as User;
  public paymentsForm: FormGroup;
  constructor(private fb: FormBuilder) { 

     
    this.paymentsForm = fb.group({
       
      name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      number: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(3), Validators.required])],
      date: ['', Validators.required],
      card: ['', Validators.compose([Validators.minLength(16), Validators.maxLength(16), Validators.required])],
      

    },
    );

  }

  ngOnInit() {
  }

}
