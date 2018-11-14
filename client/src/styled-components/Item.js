import styled from 'styled-components';

export const List = styled.ul`
  margin: 128px auto;
  display: grid;
  width: 1024px;
  grid-template-columns: 256px 256px 256px;
  column-gap: 128px;
  row-gap: 128px;
  padding-inline-start: 0;
`;

export const ListElement = styled.li`
  display: block;
`;

export const Name = styled.div`
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
`;

export const Price = styled.div`
  text-align: center;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 14px;
  font-style: italic;
`;
