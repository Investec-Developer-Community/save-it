# 💰Save-It

A web app that helps you maximise your savings with Programmable Banking.

- Save-It allows you to set the minumum and maximum amount that you wish to maintain in your current account (you set the rules)
- It also allows you to set the frequency at which you want the rules to run (every 10 min, 20 min or 30 min)
- Once you set the rules, Save-it will automatically transfer the optimal amount between your current and savings account and maintain this at the frequency that you set.
- Save-It uses the [Investec Transfer API](https://developer.investec.com/za/api-products).

Note: Save-It uses a cron job to run the rules at the frequency that you set. This means that you will need to keep the app running in the background for the rules to run and for the money to continue to be transferred between your accounts.

![Example](/docs/image.png)

## ☑️ Requirements

- Terminal Application
  - [MAC](https://support.apple.com/en-za/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac)
  - [Windows](https://www.youtube.com/watch?v=EqaEPL9ZKGA)
- Node installed on your machine ([see this guide on how to install Node](https://kinsta.com/blog/how-to-install-node-js/)).
- Access to the [Investec Programmable Banking API](https://developer.investec.com/za/api-products).

## 🔑 Preparations

You will need to have your Investec API keys at hand.
Specifically, your client ID, client secret and API key. You can learn more about getting your Investec API keys in the [API Quick Start Guide](https://offerzen.gitbook.io/programmable-banking-community-wiki/developer-tools/quick-start-guide#how-to-get-your-api-keys).

## 🚀 Getting Started

We encourage you to fork this repository to your GitHub account. This allows you to easily stay up to date with new changes to the app without losing any local customizations you make to it. To fork this app, please see the [following guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

Once you have forked the repo, please clone it.

Open your terminal and run the following:

```bash
git clone https://github.com/programmable-banking-community/save-it
Rename the `.env.local.example` to `.env.local`
Replace with YOUR api keys and secrets
```

Then run the following:

```bash
cd save-it
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 👨‍💻 Contributions

Possible additions:

- Enable the user to set up the rules for each day of the month in order to account for variance such as debit orders coming off the account
- Hook up to [Herouku](https://www.heroku.com/) and [Digital Ocean](https://www.digitalocean.com/)

Pull requests and changes are welcome.

## 📄 License

This project is MIT licensed.
