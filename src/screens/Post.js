import React, { Component } from "react";
import {
    Platform, StyleSheet, Text, View, Button, ActivityIndicator,
    FlatList,
    Alert,
    TouchableOpacity
} from "react-native";
import { WebView, Container, Card, CardItem, Header, Title, Content, List, ListItem, Left, Body, Right, Thumbnail, Icon, Item } from 'native-base';
import HTML from 'react-native-render-html';

export default class PostScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title,
            headerStyle: { backgroundColor: "#ccebff" },
            headerTitleStyle: { textAlign: "left", flex: 1 }
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: []
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', '1');
        const title = navigation.getParam('title', 'Athato');
        console.log("http://shyamjoshi.org/newsite/wp-json/wp/v2/posts/" + id);
        fetch("http://shyamjoshi.org/newsite/wp-json/wp/v2/posts/" + id)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
            })
            .catch(error => this.showAlert()) //to catch the errors if any
    }
    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }



    renderItem = (data) =>
        <TouchableOpacity style={styles.list}>
            <Text style={styles.lightText}>{data.item.content.rendered}</Text>
        </TouchableOpacity>
    render() {

        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                </View>
            )
        }
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <HTML style={{ fontSize: 30}} html={'<div style="font-size:20px">'+this.state.dataSource.content.rendered+'</div>'} />
                            </Body>
                        </CardItem>

                    </Card>
                </Content>
            </Container>
        )
    }
    showAlert() {
        Alert.alert(
            'Connection Failed',
            'Internet Connection required',
            [
                {
                    text: 'Cancel',
                    onPress: () => this.props.navigation.navigate("Home"),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.props.navigation.navigate("Home") },
            ]
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff",
        fontSize: 30,
        fontWeight: 'bold',
    },
    lightText: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff",
        fontSize: 20,
    }

});