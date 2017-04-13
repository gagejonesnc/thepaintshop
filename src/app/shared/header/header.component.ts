import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ps-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('toggle_1', [
      state('i-1', style({
        backgroundColor: '#333',
        transform: 'rotate(0deg)'
      })),
      state('a-1', style({
        backgroundColor: 'white',
        transform: 'rotate(135deg) translateY(-18px)'
      })),
      transition('i-1 <=> a-1', animate(300))
    ]),
    trigger('toggle_2', [
      state('i-2', style({
        backgroundColor: '#333',
        transform: 'translateX(0px)'
      })),
      state('a-2', style({
        backgroundColor: 'white',
        opacity: '0',
        transform: 'translateX(-60px)'
      })),
      transition('i-2 <=> a-2', animate(150))
    ]),
    trigger('toggle_3', [
      state('i-3', style({
        backgroundColor: '#333',
        transform: 'rotate(0deg)'
      })),
      state('a-3', style({
        backgroundColor: 'white',
        transform: 'rotate(-135deg) translateY(18px)'
      })),
      transition('i-3 <=> a-3', animate(300))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  s_1 = 'i-1'; // initial state is inactive
  s_2 = 'i-2';
  s_3 = 'i-3';


  onAnimate() {
    this.s_1 === 'i-1' ? this.s_1 = 'a-1' : this.s_1 = 'i-1';
    this.s_2 === 'i-2' ? this.s_2 = 'a-2' : this.s_2 = 'i-2';
    this.s_3 === 'i-3' ? this.s_3 = 'a-3' : this.s_3 = 'i-3';
  }
  constructor() { }

  ngOnInit() {
  }
}
