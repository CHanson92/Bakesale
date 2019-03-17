import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import DealItem from './DealItem'

class DealList extends Component {
    static propTypes = {
        deals: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired,
    }
    render() {
        return (
            <View style={styles.list}>
            <FlatList
            data={this.props.deals}
            renderItem={({item}) => <DealItem deal={item} onPress={this.props.onItemPress} />}
            />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#FBF6F3',
        flex: 1,
        width: '100%',
        paddingTop: 50,
    },
});

export default DealList;