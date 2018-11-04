import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FlatList, Text, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';


class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    primaryColor: PropTypes.string,
  }
  
  handlePress = (currency) => {
    const { type } = this.props.navigation.state.params;
    if (type === 'base') {
      this.props.dispatch(changeBaseCurrency(currency))
    } else {
      this.props.dispatch(changeQuoteCurrency(currency))
    }
    this.props.navigation.goBack(null);
  }

  render() {
    let selectedCurrency = this.props.navigation.state.params.type === 'base'? this.props.baseCurrency : this.props.quoteCurrency;
  
    return (
      <View style={{flex: 1}} >
        <StatusBar barStyle='default' translucent={false} />
        <FlatList
          data={currencies}
          renderItem={({ item }) => 
            <ListItem 
              text={item}
              selected={item === selectedCurrency}
              onPress={()=> this.handlePress(item)}
              iconBackground = {this.props.primaryColor}
            />
          }
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  baseCurrency: state.currencies.baseCurrency,
  quoteCurrency: state.currencies.quoteCurrency,
  primaryColor: state.themes.primaryColor,
})

export default connect(mapStateToProps)(CurrencyList);