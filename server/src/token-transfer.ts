
// @ts-nocheck

import { TezosToolkit } from '@taquito/taquito'
import { InMemorySigner } from '@taquito/signer'
//const acc = require('./acc2.json')
export class token_transfer {
  // setting up the link to the testnet’s public node
  private tezos: TezosToolkit
  rpcUrl: string
  //signer: Promise<InMemorySigner>

  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl)
    this.rpcUrl = rpcUrl
}



  public async transfer(contract: string, sender: string, receiver: string, amount: number) {
    if(this.tezos.signer.publicKey.length === 0)
    	this.tezos.setSignerProvider( await InMemorySigner.fromSecretKey(process.env.PRIVATEKEY))
    
    let result = {"message": "Transaction failed", "success": false, "amount": 0};

    await this.tezos.contract
      .at(contract) //calling the contract at the address
      .then((contract) => {
        console.log(`Sending ${amount} from ${sender} to ${receiver}...`)
        //calling the entry point transfer, send the reciever/sender addresses and the amount of tokens to be sent to it.
        //return contract.methods.transfer(sender, receiver, amount).send()
        var list = [
          {
            "from_": sender,
            "txs": [{
                "to_": receiver,
                "token_id": 0,
                "amount": amount,
            }]
          }
        ]
        return contract.methods.transfer(list).send()
      })
      .then((op) => {
        console.log(`Awaiting for ${op.hash} to be confirmed...`)
        return op.confirmation(1).then(() => op.hash) //waiting for 1 network confirmation
      })
      .then((hash) => {console.log(`https://tzstats.com/${hash}`); result= {"message": `https://tzkt.io/${hash}`, "success": true, "amount": amount};}) //getting the operation’s hash
      .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`))
      
      return result;
  }
}
