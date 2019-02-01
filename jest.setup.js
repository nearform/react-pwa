import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

window.scrollTo = () => {}

Enzyme.configure({ adapter: new Adapter() })
