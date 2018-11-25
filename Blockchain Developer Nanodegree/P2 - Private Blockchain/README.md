# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will help you to run this project on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

```
npm install
```

## Testing

To test code:
1: Open a command prompt or shell terminal after install node.js.
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
node
```
3: Copy and paste your code into your node session
4: Instantiate blockchain with blockchain variable
```
let blockchain = new Blockchain();
```
5: Generate 10 blocks using loop
```
(function theLoop(i) {
    setTimeout(function () {
        blockchain.addBlock(new Block("test data " + (10 - i + 1)));
        if (--i) theLoop(i);
    }, 100);
})(10);
```
6: Validate blockchain
```
blockchain.validateChain();
```
7: Induce errors by changing block data
```
let inducedErrorBlocks = [2, 4, 7];
for (let i = 0; i < inducedErrorBlocks.length; i++) {
    blockchain.getBlock(inducedErrorBlocks[i])
        .then(function (block) {
            block.data = 'induced chain error';
            addLevelDBData(inducedErrorBlocks[i], JSON.stringify(block));
        })
        .catch(function (error) {
            console.log(error);
        });
}
```
8: Validate blockchain. The chain should now fail with blocks 2,4, and 7.
```
blockchain.validateChain();
```
