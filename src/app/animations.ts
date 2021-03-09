import { trigger, state, transition, style, animate, animation, keyframes } from '@angular/animations';

export let bounceOutLeftAnimation = animation(
  animate(
    '0.5s ease-out',
    keyframes([
      style({
        offset: 0.2,
        opacity: 1,
        transform: 'translateX(20px)',
      }),
      style({ offset: 1, opacity: 0, transform: 'translateX(-100%)' }),
    ])
  )
);

export let fadeInAnimation = animation([style({ opacity: 0 }), animate(2000)]);

export let fade = trigger('fade', [state('void', style({ opacity: 0 })), transition('void => *', [style({ opacity: 0 }), animate(2000, style({ opacity: 1 }))]), transition('* => void', [animate(2000, style({ opacity: 0 }))])]);

export let slideIn = trigger('slideIn', [transition(':enter', [style({ transform: 'translateX(-20px)' }), animate(500)])]);

export let slideOut = trigger('slideOut', [transition(':leave', [animate('0.5s ease-in', style({ transform: 'translateX(-200px)', opacity: 0 }))])]);

export let slideOutBounce = trigger('slideOutBounce', [
  transition(':leave', [
    animate(
      '0.5s ease-out',
      keyframes([
        style({
          offset: 0.2,
          opacity: 1,
          transform: 'translateX(20px)',
        }),
        style({ offset: 1, opacity: 0, transform: 'translateX(-100%)' }),
      ])
    ),
  ]),
]);
