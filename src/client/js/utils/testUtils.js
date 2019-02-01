import ReactDOM from 'react-dom'

export const flushEffects = () => ReactDOM.render(null, document.createElement('div'))
export const flushAllPromises = () => new Promise(resolve => setImmediate(resolve()))

export const createTouchEventObject = ({ x, y, ...rest }) => {
  return {
    touches: [{ clientX: x, clientY: y }],
    preventDefault: () => {},
    ...rest,
  }
}
