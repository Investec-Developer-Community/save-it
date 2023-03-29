import { useEffect, useState } from 'react';
import AccountCard from './AccountCard';
import axios from 'axios';
import { CronJob } from 'cron';
import FlashMessage from './FlashMessage';
import { formatAmount } from '../../lib/helpers';
import AccountWarning from './AccountWarning';

const Index = ({ accounts, privateAccountId }) => {
  const [stateAccounts, setStateAccounts] = useState(null);
  const [minRule, setMinRule] = useState(0);
  const [maxRule, setMaxRule] = useState(0);
  const [frequency, setFrequency] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [notifcation, setNotification] = useState('')

  useEffect(() => {
    if (Object.keys(accounts).length > 0) {
      setStateAccounts(accounts);
    }
  }, [accounts]);

  const frequencies = [
    { id: '10', title: 'Every 10 minutes' },
    { id: '20', title: 'Every 20 minutes' },
    { id: '30', title: 'Every 30 minutes' },
  ]

  const derp = [
    { id: "hello" }
  ]

  const setRule = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let accountBalance = accounts.find(acc => acc.id === privateAccountId).balance

    let target = (minRule + maxRule) / 2;
    const amount = Math.abs(accountBalance - target);

    try {
      await axios.post(
        `/api/checkBalances`,
        {
          amount,
          minRule
        });

      const response = await axios.get(`/api/getAccounts`);
      setStateAccounts(response.data);
      setNotification(`An amount of ${formatAmount.format(amount)} has been transferred`)
      setIsLoading(false);

      const job = new CronJob(`0 */${frequency} * * * *`, async function() {
        setIsLoading(true);

        const response = await axios.post(
          `/api/checkBalances`,
          {
            amount,
            minRule
          });

        if (response.status === 200 ) {
          const getAccountsResponse = await axios.get(`/api/getAccounts`);
          setStateAccounts(getAccountsResponse.data);

          setNotification(`An amount of ${formatAmount.format(amount)} has been transferred`)
          setIsLoading(false);
        }
      });

      job.start();
      console.log('is job running? ', job.running);
    }
    catch(e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-full">
        <main className="mt-10">
          { stateAccounts.length < 2
            ? <AccountWarning />
            :
            <>
              { notifcation &&
                <div className="flex items-center justify-center mb-5">
                  <FlashMessage
                    message={notifcation}
                  />
                </div>
              }
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                  <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                    <section>
                      <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6 grid grid-cols-1 gap-4">
                          <form className="" onSubmit={setRule}>
                            <div>
                              <div className="mt-1">
                                <div className="pb-2">
                                  <span className="text-gray-500 italic text-xs">Set the min and max rand value you want for your Private Bank Account. A target amount will be calculated based on those values and Save-It will automatically make the transfer</span>
                                </div>
                                <input
                                  name="min-value"
                                  placeholder="Min"
                                  onChange={(e) => setMinRule(parseFloat(e.target.value))}
                                  className="mr-2 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                                <input
                                  name="min-value"
                                  placeholder="Max"
                                  onChange={(e) => setMaxRule(parseFloat(e.target.value))}
                                  className="appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                                <span className="text-gray-500 italic text-xs ml-2">Target amount = min value + max value / 2</span>
                              </div>
                            </div>

                            <div className="mt-3">
                              <label className="block text-sm font-medium text-gray-500">
                                Set the frequency at which your rules will run
                              </label>
                              {frequencies.map((frequency) => (
                                <div key={frequency.id} className="flex items-center">
                                  <input
                                    id={frequency.id}
                                    name="notification-method"
                                    type="radio"
                                    value={frequency.id}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    defaultChecked={frequency.id === '10'}
                                    className="h-4 w-4 border-gray-300 text-green-600 focus:ring-transparent"
                                  />
                                  <label htmlFor={frequency.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900 ">
                                    {frequency.title}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6">
                              <button
                                type="submit"
                                className="flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700"
                              >
                                {isLoading &&
                                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                  </svg>
                                }
                                Set Rule
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <section>
                      <div className="overflow-hidden rounded-lg">
                        <div>
                          {stateAccounts &&
                            stateAccounts.map((account) =>
                              <AccountCard
                                key={account.id}
                                account={account}
                              />
                            )
                          }
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </>
          }
        </main>
      </div>
    </>
  )
}

export default Index;
