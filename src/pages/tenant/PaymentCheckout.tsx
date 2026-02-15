import { useState } from 'react';
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

  const handleSubmit = () => {
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
          <h2 className="text-2xl font-medium mb-4">Payment Details</h2>

          {method === 'card' ? (
            <div className="grid gap-3">
              <input
                value={cardForm.cardNumber}
                onChange={(event) =>
                  setCardForm((prev) => ({ ...prev, cardNumber: event.target.value }))
                }
                placeholder="Card number"
                className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
              />
              <input
                value={cardForm.cardName}
                onChange={(event) =>
                  setCardForm((prev) => ({ ...prev, cardName: event.target.value }))
                }
                placeholder="Name on card"
                className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  value={cardForm.expDate}
                  onChange={(event) =>
                    setCardForm((prev) => ({ ...prev, expDate: event.target.value }))
                  }
                  placeholder="MM/YY"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                />
                <input
                  value={cardForm.cvv}
                  onChange={(event) =>
                    setCardForm((prev) => ({ ...prev, cvv: event.target.value }))
                  }
                  placeholder="CVV"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              <input
                value={bankForm.accountHolder}
                onChange={(event) =>
                  setBankForm((prev) => ({ ...prev, accountHolder: event.target.value }))
                }
                placeholder="Account holder name"
                className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
              />
              <input
                value={bankForm.routingNumber}
                onChange={(event) =>
                  setBankForm((prev) => ({ ...prev, routingNumber: event.target.value }))
                }
                placeholder="Routing number"
                className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
              />
              <input
                value={bankForm.accountNumber}
                onChange={(event) =>
                  setBankForm((prev) => ({ ...prev, accountNumber: event.target.value }))
                }
                placeholder="Account number"
                className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
              />
              <input
                value={bankForm.bankName}
                onChange={(event) =>
                  setBankForm((prev) => ({ ...prev, bankName: event.target.value }))
                }
                placeholder="Bank name"
                className="rounded-lg border border-slate-300 px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#56CCF2]"
              />
            </div>
          )}

          {errorMessage ? <p className="mt-4 text-sm text-red-600">{errorMessage}</p> : null}
          {successMessage ? (
            <p className="mt-4 text-sm text-emerald-600">{successMessage}</p>
          ) : null}

          <Button onClick={handleSubmit} className="mt-4 text-sm" aria-label="Submit payment">
            Pay Now
          </Button>
        </Card>

        <Card className="border border-slate-200">
          <h2 className="text-2xl font-medium mb-4">Account Summary</h2>
          <p className="text-base">Outstanding Balance: $1,200.00</p>
          <p className="text-base">Due Date: Oct 20, 2025</p>
          <p className="text-sm text-gray-500 mt-2">Last Payment: Sep 20, 2025</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentCheckout;
