import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';

class SearchBar extends Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    };
    state= {
        searchTerm: '',
    };
    debouncedSearchDeals = debounce(this.props.searchDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchDeals(this.state.searchTerm);
        });
    };
    render() {
        return (
            <TextInput
            placeholder="Search All Deals" style={styles.input}
            onChangeText={this.handleChange} />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        marginHorizontal: 12,
    },
});

export default SearchBar;