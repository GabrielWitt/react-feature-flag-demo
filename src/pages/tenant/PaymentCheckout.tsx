import { useState } from 'react';
import AppNavigator from '../shared/components/AppNavigator';

type PaymentMethod = 'card' | 'bank';

const PaymentCheckout = () => {
  const [method, setMethod] = useState<PaymentMethod>('card');

  return (
    <main className="min-h-screen bg-[#e9eef4] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
        <AppNavigator />

        <section className="bg-[#f7f9fc] px-5 py-6 sm:px-8 sm:py-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Payments</h1>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setMethod('card')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                method === 'card' ? 'bg-blue-500 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Pay with Card
            </button>
            <button
              type="button"
              onClick={() => setMethod('bank')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                method === 'bank' ? 'bg-blue-500 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Pay with Bank Account
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              {method === 'card' ? (
                <>
                  <h2 className="text-lg font-semibold text-slate-900">Card Payment Details</h2>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="cardNumber" className="text-sm font-medium text-slate-600">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="cardName" className="text-sm font-medium text-slate-600">
                        Name on Card
                      </label>
                      <input
                        id="cardName"
                        type="text"
                        placeholder="John Doe"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="expDate" className="text-sm font-medium text-slate-600">
                        Expiration Date
                      </label>
                      <input
                        id="expDate"
                        type="text"
                        placeholder="MM/YY"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="text-sm font-medium text-slate-600">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-slate-900">Bank Account Payment Details</h2>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <div>
                      <label htmlFor="accountHolder" className="text-sm font-medium text-slate-600">
                        Account Holder Name
                      </label>
                      <input
                        id="accountHolder"
                        type="text"
                        placeholder="John Doe"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="routingNumber" className="text-sm font-medium text-slate-600">
                        Routing Number
                      </label>
                      <input
                        id="routingNumber"
                        type="text"
                        placeholder="021000021"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="accountNumber" className="text-sm font-medium text-slate-600">
                        Account Number
                      </label>
                      <input
                        id="accountNumber"
                        type="text"
                        placeholder="000123456789"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="bankName" className="text-sm font-medium text-slate-600">
                        Bank Name
                      </label>
                      <input
                        id="bankName"
                        type="text"
                        placeholder="Bank of America"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mt-5 border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500">Amount to pay</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">$1,200.00</p>

                <button
                  type="button"
                  className="mt-4 rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Pay Now
                </button>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Account Summary</h2>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Outstanding Balance</span>
                  <span className="font-semibold">$1,200.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Due Date</span>
                  <span className="font-semibold">Oct 20, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Payment</span>
                  <span className="font-semibold">Sep 20, 2025</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PaymentCheckout;
