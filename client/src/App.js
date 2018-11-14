import React from 'react';
import * as Item from './styled-components/Item';
import { API_ROOT_PATH, ITEMS_ROOT_PATH } from './pathConstants';

const itemsRootQuery = `${API_ROOT_PATH}${ITEMS_ROOT_PATH}/`;

class App extends React.Component {
  state = { items: [] };

  async componentDidMount() {
    const response = await fetch(itemsRootQuery);
    const { items } = await response.json();
    this.setState({ items });
  }

  render() {
    const { items } = this.state;

    return (
      <Item.List>
        {items.map(item => (
          <Item.ListElement key={item.id}>
            <Item.Name>{item.shortName.toUpperCase()}</Item.Name>
            <Item.Price>
              {item.inflatedPrice ? `€${item.inflatedPrice}` : 'Contact us'}
            </Item.Price>
          </Item.ListElement>
        ))}
      </Item.List>
    );
  }
}

export default App;
