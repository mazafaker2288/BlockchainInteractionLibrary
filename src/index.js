// Import Web3.js library
const Web3 = require('web3');

class BlockchainInteraction {
  constructor(providerUrl) {
    this.web3 = new Web3(providerUrl);
  }

  async getBalance(address) {
    try {
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  async sendTransaction(fromAddress, toAddress, amount, privateKey) {
    try {
      const nonce = await this.web3.eth.getTransactionCount(fromAddress);
      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = 21000; // Standard gas limit for transactions

      const txObject = {
        from: fromAddress,
        to: toAddress,
        value: this.web3.utils.toWei(amount, 'ether'),
        gasPrice: gasPrice,
        gas: gasLimit,
        nonce: nonce,
      };

      const signedTx = await this.web3.eth.accounts.signTransaction(txObject, privateKey);
      const txReceipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      return txReceipt.transactionHash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  async getTransactionReceipt(txHash) {
    try {
      const txReceipt = await this.web3.eth.getTransactionReceipt(txHash);
      return txReceipt;
    } catch (error) {
      console.error('Error getting transaction receipt:', error);
      throw error;
    }
  }
}

module.exports = BlockchainInteraction;
