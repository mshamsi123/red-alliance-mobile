import React from 'react';
import { Form, Container, Header, Title, Accordion, TabHeading, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';


import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, View , BackHandler, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Matches from './Tabs/Matches'
import Pit from './Tabs/Pit'

export default class StatsTeamController extends React.Component {

    static propTypes = {
        team: PropTypes.number.isRequired,
        onBack: PropTypes.func.isRequired,
    }

    state = {
        refreshing: false,
        madeChanges: false,
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.props.refreshTeams();
        this.setState({refreshing: false});
    }


    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBack);
    }
    
    componentWillUnmount() {
        this.backHandler.remove()
    }
    
    acknowledgeChanges() {
        this.setState({madeChanges: true})
    }


    onBack = () => {
        if(this.state.madeChanges) {
            Alert.alert(
                'Continue without saving?',
                'If you go back, the fields will not be saved.',
                [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Continue',
                      onPress: () => {
                          ajax.removeScouterFromMatch(this.props.teamNumber, this.props.matchNumber);
                          this.props.onBack(); 
                      },
                    },
                ],
                { cancelable: true },
              );
            
        }
        
    }


    render () {
        return (
            <Container>
                  <Header>

                    <Left style={{ paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Button transparent onPress={this.onBack}>
                                <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Team {this.props.team}</Title>
                    </Body>
                    <Right style={{  justifyContent: 'flex-end', alignItems: 'flex-end' }}/>
                  </Header>
                  <Tabs>
                        <Tab heading={ <TabHeading><Text>Matches</Text></TabHeading>}>
                            <Matches team={this.props.team}/>
                        </Tab>
                        <Tab heading={ <TabHeading><Text>Pit</Text></TabHeading>}>
                            <Pit team={this.props.team} />
                        </Tab>
                    </Tabs>
            </Container>
        );
        
    }
    
}




const styles = StyleSheet.create({
    ribbon: {
        width: 15,
        height: 40,
    },
    team: {
      color: 'black',
      fontSize: 18,
      flex: 1,
    },
    type: {
      color: 'black',
      fontSize: 16,
      flex: 1,
    },
    scouter: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cell: {
        flexDirection: 'row'
    }
  });
  