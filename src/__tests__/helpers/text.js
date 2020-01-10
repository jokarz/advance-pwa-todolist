import {toTitleCase, toCapFirst} from '../../utility/textHelper'

it('Cap first letter for each word', () => {
  expect(toTitleCase('q w e r t y')).toEqual('Q W E R T Y');
  expect(toTitleCase('one two three')).toEqual('One Two Three');
  expect(toTitleCase('1 one 2 two 3 three')).toEqual('1 One 2 Two 3 Three');
  expect(toTitleCase('[]')).toEqual('[]');
  expect(toTitleCase('  ')).toEqual('  ');
  expect(toTitleCase('')).toEqual('');
});


it('Cap first letter for each statement', () => {
  expect(toCapFirst('q w e r t y')).toEqual('Q w e r t y');
  expect(toCapFirst('one two three')).toEqual('One two three');
  expect(toCapFirst('1 one 2 two 3 three')).toEqual('1 one 2 two 3 three');
  expect(toCapFirst('[]')).toEqual('[]');
  expect(toCapFirst('  ')).toEqual('  ');
  expect(toCapFirst('')).toEqual('');
});