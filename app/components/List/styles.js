import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $underlayColor: '$border',
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$white',
  },
  text: {
    fontSize: 16,
    color: '$darkText',
  },
  separator: {
    marginLeft: 20,
    backgroundColor: '$border',
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  icon: {
    backgroundColor: 'transparent',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconVisible: {
    backgroundColor: '$primaryBlue'
  },
  checkIcon: {
    width: 18,
  },
});