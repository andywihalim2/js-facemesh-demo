import { css } from 'react-emotion';

export const cssBackdrop = css({
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  opacity: 0.8,
});

export const cssCard = css({
  borderRadius: '12px 12px 0px 0px',
  display: 'flex',
  alignItems: 'flex-end',
  position: 'fixed',
  width: '100%',
  maxHeight: '90%',
  overflow: 'hidden',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  bottom: 0,
  '@media screen and (min-width: 420px)': {
    maxWidth: 378,
    borderRadius: 12,
    top: '50%',
    left: '50%',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  }
});

export const cssLoading = hidden =>
  css({
    backgroundColor: '#222',
    color: '#fff',
    display: 'flex',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    opacity: hidden ? 0 : 1,
    visibility: hidden ? 'hidden' : 'visible',
    transition: 'opacity .2s ease-in, visibility 0s linear .2s, .2s',
    padding: 16,
    boxSizing: 'border-box',
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
