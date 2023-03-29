import { BanknotesIcon, ArrowsRightLeftIcon } from '@heroicons/react/20/solid';
import { formatAmount } from '../../lib/helpers';

const AccountCard = ({ account }) => {
  return (
    <div>
      <dl className="mb-5">
        <div
          key={account.id}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-white-500 p-3">
              {account.type.includes('Cash') ? (
                <BanknotesIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
              ) : (
                <ArrowsRightLeftIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
              )}
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{account.type}</p>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{account.number}</p>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{account.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{formatAmount.format(account.balance)}</p>
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default AccountCard
