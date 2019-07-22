import React, { Component } from "react";
import {
    Platform, StyleSheet, Text, View, Button, ActivityIndicator,
    FlatList,
    Alert,
    TouchableOpacity
} from "react-native";
import catlisting10 from '../data/offline/catlist/10.json';
import catlisting11 from '../data/offline/catlist/11.json';
import catlisting15 from '../data/offline/catlist/15.json';
import catlisting14 from '../data/offline/catlist/14.json';
import catlisting12 from '../data/offline/catlist/12.json';
import catlisting13 from '../data/offline/catlist/13.json';
import catlisting18 from '../data/offline/catlist/18.json';
import catlisting17 from '../data/offline/catlist/17.json';
import catlisting21 from '../data/offline/catlist/21.json';
import catlisting19 from '../data/offline/catlist/19.json';
import catlisting22 from '../data/offline/catlist/22.json';
import catlisting20 from '../data/offline/catlist/20.json';
import catlisting49 from '../data/offline/catlist/49.json';
import catlisting16 from '../data/offline/catlist/16.json';







export default class CategoryListScreen extends Component {
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

        fetch("http://shyamjoshi.org/newsite/wp-json/wp/v2/posts?categories="+ id + "&per_page=100")
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
            })
            .catch(error => {
                console.log(id);
                if(id==10){ staticdata=catlisting10;}
                if(id==11){ staticdata=catlisting11;}
                if(id==15){ staticdata=catlisting15;}
                if(id==14){ staticdata=catlisting14;}
                if(id==12){ staticdata=catlisting12;}

                if(id==13){ staticdata=catlisting13;}
                if(id==18){ staticdata=catlisting18;}
                if(id==17){ staticdata=catlisting17;}
                if(id==21){ staticdata=catlisting21;}
                if(id==19){ staticdata=catlisting19;}
                if(id==22){ staticdata=catlisting22;}
                if(id==20){ staticdata=catlisting20;}
                if(id==49){ staticdata=catlisting49;}
                if(id==16){ staticdata=catlisting16;}
                

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
    <Text style={styles.lightText} onPress={() => { this.props.navigation.navigate("Post", { id: data.item.id, title: data.item.title.rendered }) }}>{data.item.title.rendered}</Text>
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