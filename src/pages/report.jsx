import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import axios from 'axios';

const TransactionTable = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [transactions, setTransactions] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get("http://148.251.225.118:3200/api/detailed-transaction").then((response) => {
      setTransactions(response.data.transaction)
    }).catch((error) => { console.log(error) });

    axios.get("http://148.251.225.118:3200/api/transaction-summary").then((response) => {
      // console.log(response)
      setSummary(response.data.summery)
    }).catch((error) => { console.log(error) });
  }, [])

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedTransaction(null);
    setOpenDialog(false);
  };

  return (

    <div className='transaction_table'>
      {summary ? (<div>
        <h1>Total Revenue = {summary.totalRevenue}</h1>
        <h1>Total Transaction Count = {summary.totalTransactionCount}</h1>
        </div>) : ""}

      <Table>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Date & Time</TableCell>
        </TableHead>
        <TableBody>
          {transactions ? transactions.transaction_list.map((transaction) => (
            <TableRow key={transaction.id} onClick={() => handleTransactionClick(transaction)}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.dateTime}</TableCell>
            </TableRow>
          )) : ""}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <DialogContentText>
              ID: {selectedTransaction.id}
              <br />
              Payment Mode: {selectedTransaction.paymentMode}
              <br />
              Customer Mobile: {selectedTransaction.custMobile}
              <br />
              Card Label: {selectedTransaction.cardLabel}
              <br />
              Invoice No: {selectedTransaction.invoiceNo}
              <br />
              Amonunt: {selectedTransaction.amount}
              <br />
              Currency: {selectedTransaction.currency}
              <br />
              Pan: {selectedTransaction.pan}
              <br />
              Date Time: {selectedTransaction.dateTime}
              <br />
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Report = () => {

  return (
    <div>
      <h1>Transaction List</h1>
      <TransactionTable />
    </div>
  );
};

export default Report;
