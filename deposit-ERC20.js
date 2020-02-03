
const Matic = require('maticjs').default
const config = require('./config')
const from = config.FROM_ADDRESS // from address
const token= config.ROPSTEN_TEST_TOKEN
// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`


const amount = '1000000000000000' // amount in wei

  matic
  .approveERC20TokensForDeposit(token, amount, {
    from,
    onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash, 'Deposit Tokens from Ropsten/Ethereum to Matic — Transaction Approved.') // eslint-disable-line
    },
  })

  matic.depositERC20Tokens(token, from, amount, {
      from,
      onTransactionHash: (hash) => {
        // // action on Transaction success
        // if(err) {
        // 	console.log(err);
        // }
        // else {
        console.log(hash, 'Tokens deposited from Ropsten/Ethereum to Matic.') // eslint-disable-line
      	// }
      },
    })
