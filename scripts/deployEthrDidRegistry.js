const Eth = require('ethjs')

const { deployEthrDidRegistry } = require('..')

const port = process.env.PORT || 8545;

const rpcUrl = `http://localhost:${port}`;
const eth = new Eth(new Eth.HttpProvider(rpcUrl))

deployEthrDidRegistry(eth).then(({ registryAddress, registry }) => {
  console.log(`Ethr DID Registry depoyed - registryAddress: ${registryAddress}`)
  console.log(`netowrks: [ {rpcUrl: ${rpcUrl}, registryAddress: ${registryAddress} }]`)
})
