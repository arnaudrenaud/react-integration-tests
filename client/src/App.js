import React from 'react';
import ItemList from './components/ItemList';
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

    return <ItemList items={items} />;
  }
}

export default App;
