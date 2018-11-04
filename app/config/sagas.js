import { takeEvery, call, put, select } from 'redux-saga/effects';
import { GET_INITIAL_CONVERSION, SWAP_CURRENCY, CHANGE_BASE_CURRENCY, CONVERSION_ERROR, CONVERSION_RESULT } from '../actions/currencies';

const getLatestRates = currency => fetch(`https://fixer.handlebarlabs.com/latest?base=${currency}asdf`);


const fetchLatestRates = function* (action) {

  try {
    let currency = action.currency;
    if (!currency) {
      currency = yield select(state => state.currencies.baseCurrency);
    }
    const response = yield call(getLatestRates, currency);
    const result = yield response.json();
    if (result.error) {
      yield put({type: CONVERSION_ERROR, error: result.error});
    } else {
      yield put({type: CONVERSION_RESULT, result});
    }
  } catch(e) {
    yield put({type: CONVERSION_ERROR, error: e.message});
  }
  
};

const rootSaga = function* () {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestRates);
};


export default rootSaga;