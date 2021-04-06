import { trigger, state, transition, style, animate, animation, keyframes, query, group, animateChild } from '@angular/animations';

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

export const faderAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0) translateY(100%)',
      }),
    ]),
    // Animate the new page in
    query(':enter', [animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))]),
  ]),
]);

export const sliderAnimation = trigger('routeAnimations', [transition('* => isLeft', slideTo('left')), transition('* => isRight', slideTo('right')), transition('isRight => *', slideTo('left')), transition('isLeft => *', slideTo('right'))]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([query(':leave', [animate('600ms ease', style({ [direction]: '100%' }))], optional), query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))])]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}

export const sliderPerfAnimation = trigger('routeAnimations', [transition('* => isLeft', slideToPerf('right')), transition('* => isRight', slideToPerf('left')), transition('isRight => *', slideToPerf('right')), transition('isLeft => *', slideToPerf('left'))]);

function slideToPerf(direction) {
  const translation = direction === 'right' ? '-100%' : '100%';

  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          transform: 'translateX(' + translation + ')',
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ transform: 'translateX(' + translation + ')' })]),
    group([query(':leave', [animate('200ms ease-in', style({ transform: 'translateX(' + translation + ')' }))], optional), query(':enter', [animate('200ms ease-in', style({ transform: 'translateX(0%)' }))])]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}

export const slideAnimation = trigger('routeAnimations', [
  transition('* => isStart', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(100%)' }))], { optional: true }),
    ]),
  ]),

  transition('* => isEnd', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
    ]),
  ]),

  transition('isStart => *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
    ]),
  ]),

  transition('isEnd => *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(100%)' }))], { optional: true }),
    ]),
  ]),

  transition('* => isRight', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
    ]),
  ]),

  transition('isRight => *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(100%)' }))], { optional: true }),
    ]),
  ]),

  transition('* => isLeft', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(100%)' }))], { optional: true }),
    ]),
  ]),

  transition('isLeft => *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
    ]),
  ]),
]);
