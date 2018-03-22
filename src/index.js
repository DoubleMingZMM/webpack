import _ from 'lodash';
import print from './print.js'
import './styles.css';
function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    var btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = print;
    element.appendChild(btn);
    
    return element;
}
document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module');
      print();
  })
}