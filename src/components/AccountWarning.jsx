import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

const AccountWarning = () => {
  return (
    <div className="mx-auto max-w-md mt-10 border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            It looks like you only have one bank account available. Please note that Save-It requires a minimum of two bank accounts to facilitate transfers.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccountWarning;
