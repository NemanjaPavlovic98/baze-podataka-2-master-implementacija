import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  tabs: any;
  constructor() { }

  ngOnInit(): void {
    this.tabs = [
      {naziv: 'Početna', link: '', icon: 'home'},
      {naziv: 'Dokumenta', link: '', icon: 'receipt_long'},
      {naziv: 'Knjiga tocenja', link: '', icon: 'auto_stories'},
      {naziv: 'Porudzbine', link: '', icon: 'local_shipping'},
      {naziv: 'Preduzece', link: '', icon: 'badge'},
    ]
  }


}
