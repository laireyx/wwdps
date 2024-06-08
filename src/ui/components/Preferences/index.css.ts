import { style } from '@vanilla-extract/css';

export const gamePathInputStyle = style({
  fontFamily: 'ui-monospace monospace',
  minWidth: '30ch',

  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
