const bn = require('bn.js')

const Matic = require('maticjs').default
const config = require('./config')
const utils = require('./utils')

const token = config.PARENT_TEST_TOKEN
const amount = new bn(1).mul(utils.SCALING_FACTOR)
const from = config.FROM_ADDRESS

// Create Matic object
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  registry: config.REGISTRY_ADDRESS,
  depositManager: config.DEPOSITMANAGER_ADDRESS,
  withdrawManager: config.WITHDRAWMANAGER_ADDRESS,
})

async function execute() {
  await matic.initialize()
  matic.setWallet(config.PRIVATE_KEY)
  await matic.approveERC20TokensForDeposit(token, amount, { from, gasPrice: '10000000000' })
  return matic.depositERC20ForUser(token, from, amount, { from, gasPrice: '10000000000' })
}

async function executeRaw() { // eslint-disable-line
  await matic.initialize()
  let txParams = await matic.approveERC20TokensForDeposit(token, amount, { from, encodeAbi: true })
  let serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  await matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)

  txParams = await matic.depositERC20ForUser(token, from, amount, { from, encodeAbi: true })
  serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  return matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)
}

execute().then(console.log) // eslint-disable-line





// const Matic = require('maticjs').default
// const config = require('./config')
// const from = config.FROM_ADDRESS // from address
// const token= config.ROPSTEN_TEST_TOKEN
// // Create object of Matic
// const matic = new Matic({
//   maticProvider: config.MATIC_PROVIDER,
//   parentProvider: config.PARENT_PROVIDER,
//   rootChainAddress: config.ROOTCHAIN_ADDRESS,
//   syncerUrl: config.SYNCER_URL,
//   watcherUrl: config.WATCHER_URL,
// })

// matic.wallet = config.PRIVATE_KEY // prefix with `0x`


// const amount = '1000000000000000' // amount in wei

// // Approve token
// // matic
// //   .approveERC20TokensForDeposit(token, amount, {
// //     from,
// //     onTransactionHash: (hash) => {
// //       // action on Transaction success
// //       console.log(hash) // eslint-disable-line
// //     },
// //   })
// //   .then(() => {
// //     // Deposit tokens
// //     matic.depositERC20Tokens(token, from, amount, {
// //       from,
// //       onTransactionHash: (hash) => {
// //         // action on Transaction success
// //         console.log(hash) // eslint-disable-line
// //       },
// //     })	
// //   })

//   matic
//   .approveERC20TokensForDeposit(token, amount, {
//     from,
//     onTransactionHash: (hash) => {
//       // action on Transaction success
//       console.log(hash, 'Deposit Tokens from Ropsten/Ethereum to Matic — Transaction Approved.') // eslint-disable-line
//     },
//   })

//   matic.depositERC20Tokens(token, from, amount, {
//       from,
//       onTransactionHash: (hash) => {
//         // // action on Transaction success
//         // if(err) {
//         // 	console.log(err);
//         // }
//         // else {
//         console.log(hash, 'Tokens deposited from Ropsten/Ethereum to Matic.') // eslint-disable-line
//       	// }
//       },
//     })