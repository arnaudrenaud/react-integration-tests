import React from 'react';
import { shallow } from 'enzyme';

import * as Item from '../styled-components/Item';
import ItemList from './ItemList';

describe('ItemList', () => {
  const items = [
    { id: '1234', shortName: 'Glouglou', inflatedPrice: 100 },
    { id: '5678', shortName: 'mdr' },
  ];

  describe('for each item', () => {
    it('passes id as key', async () => {
      const AppWrapper = shallow(<ItemList items={items} />);

      const ItemListWrapper = AppWrapper.find(Item.List);
      const FirstItemWrapper = ItemListWrapper.find(Item.ListElement).at(0);

      expect(FirstItemWrapper.key()).toEqual(items[0].id);
    });

    it('renders short name in upper case', async () => {
      const AppWrapper = shallow(<ItemList items={items} />);

      const ItemListWrapper = AppWrapper.find(Item.List);
      const FirstItemWrapper = ItemListWrapper.find(Item.ListElement).at(0);

      expect(FirstItemWrapper.find(Item.Name).text()).toEqual(
        items[0].shortName.toUpperCase()
      );
    });

    describe('when inflated price defined', () => {
      it('renders inflated price with euro symbol', async () => {
        const AppWrapper = shallow(<ItemList items={items} />);

        const ItemListWrapper = AppWrapper.find(Item.List);
        const FirstItemWrapper = ItemListWrapper.find(Item.ListElement).at(0);

        expect(FirstItemWrapper.find(Item.Price).text()).toEqual(
          `€${items[0].inflatedPrice}`
        );
      });
    });

    describe('when inflated price not defined', () => {
      const itemsInflatedPriceUndefined = [
        { id: '1234', shortName: 'Glouglou' },
      ];

      it('renders text "Contact us"', async () => {
        const AppWrapper = shallow(
          <ItemList items={itemsInflatedPriceUndefined} />
        );

        const ItemListWrapper = AppWrapper.find(Item.List);
        const FirstItemWrapper = ItemListWrapper.find(Item.ListElement).at(0);

        expect(FirstItemWrapper.find(Item.Price).text()).toEqual('Contact us');
      });
    });
  });
});
