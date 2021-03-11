import { trigger, state, transition, style, animate } from '@angular/animations';

export const notificationAnimation = trigger('notificationAnimation', [
  state(
    'initial',
    style({
      transform: 'scale(1.0)',
    })
  ),
  state(
    'final',
    style({
      transform: 'scale(2)',
      borderRadius: '20px',
    })
  ),
  transition('initial=>final', animate('100ms')),
  transition('final=>initial', animate('200ms')),
]);
