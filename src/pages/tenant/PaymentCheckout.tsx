import { useState } from 'react';
import type { FormEvent } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

type PaymentMethod = 'card' | 'bank';

type CardForm = {
  cardNumber: string;
  cardName: string;
  expDate: string;
  cvv: string;
};

type BankForm = {
  accountHolder: string;
  routingNumber: string;
  accountNumber: string;
  bankName: string;
};

const EMPTY_CARD_FORM: CardForm = { cardNumber: '', cardName: '', expDate: '', cvv: '' };
const EMPTY_BANK_FORM: BankForm = {
  accountHolder: '',
  routingNumber: '',
  accountNumber: '',
  bankName: '',
};

const PaymentCheckout = () => {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [cardForm, setCardForm] = useState<CardForm>(EMPTY_CARD_FORM);
  const [bankForm, setBankForm] = useState<BankForm>(EMPTY_BANK_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (method === 'card') {
      if (
        !cardForm.cardNumber.trim() ||
        !cardForm.cardName.trim() ||
        !cardForm.expDate.trim() ||
        !cardForm.cvv.trim()
      ) {
        setErrorMessage('Please complete all card payment fields before submitting.');
        return;
      }
      setSuccessMessage('Payment submitted successfully. Your card payment is being processed.');
      setCardForm(EMPTY_CARD_FORM);
      return;
    }

    if (
      !bankForm.accountHolder.trim() ||
      !bankForm.routingNumber.trim() ||
      !bankForm.accountNumber.trim() ||
      !bankForm.bankName.trim()
    ) {
      setErrorMessage('Please complete all bank account fields before submitting.');
      return;
    }

    setSuccessMessage('Payment submitted successfully. Your bank transfer is being processed.');
    setBankForm(EMPTY_BANK_FORM);
  };

  return (
    <MainLayout title="Payments" subtitle="Choose payment method and submit securely">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={method === 'card' ? 'primary' : 'secondary'}
          onClick={() => setMethod('card')}
          className="text-sm"
        >
          Pay with Card
        </Button>
        <Button
          variant={method === 'bank' ? 'primary' : 'secondary'}
          onClick={() => setMethod('bank')}
          className="text-sm"
        >
          Pay with Bank Account
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="border border-slate-200">
          <h2 className="mb-4 text-2xl font-medium">Payment Details</h2>

          <form className="grid gap-3" onSubmit={handleSubmit}>
            {method === 'card' ? (
              <>
                <label htmlFor="card-number" className="sr-only">
                  Card number
                </label>
                <input
                  id="card-number"
                  value={cardForm.cardNumber}
                  onChange={(event) =>
                    setCardForm((prev) => ({ ...prev, cardNumber: event.target.value }))
                  }
                  placeholder="Card number"
                  autoComplete="cc-number"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                />

                <label htmlFor="card-name" className="sr-only">
                  Name on card
                </label>
                <input
                  id="card-name"
                  value={cardForm.cardName}
                  onChange={(event) =>
                    setCardForm((prev) => ({ ...prev, cardName: event.target.value }))
                  }
                  placeholder="Name on card"
                  autoComplete="cc-name"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="card-expiration" className="sr-only">
                      Expiration date
                    </label>
                    <input
                      id="card-expiration"
                      value={cardForm.expDate}
                      onChange={(event) =>
                        setCardForm((prev) => ({ ...prev, expDate: event.target.value }))
                      }
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvv" className="sr-only">
                      Security code
                    </label>
                    <input
                      id="card-cvv"
                      value={cardForm.cvv}
                      onChange={(event) =>
                        setCardForm((prev) => ({ ...prev, cvv: event.target.value }))
                      }
                      placeholder="CVV"
                      autoComplete="cc-csc"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <label htmlFor="account-holder" className="sr-only">
                  Account holder name
                </label>
                <input
                  id="account-holder"
                  value={bankForm.accountHolder}
                  onChange={(event) =>
                    setBankForm((prev) => ({ ...prev, accountHolder: event.target.value }))
                  }
                  placeholder="Account holder name"
                  autoComplete="name"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                />

                <label htmlFor="routing-number" className="sr-only">
                  Routing number
                </label>
                <input
                  id="routing-number"
                  value={bankForm.routingNumber}
                  onChange={(event) =>
                    setBankForm((prev) => ({ ...prev, routingNumber: event.target.value }))
                  }
                  placeholder="Routing number"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                />

                <label htmlFor="account-number" className="sr-only">
                  Account number
                </label>
                <input
                  id="account-number"
                  value={bankForm.accountNumber}
                  onChange={(event) =>
                    setBankForm((prev) => ({ ...prev, accountNumber: event.target.value }))
                  }
                  placeholder="Account number"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                />

                <label htmlFor="bank-name" className="sr-only">
                  Bank name
                </label>
                <input
                  id="bank-name"
                  value={bankForm.bankName}
                  onChange={(event) =>
                    setBankForm((prev) => ({ ...prev, bankName: event.target.value }))
                  }
                  placeholder="Bank name"
                  autoComplete="organization"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                />
              </>
            )}

            {errorMessage ? (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errorMessage}
              </p>
            ) : null}
            {successMessage ? (
              <p role="status" aria-live="polite" className="mt-1 text-sm text-emerald-600">
                {successMessage}
              </p>
            ) : null}

            <Button type="submit" className="mt-2 text-sm" aria-label="Submit payment">
              Pay Now
            </Button>
          </form>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="mb-4 text-2xl font-medium">Account Summary</h2>
          <p className="text-base">Outstanding Balance: $1,200.00</p>
          <p className="text-base">Due Date: Oct 20, 2025</p>
          <p className="mt-2 text-sm text-gray-500">Last Payment: Sep 20, 2025</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentCheckout;
