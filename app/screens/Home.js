import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { LastConverted } from '../components/Text';
import { ClearButton } from '../components/Button';
import { connectAlert } from '../components/Alert';

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';


class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    currencyError: PropTypes.string,
    alertWithType: PropTypes.func,
  };

  componentWillMount() {
    this.props.dispatch(getInitialConversion())
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
      if (nextProps.currencyError === 'JSON Parse error: Unexpected EOF') {
        this.props.alertWithType('error', 'Error', `${nextProps.baseCurrency} is an invalid currency`)
      } else {
        this.props.alertWithType('error', 'Error', nextProps.currencyError );
      }
    }
  }

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'})
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'})
  }

  handleTextChange = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount))
  }

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  }

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options')
  }

  render() {
    let quotePrice = '...'
    if (!this.props.isFetching) {
      quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2)  
    }

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header 
          onPress={this.handleOptionsPress}
        />
        <KeyboardAvoidingView behavior='padding'>
          <Logo tintColor={this.props.primaryColor}/>
          <InputWithButton 
            buttonText={this.props.baseCurrency}
            onPress ={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType='numeric'
            onChangeText={this.handleTextChange}
          />
          <InputWithButton 
            buttonText={this.props.quoteCurrency} 
            onPress={this.handlePressQuoteCurrency}
            editable={false}
            defaultValue={quotePrice}
          />
          <LastConverted
            date={this.props.lastConvertedDate}
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            conversionRate={this.props.conversionRate} 
          />
          <ClearButton 
            text='Reverse Currencies'
            onPress={this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>
      </Container>
    ); 
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: new Date(conversionSelector['date']),
    primaryColor:  state.themes.primaryColor,
    currencyError: state.currencies.error,
  }
}
export default connect(mapStateToProps)(connectAlert(Home));
