// Empty string if we haven't signed in before.
import { providers } from "near-api-js";
import { Action } from "near-api-js/lib/transaction";
import { SignAndSendTransactionParams } from "packages/core/src/lib/wallet";

export interface RequestSignInResponse {
  accountId: string;
  error: string | { type: string };
  notificationId: number;
  type: "narwallets-wallet-result";
}

export type SignOutResponse = true | { error: string | { type: string } };

export interface RpcInfo {
  explorerUrl: string;
  helperUrl: string;
  index: number;
  name: string;
  network: string;
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  wrapNearContract: string;
}

export interface GetRpcResponse {
  method: "getRpc";
  notificationId: number;
  rpc: RpcInfo;
  type: "narwallets-wallet-result";
}

export interface RequestSignInParams {
  contractId: string;
  methodNames?: Array<string>;
  amount?: string; // in yoctoⓃ
}

export interface RpcChangedResponse {
  explorerUrl: string;
  helperUrl: string;
  index: number;
  name: string;
  network: string;
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  wrapNearContract: string;
}

export interface SendMoneyParams {
  receiverId: string;
  amount: string;
}

export interface SignAndSendTransactionResponse {
  actionType: "DAPP/DAPP_POPUP_RESPONSE";
  method: "signAndSendTransactions";
  notificationId: number;
  error?: string;
  response?: Array<providers.FinalExecutionOutcome>;
  type: "narwallets-wallet-extensionResult";
}

export interface SignAndSendTransactionsResponse {
  actionType: "DAPP/DAPP_POPUP_RESPONSE";
  method: "signAndSendTransactions";
  notificationId: number;
  error?: string;
  response?: Array<providers.FinalExecutionOutcome>;
  type: "narwallets-wallet-extensionResult";
}

export interface Transaction {
  receiverId: string;
  actions: Array<Action>;
}

export interface RequestSignTransactionsParams {
  transactions: Array<Transaction>;
}

export interface NarwalletsEvents {
  signIn: () => void;
  signOut: () => void;
  accountChanged: (changedAccountId: string) => void;
  rpcChanged: (response: RpcChangedResponse) => void;
}

export interface InjectedNarwallets {
  isNarwallets: boolean;
  callbacks: Record<keyof NarwalletsEvents, unknown>;
  getAccountId: () => string | null;
  getRpc: () => Promise<GetRpcResponse>;
  requestSignIn: () => Promise<RequestSignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  isSignedIn: boolean;
  remove: (event: string) => void;
  on: <Event extends keyof NarwalletsEvents>(
    event: Event,
    callback: NarwalletsEvents[Event]
  ) => void;
  sendMoney: (params: SendMoneyParams) => Promise<unknown>;
  signAndSendTransaction: (
    params: SignAndSendTransactionParams
  ) => Promise<SignAndSendTransactionResponse>;
  requestSignTransactions: (
    params: RequestSignTransactionsParams
  ) => Promise<SignAndSendTransactionsResponse>;
}
