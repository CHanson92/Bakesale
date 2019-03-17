import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, Image, View} from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends Component {
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
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
                <Image source={{ uri: deal.media[0] }}
                    style={styles.image}
                />
                <View style={styles.textcontainer}>
                    <Text style={styles.title}>{deal.title}</Text>
                    <View style={styles.detailscontainer}>
                    <View style={styles.pricecausecontainer}>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                    <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                    </View>
                    {deal.user && (
                    <View style={styles.userandavatar}>
                        <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                        <Text style={styles.username}>{deal.user.name}</Text>
                    </View>
                    )}
                    </View>
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
        marginTop: 50,
        borderColor: 'grey',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: 150,
    },
    textcontainer: {
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 20,
        color: '#8C756A',
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    detailscontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    pricecausecontainer: {
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        color: '#1AC8DB',
    },
    cause: {
        fontSize: 18,
        color: '#0292B7'
    },
    userandavatar: {
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
        margin: 10,
    },
    description: {
        fontSize: 16,
        color: '#0292B7',
    },
});

export default DealDetail;