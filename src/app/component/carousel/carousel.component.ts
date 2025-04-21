import { Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-carousel',
  standalone:true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  ngOnInit() {
    // Khởi tạo carousel với auto-slide
    this.initCarousel();
  }

  private initCarousel() {
    // Đảm bảo DOM đã load xong
    document.addEventListener('DOMContentLoaded', () => {
      const myCarousel = document.getElementById('homeCarousel');
      if (myCarousel) {
        new bootstrap.Carousel(myCarousel, {
          interval: 2000, // Thời gian chuyển slide 
          wrap: true,     // Cho phép quay vòng
          ride: 'carousel', // Tự động chạy
          touch: true     // Cho phép touch trên mobile
        });
      }
    });
  }
}
