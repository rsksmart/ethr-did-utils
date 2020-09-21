const ganache = require('ganache-core')
const Eth = require('ethjs')
const { abi, bytecode } = require('ethr-did-registry')

const startGanacheServer = (port = 8545, options) => new Promise((resolve, reject) => {
  const server = ganache.server(options)
  server.listen(port, function(err, blockchain) {
    if (err) reject(err)
    const rpcUrl = `http://localhost:${port}`
    const eth = new Eth(new Eth.HttpProvider(rpcUrl));
    resolve(Object.freeze({ server, blockchain, eth, rpcUrl }))
  })
})

const deployEthrDidRegistry = (eth) => eth.accounts().then((accounts) => {
    const EthrDidRegistry = eth.contract(abi, bytecode, {
      from: accounts[0],
      gas: 2811144,
    })

    // create a new contract
    return new Promise((resolve, reject) => {
      EthrDidRegistry.new((error, result) => {
        if (error) reject(error)

        // Works only with auto mining!!!
        return eth.getTransactionReceipt(result).then(({ contractAddress }) => {
          resolve(Object.freeze({
            registryAddress: contractAddress,
            registry: EthrDidRegistry.at(contractAddress)
          }))
        })
      })
    }
  )
})

/**
 * Start a Ganache server and deploy Ethr DID Registry
 * @param {port} port to for the server to listen on
 */
const startGanacheServerAndDeployEthrDidRegistry = async (port = 8545, options) => {
  const startedServer = await startGanacheServer(port, options)
  const deployedContract = await deployEthrDidRegistry(startedServer.eth)
  return {
    ...startedServer,
    ...deployedContract
  }
}

module.exports = { startGanacheServer, deployEthrDidRegistry, startGanacheServerAndDeployEthrDidRegistry }
