import { Client } from "investec-api";

const { CLIENT_ID, CLIENT_SECRET, API_KEY } = process.env;

const getAccounts = async (req, res) => {
  const apiClient = await Client.create(CLIENT_ID, CLIENT_SECRET, API_KEY);
  let accounts;

  try {
    let accountsResponse = await apiClient.getAccounts('private');
    let formattedAccounts = [];

    for (let account of accountsResponse) {
      let balanceDetails = await account.getBalance();

      formattedAccounts.push({
        "id": account.accountId,
        "number": account.accountNumber,
        "name": account.accountName,
        "type": account.productName,
        "balance": balanceDetails.availableBalance
      })
    }

    accounts = JSON.parse(JSON.stringify(formattedAccounts));

    res.status(200);
    res.json(accounts);
  } catch (e) {
    console.log(e);
    res.json(`Error occured: ${e}`);
  }

}

export default getAccounts;
