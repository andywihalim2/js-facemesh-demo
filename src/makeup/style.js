import { css } from 'react-emotion';

export const cssCard = css({
  position: 'relative',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  maxWidth: 378,
  overflow: 'hidden',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  margin: '0px auto',
});

export const cssControl = css({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
  backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1))`,
  padding: 16,
  boxSizing: 'border-box',
});

export const cssWrapper = css({
  position: 'relative',
  width: '100%',
  paddingTop: `${16 / 9 * 100}%`,
});

export const cssCam = css({
  transform: 'scaleX(-1)',
  width: '100%',
  height: 'auto',
  display: 'none',
});

export const cssCanvasBase = css({
  position: 'absolute',
  display: 'block',
  height: '100%',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
});

export const cssResizeWrapper = css({
  position: 'absolute',
  top: 0,
  height: '100%',
  width: '100%',
});

export const cssResizeToggle = css({
  position: 'absolute',
  top: 0,
  bottom: 95 + 16,
  backgroundColor: '#fff',
  width: 2,
  '&::after': {
    content: "''",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

export const cssCanvasDraw = css({
  top: 0,
  position: 'absolute',
  display: 'block',
  opacity: 0.25,
  filter: 'blur(5px)',
  height: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
});
