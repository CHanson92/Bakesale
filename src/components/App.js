import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

class App extends Component {
  state = {
    deals: [],
    dealsFormSearch: [],
    currentDealId: null,
  };
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals })
  }
  searchDeals = async (searchTerm) => {
    let dealsFormSearch = [];
    if (searchTerm) {
    dealsFormSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    this.setState({ dealsFormSearch });
  };
  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId,
    });
  };
  unSetCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: null,
    });
  };
  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  };
  render() {
    if (this.state.currentDealId) {
      return (
        <View style={styles.main}>
        <DealDetail 
          initialDealData={this.currentDeal()}
          onBack={this.unSetCurrentDeal}  
        />
        </View>
      );
    }
    const dealsToDisplay = this.state.dealsFormSearch.length > 0 
      ? this.state.dealsFormSearch 
      : this.state.deals;

    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      );
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
  main: {
    marginTop: 40,
  },
});

export default App;
