import React from 'react';
import PropTypes from 'prop-types';
import * as Item from '../styled-components/Item';

const ItemList = ({ items }) => (
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

ItemList.propTypes = {
  items: PropTypes.array,
};

ItemList.defaultProps = {
  items: [],
};

export default ItemList;
