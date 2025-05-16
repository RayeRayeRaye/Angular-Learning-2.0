import { AfterViewInit, Component, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private lenis: Lenis | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initLenis();
      this.initAnimations();
    }
  }

  private initLenis(): void {
    this.lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      this.lenis?.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  private initAnimations(): void {
    // Configuración global de ScrollTrigger
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true
    });

    // Animación para el primer título
    gsap.from('#title', {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#title',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        fastScrollEnd: true,
        preventOverlaps: true
      }
    });

    // Animación para cada sección
    gsap.utils.toArray('section').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
          preventOverlaps: true
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}
