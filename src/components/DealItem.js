import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import { priceDisplay } from '../util';

class DealItem extends Component {
    static propTypes = {
        deal: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    handlePress = () => {
        this.props.onPress(this.props.deal.key);
    };
    render() {
        const { deal } = this.props;
        return (
            <TouchableOpacity style={styles.container}
            onPress={this.handlePress}
            >
                <Image source={{ uri: deal.media[0] }}
                    style={styles.image}
                />
                <View style={styles.textcontainer}>
                    <Text style={styles.title}>{deal.title}</Text>
                    <View style={styles.pricecausecontainer}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#DEE2EC',
        margin: 10,
        borderColor: 'grey',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: 150,
    },
    textcontainer: {
        margin: 10,
    },
    title: {
        fontSize: 20,
        color: '#8C756A',
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    pricecausecontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        color: '#1AC8DB',
        fontWeight: 'bold',
    },
    cause: {
        fontSize: 18,
        color: '#0292B7'
    },
});

export default DealItem;