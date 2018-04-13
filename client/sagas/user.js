import bluebird from "bluebird";
import {put, takeEvery} from "redux-saga/effects";
import {MESSAGE_ADD, TAKE_MY_MONEY} from "../../shared/constants/actions";
import TestGameABI from "../../shared/contracts/TestGame";
import BitGuildTokenABI from "../../shared/contracts/BitGuildToken";
import sdk from "bitguild-sdk";


function * shutUpAndTakeMyMoney(action) {
  const isOnPortal = yield sdk.isOnPortal();
  let transaction;
  try {
    if (isOnPortal) {
      const contract = window.web3.eth.contract(BitGuildTokenABI).at(process.env.TOKEN_CONTRACT_ADDR);
      transaction = yield bluebird.promisify(contract.approveAndCall)(process.env.TEST_CONTRACT_ADDR, action.payload.amount * 1e18, "0xdeadbeef", {
        from: action.payload.wallet,
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(1e10)
      });
    } else {
      const contract = window.web3.eth.contract(TestGameABI).at(process.env.TEST_CONTRACT_ADDR);
      transaction = yield bluebird.promisify(contract.deposit)({
        from: action.payload.wallet,
        value: action.payload.amount * 1e18,
        gas: window.web3.toHex(15e4),
        gasPrice: window.web3.toHex(1e10)
      });
    }
    console.info("tx", transaction);
  } catch (error) {
    console.error(error);
    yield put({
      type: MESSAGE_ADD,
      payload: error
    });
  }
}


function * userSaga() {
  yield takeEvery(TAKE_MY_MONEY, shutUpAndTakeMyMoney);
}

export default userSaga;
