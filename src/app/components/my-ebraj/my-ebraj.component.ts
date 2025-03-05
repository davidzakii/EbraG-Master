import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-my-ebraj',
  standalone: true,
  imports: [],
  templateUrl: './my-ebraj.component.html',
  styleUrl: './my-ebraj.component.scss',
})
export class MyEbrajComponent implements OnInit {
  qrCodeImgUrl: string = '';
  firstName: string = '';
  lastName: string = '';
  constructor(private loacalStorageService: LocalStorageService) {}
  ngOnInit(): void {
    this.qrCodeImgUrl = JSON.parse(
      this.loacalStorageService.getItem('user') || ''
    ).qrCodeImgUrl;
    this.firstName = JSON.parse(
      this.loacalStorageService.getItem('user') || ''
    ).firstName;
    this.lastName = JSON.parse(
      this.loacalStorageService.getItem('user') || ''
    ).lastName;
  }

  downloadImage() {
    const imgElement = document.querySelector('img');
    if (!imgElement) {
      console.error('No image found on the page.');
      return;
    }
    const imgUrl = imgElement.getAttribute('src');
    if (!imgUrl) {
      console.error('Image source not found.');
      return;
    }
    const element = document.createElement('a');
    element.setAttribute('href', imgUrl);
    element.setAttribute('download', 'image.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  downloadPage() {
    const element = document.createElement('a');
    const htmlContent = document.documentElement.outerHTML;
    const cssContent = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch (e) {
          console.warn(
            'Access to stylesheet %s is denied. Ignoring...',
            styleSheet.href
          );
          return '';
        }
      })
      .join('\n');
    const fullContent = `<style>${cssContent}</style>${htmlContent}`;
    element.setAttribute(
      'href',
      'data:text/html;charset=utf-8,' + encodeURIComponent(fullContent)
    );
    element.setAttribute('download', 'page.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    this.downloadImage();
    element.click();
    document.body.removeChild(element);
  }
}
