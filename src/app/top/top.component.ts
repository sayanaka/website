import { Component, LOCALE_ID, Inject } from '@angular/core';

declare function require(x: string): any;
const Speakers = require('../../data/speakers.json');
const Sessions = require('../../data/sessions.json')[0].sessions;

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {
  guests = Speakers.filter(s => s.isTopSpeaker);
  speakers = Speakers.filter(s => !s.isTopSpeaker);
  sessionMap = Sessions.reduce((obj, value) => ({ ...obj, [value.id]: value }), {});
  speakerMap = Speakers.reduce((obj, value) => ({ ...obj, [value.id]: value }), {});

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  scroll () {
    let current = window.document.documentElement.scrollTop;
    const about = (window.document.querySelector('#about') as HTMLElement).offsetTop;
    const diff = about - current;
    const frameDiff = diff / 60 * 6;
    const frame = () => {
      window.requestAnimationFrame(() => {
        if (current > about) {
          return;
        }
        current = current + frameDiff;
        window.document.documentElement.scrollTop = window.document.body.scrollTop = current;
        frame();
      })
    };
    frame();
  }
}
