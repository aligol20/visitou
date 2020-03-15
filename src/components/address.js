import React, {Component} from 'react';
import {Container, Input, Button, Text,Label,Right, View} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Picker from 'react-native-picker';
import {AsyncStorage, renderRow, Dimensions,ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import Ico2 from 'react-native-vector-icons/MaterialIcons'
import Icon9 from 'react-native-vector-icons/Entypo'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/Ionicons'
export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            situation: true,
            location: '',
            locloc: [],
            myLocation: '',
            address: 'آدرس دقیق  خود را اینجا بنویسید',
            locHis: '',
            addHis: '',
            buttonLabel:'انتخاب محله'
        }

    }

    componentDidMount() {
        this.getLocations();

    }

    getLocations() {
        try {
            console.log(Actions.state.index,'manman2');

            AsyncStorage.getItem('AddHistory', (err, store) => {
                console.log(JSON.parse(store), 'yuyuyuyuy');
                let ror = JSON.parse(store);
                if (store !== null) {
                    this.setState({  address: ror,situation:false})

                }
                

            });
            AsyncStorage.getItem('usrAddress', (err, store) => {
                if (store !== null) {
                    let yyy = JSON.parse(store);

                    this.setState({
                        address: yyy[0].address
                    });
                }


            });


            AsyncStorage.getItem('localsList', (err, store) => {
                let local = JSON.parse(store);
                console.log(local, 'djcdhfdkjvhkr');
                this.setState({
                    locloc: local.map(function (jh) {
                        return (
                            jh.local_name
                        )
                    }),
                })

            });
            //get offer list from koala server
        } catch (err) {
            console.log(err)
        }


    }

    kookoo(text) {
        this.setState({address: text});
        console.log(this.state.myLocation, 'gozzzzz');
            this.setState({situation: false});



    }

    damegooz() {
        console.log(this.state, 'gozzzzz');
        // this.setState({buttonLabel:this.state.myLocation});

        if (this.state.address !=='آدرس دقیق محل سکونت خود را اینجا بنویسید' && this.state.myLocation) {
            this.setState({situation: false});

        } else {
            this.setState({situation: true});

        }

    }
    showLocals() {
        Picker.init({
            pickerData: this.state.locloc
            ,
            selectedValue: [this.state.myLocation],
            pickerBg: [236, 240, 241, 1.0],
            pickerConfirmBtnText: 'خوبه',
            pickerFontSize:19,
            pickerConfirmBtnColor:[34, 167, 240,1.0],
            pickerCancelBtnColor:[108, 122, 137,1.0],
            pickerFontColor:[34, 49, 63,1.0],
            pickerCancelBtnText: 'فعلا نه',
            pickerTitleText: 'محله را انتخاب کنید',
            onPickerConfirm: items => {
                console.log(items[0], 'lalalala');
                this.setState({myLocation: items[0],buttonLabel:items[0]});
                this.damegooz()

                //this.saveMountSelected(parseFloat(items),result);
            },
            onPickerCancel: item => {
                console.log(item);
            },
            onPickerSelect: item => {
                console.log(item);
            }
        });
        Picker.show();
    }
    gozma() {
        let address = [];
        console.log(this.state.address,'manman');
        address.push({ address: this.state.address});
        AsyncStorage.setItem('usrAddress', JSON.stringify(address));
        AsyncStorage.setItem('AddHistory', JSON.stringify(this.state.address));
        console.log(this.state.myLocation, 'gohkhoriezafe');
        return (
            Actions.final()
        )
    }
    shoomi(){
        if(!this.state.situation){

            return(
                <Button style={{marginBottom:10,borderRadius:7,backgroundColor:'#22A7F0'}} disabled={this.state.situation}
                        onPress={() => this.gozma()}>
                    <Text style={{fontFamily:'B Koodak'}}>مرحله بعد (زمان تحویل)</Text>
                </Button>
            )
        }
            return(
                <Button style={{marginBottom:10,borderRadius:7,backgroundColor:'#6C7A89'}} disabled={this.state.situation}
                        onPress={() => this.gozma()}>
                    <Text style={{fontFamily:'B Koodak'}}>مرحله بعد (زمان تحویل)</Text>
                </Button>
            );


    }
    render() {
        let width = Dimensions.get('window').width; //full width

        let gish = true;
        return (
            <Container>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',backgroundColor:'white'
                    , justifyContent: 'center',
                    paddingBottom: 10
                }}>
                    <Icon style={{margin: 10}} name="shopping-cart" color="#2ECC71" size={30}
                    />


                    <Icon style={{margin: 10}} name="arrow-right" color="#F39C12" size={30}
                    />
                    <Icon9 style={{margin: 10}} name="location-pin" color="#F39C12" size={37}
                    />
                    <Icon style={{marginRight: 10, marginLeft: 10}} name="arrow-right" color="#F39C12" size={30}
                    />
                    <Icon5 style={{margin: 10}} name="check" color="#81CFE0" size={30}
                    />

                </View>
                  <View style={{height:'100%',backgroundColor:'white',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>




                    <Ico2 name='store' size={80} color='#34495E'/>

                    <View style={{margin:10,height:180}}>

                        <TextInput style={{color:'#34495E',fontFamily:'B Koodak',
                            backgroundColor: '#ffffff'
                            , borderWidth: 2, borderColor: '#34495E'
                            ,borderRadius:7,margin:10,
                            padding:10,height:200,width: 0.8*width
                        }}
                                   onChangeText={(text) => {this.setState({address:text});AsyncStorage.setItem('usrAddress',JSON.stringify([{local:text,address:text}]))}}
                               textAlign="right"
                               multiline={true}
                               numberOfLines={2}
                               maxLength={150}
                                   maxHeight={180}
                                   blurOnSubmit={true}
                                   keyboardType={'default'}
                                   underlineColorAndroid='rgba(0,0,0,0)'

                                   placeholder={this.state.address}/>

                    </View>
                    <View style={{marginTop:7}}>
                        <Button style={this.state.address  === 'آدرس دقیق  خود را اینجا بنویسید' || this.state.address === '' ? {marginBottom:10,borderRadius:7,backgroundColor:'#6C7A89'} : {marginBottom:10,borderRadius:7,backgroundColor:'#22A7F0'}}
                                onPress={() => this.state.address  ===  'آدرس دقیق  خود را اینجا بنویسید' || this.state.address ==='' ? alert('آدرس خالی است!') : Actions.final()}>
                            <Text style={{fontFamily:'B Koodak'}}>مرحله بعد (زمان تحویل)</Text>
                        </Button>
                    </View>
                    </View>
            </Container>


        );
    }
}

module.export = Address;