import React, { Component } from "react";
import { StyleSheet, Text,Image } from "react-native";
import { Container, Header, Title, Content, Left, Body} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as links from '../data/menu.json';
import dimages from '../images';


export default class App extends Component{
    static navigationOptions = {
        header: null,
      };
    render() {
        return (
            <Container>
                 <Image
            style={{
              flex: 1,
              position:'absolute',
              width:'100%',
              height:'100%',opacity:0.4
            }}
            source={dimages['homebg']}
          />
                {/* <ImageBackground source={dimages['homebg']} style={{ width:'100%',height:'100%',opacity: 0.0 }}> */}
                <Header noShadow style={styles.title} opacity={0.9}>
                <Left>
                            <Image style={{width:40,height:40}} source={dimages['homebg']} />
                            </Left>
                    <Body>
                        <Title style={styles.title}>अथातो ब्रह्म-जिज्ञासा</Title>
                        {/* <Subtitle style={styles.subtitle}>ऊँ उद् बुध्यस्वाग्ने प्रतिजागृहि</Subtitle> */}
                        
                    </Body>
                </Header>
                <Content>
                    <Grid>{
                        links.links.map((item, index) => {
                            if (index % 2 == 0) {
                                return (
                                    <Row key={index}>
                                        <Col style={styles.colElement}><Text style={styles.txtElement} onPress={() => { this.props.navigation.navigate("Details", { id: links.links[index].id, title: links.links[index].name }) }}>{links.links[index].name}</Text></Col>
                                        <Col style={styles.colElement}><Text style={styles.txtElement} onPress={() => { this.props.navigation.navigate("Details", { id: links.links[index + 1].id, title: links.links[index + 1].name }) }} >{links.links[index + 1].name}</Text></Col>
                                    </Row>
                                )
                            }
                            else {
                                return null;
                            }

                        })
                    }
                    </Grid>


                </Content>
                {/* </ImageBackground> */}
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    colElement: {
        height: 50,
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: '#ffdca8',
        margin: 2,
        backgroundColor: '#ffdca8',
        textAlignVertical: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color:'#1a51ab'

    },
    txtElement: {
        fontSize: 23,
        borderColor: '#fff',
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 0.3,
        textAlignVertical: 'center',
        justifyContent: 'center',
        color:'#021129'
    },
    title:{
        fontSize: 22,
        color:'#000000',
        backgroundColor: '#ffdca8',
        opacity:0.9, fontWeight: 'bold',
        width:'100%',
        textAlign: 'left',
    },
    subtitle:{
        fontSize: 12,
        color:'#000',
        
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'left',
        width:'100%', 
    },
    bgimage: {
        flex: 1,
        // alignSelf: 'stretch',
        resizeMode: 'cover',
        width: null,

    }

});
