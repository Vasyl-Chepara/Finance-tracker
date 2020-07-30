import React from 'react';
import './navbar.css';
// import { createStore} from 'redux';
// import { connect, Provider} from 'react-redux'


class Navbar extends React.Component {
  
  state = {
    items: [
      { id: '0', item: 'Overview' },
      { id: '1', item: 'Transactions' },
      { id: '2', item: 'Sheduler' },
      { id: '3', item: 'Reports' },
      { id: '4', item: 'About' },
    ],
  }

  constructor(props) {
    super(props)
    window.sessionStorage.setItem('nav_status', false);
  }

  route(val, link) {
    window.sessionStorage.setItem('active', val);
    var win = window.open(link, '_self');
    win.focus();
  }

  open_close() {
    var value = (window.sessionStorage.getItem('nav_status') === "true");
    window.sessionStorage.setItem('nav_status', !value);
    this.props.updateData(!value);
  }

  render() {
    return (
      <nav className='navbar' role="navigation">
        <div id="menuToggle">
          <input onClick={() => this.open_close()} type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            {this.state.items.map(items => {
              const classes = ['']
              if (items.id === window.sessionStorage.getItem('active')) {
                classes.push('active')
              }
              if (items.item === 'About') {
                classes.push('about')
              }
              return (
                <li className={'' + classes.join(' ')}
                  onClick={() => this.route(items.id, items.item.toLowerCase())}
                  key={items.id}>{items.item}
                </li>
              )
            })}

          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;

