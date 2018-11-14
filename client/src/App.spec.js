import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';

import { API_ROOT_PATH, ITEMS_ROOT_PATH } from './pathConstants';
import * as Item from './styled-components/Item';
import App from './App';

describe('App', () => {
  const response = {
    items: [
      { id: '1234', shortName: 'Glouglou', inflatedPrice: 100 },
      { id: '5678', shortName: 'mdr' },
    ],
  };

  beforeEach(() => {
    fetchMock.mock(`${API_ROOT_PATH}${ITEMS_ROOT_PATH}/`, response);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  describe('before items fetched', () => {
    it('renders empty list', () => {
      const AppWrapper = shallow(<App />);

      const ItemListWrapper = AppWrapper.find(Item.List);

      expect(ItemListWrapper.find(Item.ListElement)).toHaveLength(0);
    });
  });

  describe('after items fetched', () => {
    it('renders item list', async () => {
      const AppWrapper = shallow(<App />);
      await AppWrapper.instance().componentDidMount();

      const ItemListWrapper = AppWrapper.find(Item.List);

      expect(ItemListWrapper.find(Item.ListElement)).toHaveLength(
        response.items.length
      );
    });

    describe('for each item', () => {
      it('passes id as key', async () => {
        const AppWrapper = shallow(<App />);
        await AppWrapper.instance().componentDidMount();

        const ItemListWrapper = AppWrapper.find(Item.List);
        const FirstItemWrapper = ItemListWrapper.find(Item.ListElement).at(0);

        expect(FirstItemWrapper.key()).toEqual(response.items[0].id);
      });

      it('renders short name in upper case', async () => {
        const AppWrapper = shallow(<App />);
        await AppWrapper.instance().componentDidMount();

        const ItemListWrapper = AppWrapper.find(Item.List);
        const FirstItemWrapper = ItemListWrapper.find(Item.ListElement).at(0);

        expect(FirstItemWrapper.find(Item.Name).text()).toEqual(
          response.items[0].shortName.toUpperCase()
        );
      });

      describe('when inflated price defined', () => {
        it('renders inflated price with euro symbol', async () => {
          const AppWrapper = shallow(<App />);
          await AppWrapper.instance().componentDidMount();

          const ItemListWrapper = AppWrapper.find(Item.List);
          const FirstItemWrapper = ItemListWrapper.find(Item.ListElement).at(0);

          expect(FirstItemWrapper.find(Item.Price).text()).toEqual(
            `€${response.items[0].inflatedPrice}`
          );
        });
      });

      describe('when inflated price not defined', () => {
        const responseInflatedPriceUndefined = {
          items: [{ id: '1234', shortName: 'Glouglou' }],
        };

        beforeEach(() => {
          fetchMock.mock(
            `${API_ROOT_PATH}${ITEMS_ROOT_PATH}/`,
            responseInflatedPriceUndefined,
            { overwriteRoutes: true }
          );
        });

        it('renders text "Contact us"', async () => {
          const AppWrapper = shallow(<App />);
          await AppWrapper.instance().componentDidMount();

          const ItemListWrapper = AppWrapper.find(Item.List);
          const FirstItemWrapper = ItemListWrapper.find(Item.ListElement).at(0);

          expect(FirstItemWrapper.find(Item.Price).text()).toEqual(
            'Contact us'
          );
        });
      });
    });
  });
});
