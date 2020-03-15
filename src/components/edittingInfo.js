import React, {Component} from 'react';
import {Container, Body, Center, Content,Item,Input, Right, Root, Icon, Button, Text} from 'native-base';
import {Modal,Share,StyleSheet,Linking,Picker,ListView,TouchableWithoutFeedback, View, Dimensions,Alert, AsyncStorage, ActivityIndicator,TouchableHighlight, ScrollView} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-banner-carousel';
import DialogManager, {ScaleAnimation, SlideAnimation, DialogComponent} from 'react-native-dialog-component';
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import Icon5 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/EvilIcons'
import Icon7 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon8 from 'react-native-vector-icons/Ionicons'
import Icon9 from 'react-native-vector-icons/Octicons'
import {ProgressDialog} from 'react-native-simple-dialogs';
import moment from 'jalali-moment';


export default class EdittingInfo extends Component {
    constructor(props, context) {
        super(props, context);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            visible: false,
            waiting: false,
            v: false,
            laws: false,
            rrr: '123',
            selectedCat: '',
            dataSource: dss.cloneWithRows([]),
            city: [],
            isLoading: true,
            item: '',
            asb: [],
            myCity: '',
            editDialog: false,
            info: [],
            buttonLabel: '',
            myLocation: '',
            address: '',
            job: '',
            worphone: '',
            nameChanged: '',
            familyChanged: '',
            addressChanged: '',
            favoriteList: dss.cloneWithRows([]),
            messages: dss.cloneWithRows([]),
            visibleM: false,
            fdfdf: '',
            addressChanged:'',
            fuckingNumber:'',


        };
        this.getInfo();
        AsyncStorage.getItem('whereAmI', (err, store) => {
            this.setState({myCity: JSON.parse(store)})
        })
        AsyncStorage.getItem('wherewhere', (err, store) => {
            this.setState({fdfdf: store})
        })


    }
    getInfo(){
        AsyncStorage.getItem('userInfo', (err, store) => {
            console.log(JSON.parse(store)[0].phone, 'mahnazparivash899999');
            let pop = JSON.parse(store)[0].phone;
            let gooz={phoneNumber:pop};
            this.setState({fuckingNumber:pop});

           fetch('http://visitou.ir/api/get_user_information.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gooz)
            }).then((response) => response.json())
               .then((responseJson) => {
            let rfr=[{
                family: responseJson[0].family,
                job: responseJson[0].job,
                name:responseJson[0].name,
                phone: responseJson[0].phonenumber,
                workPhone: responseJson[0].work_phone,
                address:responseJson[0].address1
            }];
                   console.log(responseJson, '123444444');
                   console.log(JSON.parse(store), '12344444455');
                   this.setState({familyChanged:responseJson[0].family,
                   nameChanged:responseJson[0].name,
                       addressChanged:responseJson[0].address1,
                       job:responseJson[0].job,
                       worphone:responseJson[0].work_phone
                   });
            this.setState({info:rfr,isLoading:false});


            console.log(JSON.stringify(gooz),'123444444');
        });





        });

    }
    updateInfo(){
        console.log('jujuj','im here!!!!!');

        // this.setState({editDialog:false});
        let e= this.state.familyChanged;
        let a= this.state.nameChanged;
        let b= this.state.info[0].phone;
        let c=this.state.job;
        let d=this.state.worphone;
        console.log(e,'sfdfldjfdfkd');
        console.log(a,'sfdfldjfdfkd2');
        console.log(b,'sfdfldjfdfkd3');
        console.log(c,'sfdfldjfdfkd4');
        console.log(d,'sfdfldjfdfkd5');
        let yt = [{
            family: this.state.familyChanged,
            name: this.state.nameChanged,
            phone: this.state.info[0].phone,
            job: this.state.job,
            workPhone: this.state.worphone
        }];
        console.log( yt,'ssslsslslkdlkdw');

        if (a!=='' && b!=='' && c!=='' && d!=='' && e!=='') {
            let yt = [{
                family: this.state.familyChanged,
                name: this.state.nameChanged,
                phone: this.state.info[0].phone,
                job: this.state.job,
                workPhone: this.state.worphone
            }];
            let dd = [{
                family: this.state.familyChanged,
                name: this.state.nameChanged,
                phone: this.state.info[0].phone,
                job: this.state.job,
                workPhone: this.state.worphone
            }];
            console.log( c,'sfdfldjfdfkdaaaccccc');
            AsyncStorage.setItem('userInfo', JSON.stringify(yt));
            let frf = {address: this.state.address};
            console.log(this.state.address,dd,'sfdfldjfdfkdaaa');
            AsyncStorage.setItem('AddHistory', JSON.stringify(this.state.address));
            const url = 'http://visitou.ir/api/update_user.php';
            fetch('http://visitou.ir/api/update_user.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dd)
            }).then((response) =>console.log('azqwsxcde',response));

            // this.getInfo();
        }else {
            console.log(this.state.address,'sfdfldjfdfkdaaabbbbbb');
            AsyncStorage.setItem('AddHistory', JSON.stringify(this.state.address));
            // this.getInfo();
        }


    }
    render() {
        function shest(uiui) {

            AsyncStorage.setItem('product', JSON.stringify(uiui));
            console.log(uiui, 'qwerty1234');
            return (
                Actions.details({title: uiui.product_name})

            )


        }

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (

        <Content style={{backgroundColor: 'white'}}>

        <View style={{
                                width: '100%', backgroundColor: 'white', marginTop: 30, marginBottom: 10
                                , justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{fontFamily: 'B Koodak', fontSize: 23}}>ویرایش اطلاعات</Text>
                            </View>
                            <View style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
                                    <Input style={{
                                        color: '#34495E', fontFamily: 'B Koodak',
                                        backgroundColor: '#ffffff'
                                        , borderWidth: 1, borderColor: '#6C7A89'
                                        , borderRadius: 7, margin: 10,
                                        paddingTop: 10, paddingBottom: 10, width: '80%'
                                    }}
                                           textAlign="right"
                                           multiline={true}
                                           numberOfLines={2}
                                           maxLength={150}
                                           maxHeight={100}
                                           blurOnSubmit={true}
                                           keyboardType={'default'}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           onChangeText={(text) => this.setState({nameChanged: text})}

                                           placeholder={this.state.info.length !== 0 ? this.state.nameChanged : 'name'}/>
                                    <Text style={{fontFamily: 'B Koodak', fontSize: 17}}>نام</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
                                    <Input style={{
                                        color: '#34495E', fontFamily: 'B Koodak',
                                        backgroundColor: '#ffffff'
                                        , borderWidth: 1, borderColor: '#6C7A89'
                                        , borderRadius: 7, margin: 10,
                                        paddingTop: 10, paddingBottom: 10, width: '80%'
                                    }}
                                           textAlign="right"
                                           multiline={true}
                                           numberOfLines={2}
                                           maxLength={150}
                                           maxHeight={100}
                                           blurOnSubmit={true}
                                           keyboardType={'default'}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           onChangeText={(text) => this.setState({familyChanged: text})}

                                           placeholder={this.state.length !== 0 ? this.state.familyChanged : 'family'}/>
                                    <Text style={{fontFamily: 'B Koodak', fontSize: 17}}>نام خانوادگی</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
                                    <Input style={{
                                        color: '#34495E', fontFamily: 'B Koodak',
                                        backgroundColor: '#ffffff'
                                        , borderWidth: 1, borderColor: '#6C7A89'
                                        , borderRadius: 7, margin: 10,
                                        paddingTop: 10, paddingBottom: 10, width: '80%'
                                    }}
                                           textAlign="right"
                                           multiline={true}
                                           numberOfLines={2}
                                           maxLength={150}
                                           maxHeight={100}
                                           blurOnSubmit={true}
                                           keyboardType={'default'}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           onChangeText={(text) => this.setState({addressChanged: text})}

                                           placeholder={this.state.length !== 0 ? this.state.addressChanged : 'address'}/>
                                    <Text style={{fontFamily: 'B Koodak', fontSize: 17}}>آدرس</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
                                    <Input style={{
                                        color: '#34495E', fontFamily: 'B Koodak',
                                        backgroundColor: '#ffffff'
                                        , borderWidth: 1, borderColor: '#6C7A89'
                                        , borderRadius: 7, margin: 10,
                                        paddingTop: 10, paddingBottom: 10, width: '80%'
                                    }}
                                           textAlign="right"
                                           multiline={true}
                                           numberOfLines={2}
                                           maxLength={150}
                                           maxHeight={100}
                                           blurOnSubmit={true}
                                           keyboardType={'default'}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           onChangeText={(text) => this.setState({job: text})}

                                           placeholder={this.state.info.length !== 0 ? this.state.job : 'job'}/>
                                    <Text style={{fontFamily: 'B Koodak', fontSize: 17}}>شغل</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
                                    <Input style={{
                                        color: '#34495E', fontFamily: 'B Koodak',
                                        backgroundColor: '#ffffff'
                                        , borderWidth: 1, borderColor: '#6C7A89'
                                        , borderRadius: 7, margin: 10,
                                        paddingTop: 10, paddingBottom: 10, width: '80%'
                                    }}
                                           textAlign="right"
                                           multiline={true}
                                           numberOfLines={2}
                                           maxLength={150}
                                           maxHeight={100}
                                           blurOnSubmit={true}
                                           keyboardType={'default'}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           onChangeText={(text) => this.setState({worphone: text})}

                                           placeholder={this.state.info.length !== 0 ? this.state.worphone : 'workPhone'}/>
                                    <Text style={{fontFamily: 'B Koodak', fontSize: 17}}>تلفن</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Button
                                        onPress={() => {
                                            let e= this.state.familyChanged;
                                            let a= this.state.nameChanged;
                                            let b= this.state.info[0].phone;
                                            let c=this.state.job;
                                            let d=this.state.worphone;
                                            // if (a!=='' && b!=='' && c!=='' && d!=='' && e!=='') {

                                                let dd = {
                                                    family: this.state.familyChanged,
                                                    name: this.state.nameChanged,
                                                    phone: this.state.fuckingNumber,
                                                    job: this.state.job,
                                                    workPhone: this.state.worphone,
                                                    address: this.state.addressChanged
                                                };
                                                console.log(dd,'kwkwkwkw');
                                                fetch('http://visitou.ir/api/update_user.php', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify(dd)
                                                }).then((response) => response.json())
                                                    .then((responseJson) => {
                                                    console.log(responseJson,'kwkwkwkw');
                                                        Actions.me();

                                                    }
                                                )

                                            // }
                                            // else {
                                            //    Actions.me();
                                            // }
                                        }}
                                        style={{
                                            width: '95%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 7,
                                            backgroundColor: '#2ECC71',
                                            marginBottom:3
                                        }}>
                                        <Text>ثبت</Text>
                                    </Button>
                                </View>
                            </View>

                        <View style={{justifyContent: 'center', flexDirection: 'row'}}>

                            <Button
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 0,
                                    borderColor: '#1c375c',
                                    borderWidth: 0,
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                                onPress={() => Actions.me()}>
                                <Text style={{color: '#22313F'}}>فعلا نه</Text>
                            </Button>
                        </View>

        </Content>

        )

    }
}
    module.export = EdittingInfo;