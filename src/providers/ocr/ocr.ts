import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Tesseract from 'tesseract.js';

/*
  Generated class for the OcrProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OcrProvider {

  private readonly tesseract;
  imageText: string;

  constructor() {
    console.log('Hello OcrProvider Provider');

    this.tesseract = Tesseract.create({
      workerPath: '../../assets/lib/tesseract-js-worker.js',
      langPath: '../../assets/lib/lang/tesseract-js-',
      corePath: '../../assets/lib/tesseract-js-core.js',
    });
  }

  public recognizeText(image) {
    //console.log(image);
    // const tesseractConfig = {
    //   // If you want to set the language explicitly:
    //   lang: 'eng', 
    //   // You can play around with half-documented options:
    //   tessedit_char_whitelist: ' 0123456789',
    // };
    console.log(this.tesseract.workerPath);
    console.log(this.tesseract.langPath);
    console.log(this.tesseract.corePath);

    this.tesseract.recognize(image)
      .progress((v) => {
        // v.status is a textual string of what Tesseract is doing
        // v.progress is a 0 - 1 decimal representation of the progress.
        // The progress resets for each new v.status,
        // but the major event is v.status == "recognizing text".
        console.log(v.status, v.status.progress);
      })
      .catch((err) => {
        console.error('OcrProvider: Failed to analyze text.', err);
      })
      .then((result) => {
        // Result contains these elements:
        // blocks: Array
        // confidence: 0 - 100
        // html: string
        // lines: string[]
        // oem: "DEFAULT"
        // paragraphs: string[]
        // psm: "SINGLE_BLOCK"
        // symbols: Array
        // text: string
        // version: "3.04.00"
        // words: string[]
        // I chose to use a regex to find the 
        // correct format out of result.text. 
        this.imageText = result.text;
      });
  }

}
