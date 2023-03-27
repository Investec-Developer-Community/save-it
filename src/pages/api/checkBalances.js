import { Client } from "investec-api";

const { CLIENT_ID, CLIENT_SECRET, API_KEY } = process.env;
const REFERENCE = 'Save-It app transfer';

const checkBalances = async (req, res) => {
  const { amount, minRule } = req.body;
  const apiClient = await Client.create(CLIENT_ID, CLIENT_SECRET, API_KEY);

  try {
    let accounts = await apiClient.getAccounts('private');

    let privateAccount = accounts.find(acc => acc.productName.includes('Private'));
    let saverAccount   = accounts.find(acc => acc.productName.includes('Cash'));

    let privateAccountBalance = await privateAccount.getBalance();
    let saverAccountBalance   = await saverAccount.getBalance();

    if (privateAccountBalance.availableBalance < minRule) {
      if (saverAccountBalance.availableBalance > amount) {
        await saverAccount.transfer([{account: privateAccount, amount: amount, myReference: REFERENCE, theirReference: REFERENCE}]);
      }
    } else {
      if (privateAccountBalance.availableBalance > minRule) {
        await privateAccount.transfer([{account: saverAccount, amount: amount, myReference: REFERENCE, theirReference: REFERENCE}]);
      }
    }

    res.status(200);
    res.json("Accounts Synced");
  } catch (e) {
    console.log(e);
    res.json(`Error occured: ${e}`);
  }

}

export default checkBalances;
