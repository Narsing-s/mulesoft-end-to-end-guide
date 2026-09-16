%dw 2.0
output application/json
---
{
  customer: {
    name: payload.full_name,
    email: payload.email,
    address: payload.address default ""
  },
  account: {
    accountNumber: payload.account_number,
    bankName: payload.bank_name,
    balance: payload.balance as Number,
    status: payload.status
  }
}
