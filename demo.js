const { startGanacheServerAndDeployEthrDidRegistry } = require('.')

const port = process.argv[2] || 8545

startGanacheServerAndDeployEthrDidRegistry(port).then(({ blockchain, server, rpcUrl, eth, registryAddress, registry }) => {
  console.log(`Ganache started on port ${port} - rpcUrl: ${rpcUrl}`)
  console.log(`Ethr DID Registry depoyed - registryAddress: ${registryAddress}`)
  console.log(`netowrks: [ { name: 'ganache', rpcUrl: ${rpcUrl}, registryAddress: ${registryAddress} }]`)
  console.log(`mnemonic: ${blockchain.mnemonic}`)

  eth.accounts() // use ethjs
    .then(([me]) => registry.identityOwner(me)) // use ethr did registry contract
    .then(result => result[0])
    .then(owner => console.log(`My identity owner is ${owner}`))
    .then(() => server.close()) // use server.close to exit ganache
})
