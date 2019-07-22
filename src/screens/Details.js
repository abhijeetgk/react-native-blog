import React, { Component } from "react";
import {
    Platform, StyleSheet, Text, View, Button, ActivityIndicator,
    FlatList,
    Alert,
    TouchableOpacity,ImageBackground
} from "react-native";
import dimages from '../images';

import listing82 from '../data/offline/82.json';
import listing1 from '../data/offline/1.json';
import listing2 from '../data/offline/2.json';
import * as RNFS from 'react-native-fs';


let colors = ['#123456', '#654321', '#fdecba', '#abcdef'];
export default class DetailsScreen extends Component {
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
    async componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', '1');
        const title = navigation.getParam('title', 'Athato');
        // console.log("data"+listing82);
        let staticdata = ""; 
        
        await fetch("http://shyamjoshi.org/newsite/wp-json/wp/v2/categories?parent="+ id + "&per_page=100")
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
                if(responseJson==""){
                    this.props.navigation.navigate("CategoryList", { id: id, title: title })
                }

            })
            .catch(error => {
                if(id==82){ staticdata=listing82;}
                if(id==1){ staticdata=listing1;}
                if(id==2){ staticdata=listing2;}
                if(id==4 || id==5){
                    return this.showAlert();
                }
                this.setState({
                                loading: false,
                                dataSource: staticdata
                            })
            }) //to catch the errors if any
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
            <Text style={styles.lightText} onPress={() => { this.props.navigation.navigate("CategoryList", { id: data.item.id, title: data.item.name }) }}>{data.item.name}</Text>
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
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            
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