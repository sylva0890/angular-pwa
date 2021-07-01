import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;
  fontawesome = environment.application.fontawesome;

  features: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.initPermission();

    this.features =
      [
        {
          name: 'Items',
          description: 'Items',
          icon: 'fab fa-bootstrap',
          link: 'httpclient'
        },
        {
          name: 'Bootstrap',
          description: 'Bootstrap Prototype Description',
          icon: 'fab fa-bootstrap',
          link: 'bootstrap'
        },
        {
          name: 'Reactive Form',
          description: 'Reactive Form Description',
          icon: 'fab fa-bootstrap',
          link: 'reactive-form'
        },
        {
          name: 'Services',
          description: 'Services Description',
          icon: 'fab fa-bootstrap',
          link: 'services'
        },
        {
          name: 'Components',
          description: 'Components Description',
          icon: 'fab fa-bootstrap',
          link: 'components'
        },
        {
          name: 'Template Driven Forms',
          description: 'Template Driven Forms Description',
          icon: 'fab fa-bootstrap',
          link: 'template-driven-forms'
        },
      ];

  }

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    console.log(JSON.stringify(coordinates));
  };

  async initPermission() {
    console.log('initPermission');
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const cam = await Camera.checkPermissions();
    let coordinates = await Geolocation.checkPermissions();
    console.log('initPermission coordinates');
    console.log(JSON.stringify(coordinates));
    console.log(coordinates.location === 'granted');
    console.log('initPermission cam');
    console.log(JSON.stringify(cam));
    if (coordinates.location === 'granted') {
      this.printCurrentPosition();
    } else {
      coordinates = await Geolocation.requestPermissions();
    }
  }

  loadScript(name: string): void {

    if (isPlatformBrowser(this.platformId)) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = name;
      s.async = false;
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }

}
