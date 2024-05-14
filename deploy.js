require("dotenv").config()
const { ethers } = require("ethers");
const fs = require("fs")

async function main() {
    //http://172.25.192.1:7545
    const provider = new ethers.JsonRpcProvider(process.env.RPC)
    const wallet = new ethers.Wallet(process.env.P_KEY, provider)
    const abi = fs.readFileSync("./simpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync("./simpleStorage_sol_SimpleStorage.bin", "utf8")
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    const contract = await contractFactory.deploy()

    let favNum = await contract.retrieve();
    const transactionResponse = await contract.store(5)
    await transactionResponse.wait(1)
    const currentFavNum = await contract.retrieve()
    console.log(currentFavNum.toString());

}
main().then(() => process.exit(0))
    .catch(err => {
        console.log(err);
        process.exit(1)
    })