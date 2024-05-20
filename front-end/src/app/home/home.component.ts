import { Component,OnInit, ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'home.component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],

 })
export class HomeComponent implements OnInit {
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;
    ngOnInit(): void {
      const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
  
        ctx.fillStyle = "#D74022";
        ctx.fillRect(0, 0, 70, 150);
  
      }
    }



}
