import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';

class App extends Component {
  state = {
    deals: [],
    currentDealId: null,
  };
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({deals})
  }
  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    });
  };
  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  };
  render() {
    if (this.state.currentDealId) {
      return <DealDetail initialDealData={this.currentDeal()} />
    }
    if (this.state.deals.length > 0) {
        return <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bakesale</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
  },
});

export default App;