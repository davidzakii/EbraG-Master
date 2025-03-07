import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  generatePDF(): void {
    const content = document.body;
    if (content) {
      // التأكد من تحميل جميع الصور
      const images = content.getElementsByTagName('img');
      const promises = Array.from(images).map((img) => {
        return new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        });
      });

      // تحميل صورة QR code بشكل صريح
      const qrCodeImg = new Image();
      qrCodeImg.src = this.qrCodeImgUrl;
      const qrCodePromise = new Promise<void>((resolve) => {
        qrCodeImg.onload = () => resolve();
        qrCodeImg.onerror = () => resolve();
      });

      // إضافة صورة QR code إلى الصفحة
      content.appendChild(qrCodeImg);

      // بعد تحميل جميع الصور، أخذ لقطة الشاشة وتوليد ملف PDF
      Promise.all([...promises, qrCodePromise]).then(() => {
        html2canvas(content).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const doc = new jsPDF();
          doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
          doc.save('page.pdf');

          // إزالة صورة QR code من الصفحة بعد توليد ملف PDF
          content.removeChild(qrCodeImg);
        });
      });
    }
  }
}
