import bluebird from "bluebird";
import {put, takeEvery} from "redux-saga/effects";
import {MESSAGE_ADD, TAKE_MY_MONEY} from "../../shared/constants/actions";
//import testGameABI from "../../shared/contracts/test-game";
import BitGuildTokenABI from "../../shared/contracts/BitGuildToken";


function * shutUpAndTakeMyMoney(action) {
  try {
  	/*
	  const contract = window.web3.eth.contract(testGameABI).at(process.env.TEST_CONTRACT_ADDR);
	  const transaction = yield bluebird.promisify(contract.deposit)({
      from: action.payload.wallet,
      value: action.payload.amount * 1e18,
      gas: window.web3.toHex(15e4),
      gasPrice: window.web3.toHex(1e10)
    });
	  */
	  const contract = window.web3.eth.contract(BitGuildTokenABI).at(process.env.TOKEN_CONTRACT_ADDR);
	  const transaction = yield bluebird.promisify(contract.approveAndCall)(process.env.TEST_CONTRACT_ADDR, 42 * 1e18, "0xdeadbeef", {
      from: action.payload.wallet,
		  gas: window.web3.toHex(15e4),
		  gasPrice: window.web3.toHex(1e10)
    });
    console.log("tx", transaction); // 0x0d37401d7fcab4394f2dcb25a2a9e1a43f1ddfc03aa65b7df108e530073563e7
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


/*
Basically, we need a webpage somewhere (ip + something is fine) that have a button “Pay 0.01 eth”
and hitting it calls a trivial smart contract payable function that takes this 0.01 eth and sends it back.

And then we extend this smart contract with payInTokens that would take some plat from the user and send it back.
Then modify the page to both change the UI if it’s run within our portal
(for that we need a simple BitGuildPortal js SDK with a single method isOnPortal that would detect our portal frame)
and also call this new method if within portal instead of the pure eth one.
Eth to plat rate can be hardcoded in the test page/test contract till we write a price oracle contract.
 */