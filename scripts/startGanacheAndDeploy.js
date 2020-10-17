const { startGanacheServerAndDeployEthrDidRegistry } = require('..')

const port = process.env.PORT || 8545

startGanacheServerAndDeployEthrDidRegistry(port).then(({ blockchain, server, rpcUrl, eth, registryAddress, registry }) => {
  console.log(`Ganache started on port ${port} - rpcUrl: ${rpcUrl}`)
  console.log(`Ethr DID Registry depoyed - registryAddress: ${registryAddress}`)
  console.log(`netowrks: [ { name: 'ganache', rpcUrl: ${rpcUrl}, registryAddress: ${registryAddress} }]`)
  console.log(`mnemonic: ${blockchain.mnemonic}`)
})
