import { AfterViewInit, Component } from '@angular/core';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.from('#title', {
      opacity: 0,
      y: -50,
      duration: 1,
      scrollTrigger: {
        trigger: '#title',
        start: 'top 80%',
      },
    });

    gsap.from('#about', {
      opacity: 0,
      x: -100,
      duration: 1,
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
      },
    });

    gsap.from('#contact', {
      opacity: 0,
      x: 100,
      duration: 1,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
      },
    });
  }
}
