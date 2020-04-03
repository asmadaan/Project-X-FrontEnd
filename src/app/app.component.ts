import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ConfigService } from './config.service';
// import { SettingsService } from './settings.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    totalAngularPackages;
    emp:JSON;
    image : any;

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

    base64Image: any;
    rr : any;
    rprediction : any;
    rmonte : any;
    async delay(ms: number) {
      await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

    ngOnInit() {
      let imageUrl = 'http://localhost:5000/get_image';
      let r = 'http://localhost:5000/r';
      // let prediction = 'http://localhost:5000/prediction';
      let monte = 'http://localhost:5000/monte';
      

  
      this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
        console.log(base64data);
        this.base64Image = 'data:image/jpg;base64,' + base64data;
      });
      // this.delay(3000).then(any=>{
      this.getBase64ImageFromURL(r).subscribe(base64dat => {
        console.log(base64dat);
        this.rr = 'data:image/jpg;base64,' + base64dat;
      });
      // this.getBase64ImageFromURL(prediction).subscribe(base64da => {
      //   console.log(base64da);
      //   this.rprediction = 'data:image/jpg;base64,' + base64da;
      // });
      this.getBase64ImageFromURL(monte).subscribe(base64d => {
        console.log(base64d);
        this.rmonte = 'data:image/jpg;base64,' + base64d;
      });
    // });
    }
  
    getBase64ImageFromURL(url: string) {
      return Observable.create((observer: Observer<string>) => {
        let img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;  img.src = url;
        if (!img.complete) {
          img.onload = () => {
            observer.next(this.getBase64Image(img));
            observer.complete();
          };
          img.onerror = (err) => {
            observer.error(err);
          };
        } else {
          observer.next(this.getBase64Image(img));
          observer.complete();
        }
      });
    }
  
    getBase64Image(img: HTMLImageElement) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      console.log(dataURL);
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
  //   ngOnInit() {     
  //     // getData()
  //     // .subscribe((baseImage : any) => {
  //     //   //alert(JSON.stringify(data.image));
  //     //   let objectURL = 'http://localhost:5000/get_image?type=2' ;//+ baseImage.image;

  //     //    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
       
  //     // });

  //     this.http.get('http://localhost:5000/get_image?type=2', {
  //     responseType: "blob"
  //   }).subscribe(d => {
  //     this.image = d;
  //   });
         
  //     this.http.get('http://localhost:5000/employees').subscribe(data => {
  //     this.emp = data as JSON;
  //     console.log(this.emp);
      
  //   })
  // } 

  // pic(){
    
      
  // }
  
        // Simple GET request with response type <any>
    //     this.http.get<any>('/add?n1=1&n2=2').subscribe(data => {
    //         this.totalAngularPackages = data.total as JSON;
    //         console.log("yo");
    //         console.log(this.totalAngularPackages);
    //     })
    // }
}
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app';
// }
