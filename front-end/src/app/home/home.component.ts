import { Component,OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'home.component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],

 })
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('mainCanvas') canvasElem: ElementRef;

  @ViewChild('drawText') drawTextElem: ElementRef;
  @ViewChild('drawRectangle') drawRectangleElem: ElementRef;
  layers: any[];

  
  value = false;

    ngOnInit(): void {
      this.layers = [{
        id: 0,
        name:"Rectangle",
        color: "red",
        x: 0,
        y: 0,
        width:0,
        height:0, 
      },
      {
        id:1,
        name:"Rectangle",
        color: "red",
        x: 0,
        y: 0,
        width:0,
        height:0, 
      },{
        id:1,
        name:"Rectangle",
        color: "red",
        x: 0,
        y: 0,
        width:0,
        height:0, 
      }]; 


    }
    ngAfterViewInit(): void {
  
      let mouseUpDown ;
      let expression = "empty";
      let objWidth = 80;
      let objHeight = 80;
      let objWidthCount = 0;
      let objHeightCount = 0;
      let objClickX;
      let objClickY;
      const canvas = this.canvasElem.nativeElement;
      const drawText = this.drawTextElem.nativeElement;
      const drawRectangle = this.drawRectangleElem.nativeElement;

      let ctx = canvas.getContext('2d');

      canvas.addEventListener("mousedown", getPosition, false);
      canvas.addEventListener("mousemove", getMove, false);
      canvas.addEventListener("mouseup", getMouseUp, false);
      drawText.addEventListener("mousedown", getDrawText, false);
      drawRectangle.addEventListener("mousedown", getDrawRectangle, false);

      function getDrawText(event){expression = drawText.value;}
      function getDrawRectangle(event){expression = drawRectangle.value;}

      function getMouseUp(){
        mouseUpDown = false;
        console.log("in the mouse up",mouseUpDown);

        switch(expression) {
          case "text":
            let text = "Welcome to HTML  - 5";
            ctx.font = '22px Arial';
            ctx.fillText(text, objClickX,objClickY);
            break;
          case "rectangle":
            ctx.fillStyle = "green";
            ctx.fillRect(objClickX,objClickY,objWidth,objHeight);
            console.log(ctx.fillRect);
            
            break;
          default:
            console.log("uuu : ",this.expression );
        }

        objWidth = 80;
        objHeight = 80;
      }

      function getMove(event){
        if(mouseUpDown == true){
          console.log("in the mouse move");
          console.log(event);
          objWidth = event.x - objWidthCount;
          objHeight = event.y - objHeightCount;
          console.log("x "+objClickX + " y"+objClickY+ " xm "+objWidth+ " ym"+ objHeight);
          
        }

      }
      function getPosition(event)
      {
        console.log(event);
        mouseUpDown = true;
        console.log("in the mouse down",mouseUpDown);
        objWidthCount = event.x;
        objHeightCount = event.y;
        objClickX = event.x;
        objClickY = event.y;
        var canvas = document.getElementById("canvas");
        objClickX -= canvas.offsetLeft+291;
        objClickY -= canvas.offsetTop+48-12;


        
      }
      console.log(ctx);
    }

    drawLine(){
      const canvas = this.canvasElem.nativeElement;
      let ctx = canvas.getContext('2d');

      ctx.moveTo(100,0);

      ctx.lineTo(200,100);

      ctx.stroke();
    }
    drawCircle(){
      const canvas = this.canvasElem.nativeElement;
      let ctx = canvas.getContext('2d');

      ctx.arc(100,100,60,0,2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();

      ctx.stroke();
    }
    clear(){
      const canvas = this.canvasElem.nativeElement;
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    drawPath(){
      const canvas = this.canvasElem.nativeElement;
      let ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(10,10);
      ctx.lineTo(100,10)
      ctx.lineTo(100,100)
      ctx.lineTo(10,100)
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();

    }
  

    drawImage(){
      const canvas = this.canvasElem.nativeElement;
      let ctx = canvas.getContext('2d');

      let x = 10;
      let y = 20;

      let width = 200;
      let height = 300;

      var profilePicture = new Image();

      profilePicture.onload = () => {
        ctx.drawImage(profilePicture,x,y,width,height);


      };

      profilePicture.src = "../../assets/profile.jpg";

    }
    counter = 0;

    handleMouseDown(event){

        this.setDrawing(true);
     };

     setDrawing(value){
      var Value = value;
      console.log("mouseDown")
      return Value;
     }

}
