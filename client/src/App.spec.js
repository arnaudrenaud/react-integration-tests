import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';

import { API_ROOT_PATH, ITEMS_ROOT_PATH } from './pathConstants';
import ItemList from './components/ItemList';
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
    it('passes empty array to ItemList', () => {
      const AppWrapper = shallow(<App />);

      const ItemListWrapper = AppWrapper.find(ItemList);

      expect(ItemListWrapper.prop('items')).toEqual([]);
    });
  });

  describe('after items fetched', () => {
    it('passes items to ItemList', async () => {
      const AppWrapper = shallow(<App />);
      await AppWrapper.instance().componentDidMount();

      const ItemListWrapper = AppWrapper.find(ItemList);

      expect(ItemListWrapper.prop('items')).toEqual(response.items);
    });
  });
});
