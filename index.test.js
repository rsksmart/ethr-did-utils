const { startGanacheServerAndDeployEthrDidRegistry } = require('.')
const promisify = require('pify');

const port = 9435

test('demo', async () => {
  const { blockchain, server, rpcUrl, eth, registryAddress, registry } = await startGanacheServerAndDeployEthrDidRegistry(port, { ws: false })

  expect(rpcUrl).toEqual(`http://localhost:${port}`)
  expect(registryAddress).toHaveLength(42)
  expect(blockchain.mnemonic.split(' ')).toHaveLength(12)

  const accounts = await eth.accounts() // use ethjs
  const ownerOfAccount = await registry.identityOwner(accounts[0])

  expect(ownerOfAccount['0']).toEqual(accounts[0])

  await promisify(server.close)()
})
