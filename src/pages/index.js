import Head from 'next/head'
import Index from '@/components/Index'
import { Client } from "investec-api";

const { CLIENT_ID, CLIENT_SECRET, API_KEY } = process.env;

function IndexPage({ accounts, privateAccountId }) {
  return (
    <>
      <Head>
        <title>💰 Save-It</title>
        <meta name="description" content="Savings Web App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1 className="text-3xl text-center mt-5 font-bold leading-tight tracking-tight text-gray-900">💰 Save-It</h1>
      <Index
        accounts={accounts}
        privateAccountId={privateAccountId}
      />
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const apiClient = await Client.create(CLIENT_ID, CLIENT_SECRET, API_KEY);

  let accounts;
  let privateAccountId;

  try {
    let accountsResponse = await apiClient.getAccounts('private');
    let formattedAccounts = [];

    for (let account of accountsResponse) {
      let balanceDetails = await account.getBalance();

      if (account.productName.includes('Private')) privateAccountId = account.accountId;

      formattedAccounts.push({
        "id": account.accountId,
        "number": account.accountNumber,
        "name": account.accountName,
        "type": account.productName,
        "balance": balanceDetails.availableBalance
      })
    }

    accounts = JSON.parse(JSON.stringify(formattedAccounts));
  }
  catch(e) {
    console.log(e)
  }

  return {
    props: {
      accounts,
      privateAccountId
    },
  };
}

export default IndexPage;
