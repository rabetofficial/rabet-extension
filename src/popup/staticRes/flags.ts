export const required =
  'Requires the issuing account to give other accounts permission before they can hold the issuing account’s credit.';
export const revocable =
  'Allows the issuing account to revoke its credit held by other accounts.';
export const immutable =
  'If this is set then none of the authorization flags can be changed and the account can never be deleted.';
export const clawback =
  'Enables clawbacks for all assets issued by this account. Note that this only applies along trustlines established after this flag has been set. Requires authorization revocable.';
