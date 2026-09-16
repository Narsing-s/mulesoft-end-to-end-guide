-- Synthetic learning database only. Never use real customer data.

CREATE TABLE customers (
  customer_id BIGINT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  date_of_birth DATE NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  email VARCHAR(200) NOT NULL,
  address VARCHAR(255)
);

CREATE TABLE accounts (
  account_id BIGINT PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  account_number VARCHAR(30) NOT NULL UNIQUE,
  bank_name VARCHAR(80) NOT NULL,
  balance DECIMAL(18,2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL,
  CONSTRAINT fk_accounts_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE transactions (
  transaction_id VARCHAR(50) PRIMARY KEY,
  from_account VARCHAR(30),
  to_account VARCHAR(30),
  amount DECIMAL(18,2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(30) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE idempotency_keys (
  idempotency_key VARCHAR(120) PRIMARY KEY,
  transaction_id VARCHAR(50),
  response_json TEXT,
  created_at TIMESTAMP NOT NULL
);

INSERT INTO customers VALUES (1, 'Priya Kumar', '1995-04-12', '9999999999', 'priya@example.test', 'Hyderabad');
INSERT INTO accounts VALUES (1, 1, 'DEMO00000001', 'DEMO-BANK', 12500.50, 'ACTIVE');
