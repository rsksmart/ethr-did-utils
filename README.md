<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>@rsksmart/ethr-did-utils</code></h3>
<p align="middle">
    Utils for Ethr DID method in RSK network.
</p>
<p align="middle">
    <a href="https://badge.fury.io/js/%40rsksmart%2Fethr-did-utils">
        <img src="https://badge.fury.io/js/%40rsksmart%2Fethr-did-utils.svg" alt="npm" />
    </a>
</p>

```
npm i ganache-core @rsksmart/ethr-did-utils
```

## Features

- Start a [Ganache](https://github.com/trufflesuite/ganache-core) HTTP server and deploy [Ethr DID Registry](https://github.com/uport-project/ethr-did-registry)

## Usage

You can start a Ganache server and deploy the registry from a new terminal or from Node.js

### From a new terminal

Open a new terminal browse to the repo dir or clone it and run

```
npm run start-ganache-and-deploy
```

The output should be

```
Ganache started on port 8545 - rpcUrl: http://localhost:8545
Ethr DID Registry depoyed - registryAddress: 0xe87c1cd63e5eed53db7d4e839adb7a4646ecbf8d
netowrks: [ { name: 'ganache', rpcUrl: http://localhost:8545, registryAddress: 0xe87c1cd63e5eed53db7d4e839adb7a4646ecbf8d }]
mnemonic: cover lift maple eagle common differ trash stomach scene security section dismiss
```

> Useful for demos

## From Node.js

To start the server and deploy from Node.js

```javascript
const { startGanacheServerAndDeployEthrDidRegistry } = require('@rsksmart/ethr-did-utils')

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
```

This sample script is in _demo.js_ and can be run with `node demo.js`

The output should be

```
Ganache started on port 8545 - rpcUrl: http://localhost:8545
Ethr DID Registry depoyed - registryAddress: 0x351e99cafac04bd08333b06f1f8257ec5abfe242
netowrks: [ { name: 'ganache', rpcUrl: http://localhost:8545, registryAddress: 0x351e99cafac04bd08333b06f1f8257ec5abfe242 }]
mnemonic: host spin zero toddler chat tortoise project buffalo example ship chair human
My identity owner is 0xf9bcb26dbd250b22162ee513e9c6f9f373ced425
```

> Useful for testing

## API

```javascript
async function startGanacheServerAndDeployEthrDidRegistry(port)
```

Start a Ganache server and deploy Ethr DID Registry

Parameters:

- `port` port to for the server to listen on - default `8545`

Returns: `Promise<Object>` with keys of `startGanacheServer` and `deployEthrDidRegistry`,

- `server`
- `blockchain`
- `eth`
- `rpcUrl`
- `registry`
- `registryAddress`

```javascript
async function startGanacheServer(port)
```

Parameters:

- `port` port to for the server to listen on - default `8545`

Returns: `Promise<Object>` with keys

- `server` the Ganache server started. It has a function `close` to close the server connection
- `blockchain` the success result of the server listen callback
- `eth` an `ethjs` instance using via HTTP the started server
- `rpcUrl` the URL to use to connect to the node via RPC

```javascript
async function deployEthrDidRegistry(eth)
```

Start a Ganache server and deploy Ethr DID Registry

> It works only with auto-miner set on

Parameters:

- `eth` an `ethjs` instance using via HTTP the started server

Returns:

- `registry` an [`ethjs-contract`](https://github.com/ethjs/ethjs-contract) instance of the deployed registry
- `registryAddress` the address of the deployed Ethr DID Registry
