import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.animateTitle();
    this.fadeInParagraphs();
  }
  animateTitle() {
    const title = document.querySelector('h1');
    if (title) {
      const text = "Seja bem-vindo!";
      let index = 0;
      let timer = setInterval(() => {
        title.textContent += text[index];
        index++;
        if (index === text.length) clearInterval(timer);
      }, 100);
    }
  
  }

  fadeInParagraphs() {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach((paragraph, index) => {
      paragraph.style.opacity = '0';
      setTimeout(() => {
        paragraph.style.opacity = '1';
      }, 500 * (index + 1));
    });
  }

}
