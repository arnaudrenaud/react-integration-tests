import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import { API_ROOT_PATH, ITEMS_ROOT_PATH } from './pathConstants';
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
      const AppWrapper = mount(<App />);

      const ItemListWrapper = AppWrapper.find('ul');

      expect(ItemListWrapper.find('li')).toHaveLength(0);
    });
  });

  describe('after items fetched', () => {
    it('renders item list', async () => {
      const AppWrapper = mount(<App />);
      await AppWrapper.instance().componentDidMount();
      AppWrapper.update();

      const ItemListWrapper = AppWrapper.find('ul');

      expect(ItemListWrapper.find('li')).toHaveLength(response.items.length);
    });

    describe('for each item', () => {
      it('renders short name in upper case', async () => {
        const AppWrapper = mount(<App />);
        await AppWrapper.instance().componentDidMount();
        AppWrapper.update();

        const ItemListWrapper = AppWrapper.find('ul');
        const FirstItemWrapper = ItemListWrapper.find('li').at(0);

        expect(
          FirstItemWrapper.find('div')
            .at(0)
            .text()
        ).toEqual(response.items[0].shortName.toUpperCase());
      });

      describe('when inflated price defined', () => {
        it('renders inflated price with euro symbol', async () => {
          const AppWrapper = mount(<App />);
          await AppWrapper.instance().componentDidMount();
          AppWrapper.update();

          const ItemListWrapper = AppWrapper.find('ul');
          const FirstItemWrapper = ItemListWrapper.find('li').at(0);

          expect(
            FirstItemWrapper.find('div')
              .at(1)
              .text()
          ).toEqual(`€${response.items[0].inflatedPrice}`);
        });
      });
    });
  });
});
