import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends Component {
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };
    state = {
        deal: this.props.initialDealData,
    };
    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        this.setState({
            deal: fullDeal,
        });
    }
    render() {
        const { deal } = this.state;
        return (
            <View style={styles.container}
            >
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backLink}>Back</Text>
                </TouchableOpacity>
                <Image source={{ uri: deal.media[0] }}
                    style={styles.image}
                />
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.detailcontainer}>
                    <View style={styles.pricecausecontainer}>
                        <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                    </View>
                    {deal.user && (
                    <View style={styles.useravatar}>
                        <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                        <Text style={styles.username}>{deal.user.name}</Text>
                    </View>
                    )}
                </View>
                <View style={styles.descriptioncontainer}>
                    <Text style={styles.description}>{deal.description}</Text>
                </View>
            </View>
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
    backLink: {
        margin: 5,
        color: '#8C756A',
        fontWeight: 'bold',
        fontSize: 15,
    },
    image: {
        width: '100%',
        height: 150,
    },
    title: {
        fontSize: 20,
        color: '#8C756A',
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    detailcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    pricecausecontainer: {
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
    useravatar: {
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
    },
    username: {
        fontSize: 18,
        color: '#0292B7',
    },
    descriptioncontainer: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#8C756A',
    },
    description: {
        fontSize: 16,
        color: '#0292B7',
    },
});

export default DealDetail;