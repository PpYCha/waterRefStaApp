import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';

const HomeScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [transactionCount, setTransactionCount] = useState(0);
  const [profit, setProfit] = useState(0.0);
  const [expensesMain, setExpensesMain] = useState(0.0);
  const [netSales, setNetSales] = useState(0.0);
  const [meterAm, setMeterAm] = useState();
  const [meterPm, setMeterPm] = useState();
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const fetchMeter = async () => {
    try {
      const db_firestore = firestore();
      const querySnapshot = await db_firestore.collection('meters').get();
      let meterAMs;
      let meterPMs;
      querySnapshot.forEach(doc => {
        meterAMs = parseFloat(doc.data().meterAM);
        meterPMs = parseFloat(doc.data().meterPM);
      });
      setMeterAm(meterAMs);
      setMeterPm(meterPMs);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfit = async () => {
    try {
      const transactionRef = firestore().collection('transactions');
      const startDatee = new Date(startDate);
      const endDatee = new Date(endDate);

      const querySnapshot = await transactionRef
        .where('date', '>=', startDatee)
        .where('date', '<=', endDatee)
        .get();
      let total = 0;
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        total += doc.data().total;
      });
      setTransactionCount(querySnapshot.size);
      setProfit(total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const expensesRef = firestore().collection('expenses');
      const startDatee = new Date(startDate);
      const endDatee = new Date(endDate);

      const querySnapshot = await expensesRef
        .where('date', '>=', startDatee)
        .where('date', '<=', endDatee)
        .get();
      let expensesAmount = 0;

      querySnapshot.forEach(doc => {
        expensesAmount += parseFloat(doc.data().amount);
      });
      setExpensesMain(expensesAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNetSales = async () => {
    try {
      let gross = profit;
      const expensesRef = firestore().collection('expenses');

      const startDatee = new Date(startDate);
      const endDatee = new Date(endDate);

      const querySnapshot = await expensesRef
        .where('date', '>=', startDatee)
        .where('date', '<=', endDatee)
        .get();
      let expensesAmount = 0;

      querySnapshot.forEach(doc => {
        expensesAmount += parseFloat(doc.data().amount);
      });
      setExpensesMain(expensesAmount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfit();
    fetchExpenses();
    fetchNetSales();
    fetchMeter();
  }, [startDate]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <DatePicker
          modal
          mode="date"
          open={openStart}
          date={startDate}
          onConfirm={startDate => {
            setOpenStart(false);
            setStartDate(startDate);
          }}
          onCancel={() => {
            setOpenStart(false);
          }}
        />
        <Button
          title={startDate.toLocaleDateString()}
          onPress={() => setOpenStart(true)}
          style={styles.button}
        />

        <DatePicker
          modal
          mode="date"
          open={openEnd}
          date={endDate}
          onConfirm={endDate => {
            setOpenEnd(false);
            setEndDate(endDate);
          }}
          onCancel={() => {
            setOpenEnd(false);
          }}
        />
        <Button
          title={endDate.toLocaleDateString()}
          onPress={() => setOpenEnd(true)}
          style={styles.button}
        />
      </View>
      <View>
        <View style={styles.paperContainer}>
          <Text style={[styles.text, styles.textMeterAM]}>
            meterAM:{meterAm}
          </Text>
        </View>
        <View style={styles.paperContainer}>
          <Text style={[styles.text, styles.textMeterPM]}>
            meterPM:{meterPm}
          </Text>
        </View>
        <View style={styles.paperContainer}>
          <Text style={[styles.text, styles.textTransactionCount]}>
            transactionCount:{transactionCount}
          </Text>
        </View>
        <View style={styles.paperContainer}>
          <Text style={[styles.text, styles.textExpenses]}>
            expenses: {expensesMain}
          </Text>
        </View>
        <View style={styles.paperContainer}>
          <Text style={[styles.text, styles.textGrossSales]}>
            Gross Sales: {profit}
          </Text>
        </View>
        <View style={styles.paperContainer}>
          <Text style={[styles.text, styles.textNetsales]}>
            netsales: {profit}
          </Text>
        </View>
        <View style={styles.paperContainer}>
          <Text style={[styles.text, styles.textNetIncome]}>
            netIncome: {profit - expensesMain}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginVertical: 10,
  },
  paperContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    elevation: 3, // for android
    shadowColor: 'black', // for ios
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  textMeterAM: {
    color: 'red',
  },
  textMeterPM: {
    color: 'blue',
  },
  textTransactionCount: {
    color: 'green',
  },
  textExpenses: {
    color: 'purple',
  },
  textGrossSales: {
    color: 'orange',
  },
  textNetsales: {
    color: 'pink',
  },
  textNetIncome: {
    color: 'black',
  },
});
