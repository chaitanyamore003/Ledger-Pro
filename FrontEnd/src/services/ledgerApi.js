import axiosInstance from "./axiosInstance";

export const getDashboardSummary = () => {
  return axiosInstance.get("/accounts/summary");
};

export const getAccounts = () => {
  return axiosInstance.get("/accounts");
};

export const getDemoRecipients = () => {
  return axiosInstance.get("/accounts/demo-recipients");
};

export const initializeInitialFunds = ({ amount, idempotencyKey }) => {
  return axiosInstance.post("/accounts/initial-funds", {
    amount,
    idempotencyKey,
  });
};

export const getTransactions = () => {
  return axiosInstance.get("/transactions");
};

export const createTransaction = (transactionData) => {
  return axiosInstance.post("/transactions", transactionData);
};
