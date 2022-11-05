import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import './Wallet.css';

function Wallet() {
  return (
    <section className="paidospais">
      <Header />
      <WalletForm />
      <Table />
    </section>

  );
}

export default Wallet;
