import { StyleSheet } from 'aphrodite'
import { bounceIn, bounceInUp, bounceOutUp, bounceInDown, headShake } from 'react-animations'

export default StyleSheet.create({
  bounceInUp: {
    animationName: bounceInUp,
    animationDuration: '0.2s'
  },
  bounceInDown: {
    animationName: bounceInDown,
    animationDuration: '0.2s'
  },
  bounceIn: {
    animationName: bounceIn,
    animationDuration: '0.6s'
  },
  bounceInFast: {
    animationName: bounceIn,
    animationDuration: '0.1s'
  },
  bounceInFlash: {
    animationName: bounceIn,
    animationDuration: '0.2s'
  },
  bounceOutUp: {
    animationName: bounceOutUp,
    animationDuration: '.6s'
  },
  invalid: {
    animationName: headShake,
    animationDuration: '.6s'
  },
  radius: {
    borderRadius: '25px'
  },
  radiusCircle: {
    borderRadius: '50%'
  },
  eventPassThrough: {
    pointerEvents: 'none'
  },
  eventAuto: {
    pointerEvents: 'auto'
  },
  pointer: {
    cursor: 'pointer'
  },
  title: {
    position: 'relative',
    bottom: '-20px',
    borderWidth: '5px',
    zIndex: 1,
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)'
    }
  },
  transition: {
    transition: 'all 0.2s ease-in-out'
  },
  titleTransition: {
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
  },
  shadowStatic: {
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)'
  },
  shadow: {
    ':hover': {
      boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)'
    },
    ':active': {
      boxShadow: 'none'
    }
  },
  textBlack: {
    color: '#666'
  },
  borderThicker: {
    borderWidth: '5px'
  },
  backgroundWhite: {
    backgroundColor: '#fff'
  },
  fontTitan: {
    fontSize: '2rem',
    fontFamily: "'Titan One', cursive"
  },
  fontTitanBigger: {
    fontSize: '2.5rem',
    fontFamily: "'Titan One', cursive"
  },
  fontTitanSmaller: {
    fontSize: '1.8rem',
    fontFamily: "'Titan One', cursive"
  },
  fontTitanSmallest: {
    fontSize: '1.2rem',
    fontFamily: "'Titan One', cursive"
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  backgroundDark: {
    backgroundColor: '#333'
  },
  backDrop: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  tab: {
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    ':active': {
      boxShadow: 'none'
    }
  },
  tabActive: {
    color: '#fff',
    backgroundColor: '#78C2AD',
    ':hover': {
      color: 'white',
      boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)'
    }
  },
  altHeight: {
    minHeight: '90vh'
  },
  fabButton: {
    width: '55px',
    height: '55px'
  },
  fabButtonHover: {
    ':active': {
      transform: 'scale(0.8)'
    },
    transform: 'scale(1.3)',
    transition: 'all .1s ease-in-out'
  },
  fabButtonSmall: {
    transform: 'scale(0.8)'
  },
  fabSubButton: {
    fontSize: '1rem'
  },
  fabSubButtonHover: {
    ':active': {
      transform: 'scale(0.8)'
    },
    transition: 'all .1s ease-in-out'
  },
  limitHeight: {
    maxHeight: '400px',
    overflowY: 'auto'
  }
})
