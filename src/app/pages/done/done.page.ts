import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
  objectA={
    name:''}
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data=>{
      console.log(data);
      this.objectA.name=data.name;
      console.log("the_name:  "+this.objectA.name)
    })
  }


}
