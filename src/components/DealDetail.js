import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, PanResponder, Animated, Image, View, Dimensions } from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax';
import { throwStatement } from '@babel/types';

class DealDetail extends Component {
    imageXPos = new Animated.Value(0);
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            this.imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            this.width = Dimensions.get('window').width;
            if (Math.abs(gs.dx) > this.width * 0.4 ) {
                const direction = Math.sign(gs.dx)
                // -1 for left, 1 for right
                Animated.timing(this.imageXPos, {
                    toValue: direction * this.width,
                    duration: 250,
                }).start(() => this.handleSwipe(-1 * direction));
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                }).start();
            }
        }
    });

    handleSwipe = (indexDirection) => {
        if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
            return;
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            // Next image animation
            this.imageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
        });
    }

    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };
    state = {
        deal: this.props.initialDealData,
        imageIndex: 0,
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
                <Animated.Image 
                    {...this.imagePanResponder.panHandlers} 
                    source={{ uri: deal.media[this.state.imageIndex] }}
                    style={[{ left: this.imageXPos }, styles.image]}
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
        borderColor: 'grey',
        borderTopWidth: 1,
        borderBottomWidth: 1,
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