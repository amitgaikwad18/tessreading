import { Component, enableProdMode, ErrorHandler } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js';
import { OcrProvider } from '../../providers/ocr/ocr';


enableProdMode();

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public base64Image: string;
  selectedImage: string;
  imageText: string;

  // public ocr: OcrProvider;

  constructor(public navCtrl: NavController, private camera:Camera, public loadingCtrl: LoadingController, private actionSheetCtrl: ActionSheetController, public ocrProvider: OcrProvider) {

  };

  public loader: LoadingController;

  selectSource()
  {
  let imgOptions = {
    destinationType   : this.camera.DestinationType.DATA_URL,
    sourceType        : this.camera.PictureSourceType.PHOTOLIBRARY
  };

    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
        text: 'Choose Photo',
        handler: () => {
          this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Take Photo',
        handler: () => {
          this.getPicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Cancel',
        handler: () => {
            this.navCtrl.setRoot(HomePage);
            this.navCtrl.popToRoot;
        }
      }]

    });
    actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType)
  {
    this.camera.getPicture(
      {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: true
     }).then(
       (imageData) => {
         this.selectedImage = 'data:image/jpeg;base64,' + imageData;  
       });
  }

  recognizeImage()
  {
    // let ocr:OcrProvider = new OcrProvider();
      let ocr = this.ocrProvider;
      
      ocr.recognizeText(this.selectedImage);

    // this.imageText = OcrProvider.prototype.imageText;
    // Tesseract.recognize(this.selectedImage)
    // .progress(message => {
    //   console.log(message.status);
    //   if(message.status === 'recognizing text')
    //   this.presentLoading();
    // }).catch(err => console.error(err))
    // .then(result => {
    //   this.imageText = result.text;
    // })
    // .finally(resultOrErr => {
    // });
  }

  // presentLoading() {
  //   let loading = this.loadingCtrl.create({
  //     content: "Please wait...",
  //     duration: 3000
  //   });

  //   loading.present();
    
  // }

}
