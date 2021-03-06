import React, {Component} from 'react';
import {Text, AsyncStorage, Dimensions,Image,ScrollView} from 'react-native';
import {Content, View, Form,Button, Root, Item, Input, Label, Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {ProgressDialog} from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            family: '',
            phone: '0',
            workPhone:'0',
            job:'',
            dialogVisible: false,
        }
    }

    componentDidMount() {

        Toast.toastInstance = null;

    }

    registerUser() {

        let phone1 = this.state.phone;
        let name = this.state.name;
        let family = this.state.family;
        let job = this.state.job;
        let workPhone = this.state.workPhone;
        if (phone1.startsWith('09') && phone1.length === 11 && name !== '' && family !== '' && job!=='' && workPhone!=='') {
            this.setState({dialogVisible: true});
            setTimeout(() => {
                this.setState({dialogVisible: false})
            }, 20000);
            let info = {name: name, family: family, phoneNumber: phone1,job:job,workPhone:workPhone};
            console.log(info,'lasdjskld');
            fetch('http://visitou.ir/api/register.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            }).then((response) => this.finalTask(response._bodyInit));
        } else {
            if (name === '') {
                Toast.show('نام وارد شده را بررسی کنید');

                console.log('name is empty', 'mahnazparivash11')
            }
            if (family === '') {
                console.log('family is empty', 'mahnazparivash11');
                Toast.show('نام خانوادگی وارد شده را بررسی کنید');

            }
            if (phone1.length !== 11 || !phone1.startsWith('09') || phone1 === '') {
                console.log('phone is wrong', 'mahnazparivash11')
                Toast.show('شماره وارد شده را بررسی کنید');


            }
            if (job === '') {
                console.log('family is empty', 'mahnazparivash11');
                Toast.show('شغل وارد شده را بررسی کنید');

            }
            if (workPhone === '') {
                console.log('family is empty', 'mahnazparivash11');
                Toast.show('شماره تلفن  وارد شده را بررسی کنید');

            }
        }

    }

    finalTask(value) {
        let rr = JSON.parse(value).id;
        console.log(rr,'mahindokht');
        if (rr === '0') {
            console.log('you registered before', 'mahnazparivash13');
            this.setState({dialogVisible: false});

            setTimeout(() => {
                Actions.account();
                alert('شما قبلا ثبت نام کرده اید');

            }, 500);


        } else {
            AsyncStorage.setItem('prePhoneNumber', JSON.stringify(this.state.phone));
            try {
                fetch("https://api.kavenegar.com/v1/" +
                    "5265756B48596B586354485A45644261474250384C63494F33446E6832413169/" +
                    "verify/lookup.json?" +
                    "receptor=" + this.state.phone + "&" +
                    "token=" + rr + "&" +
                    "template=visitouVerify").then((response) => this.checkSuccess(JSON.parse(response._bodyInit).return.status));
            }
            catch (error) {
                Toast.show({
                    text: 'Wrong password!',
                    position: 'bottom',
                    buttonText: 'Okay'
                })
            }
        }
    }

    checkSuccess(value) {
        this.setState({dialogVisible: false});
        if (value === 200) {
            Actions.loginMain();
        } else {
            console.log('some thing Wrong', 'mahnazparivash14');
        }
    }

    render() {
        let width = Dimensions.get('window').width; //full width

        return (
            <Root>
                <ScrollView>
                <Content style={{backgroundColor: '#ffd500'}}>


                    <ProgressDialog
                        visible={this.state.dialogVisible}
                        title="دریافت کد تایید"
                        message="لطفا صبر کنید..."
                    />
                    <View style={{alignItems:'center'}}>
                        <Image
                            style={{marginTop:width/10,width: (width / 3), height: (width / 3)}}

                            source={require('../imageSource/visitou.png')}
                        />
                    </View>
                    <View style={{
                        flex: 1, flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center', margin: 20
                    }}>

                        <View style={{width: width / 2, margin: 10}}>
                            <Item style={{backgroundColor: 'white', borderRadius: 7}}>
                                <Input placeholder='نام'
                                       textAlign={'center'}
                                       style={{
                                           backgroundColor: '#ffd500', borderWidth: 2,
                                           borderRadius: 7, borderColor: 'white'
                                           ,color:'#1c4473'
                                       }}
                                       onChangeText={(value => this.setState({name: value}))}/>
                            </Item>
                        </View>
                        <View style={{width: width / 2, margin: 10}}>
                            <Item style={{backgroundColor: 'white', borderRadius: 7}}>
                                <Input
                                    textAlign={'center'}
                                    style={{
                                        backgroundColor: '#ffd500', borderWidth: 2,
                                        borderRadius: 7, borderColor: 'white'
                                        ,color:'#1c4473'
                                    }}
                                    placeholder='نام خانوادگی'
                                    onChangeText={(value => this.setState({family: value}))}/>
                            </Item>
                        </View>
                        <View style={{width: width / 2, margin: 10}}>
                            <Item style={{backgroundColor: 'white', borderRadius: 7}}>
                                <Input placeholder='شماره تلفن همراه'
                                       maxLength={11}
                                       style={{
                                           backgroundColor: '#ffd500', borderWidth: 2,
                                           borderRadius: 7, borderColor: 'white'
                                           ,color:'#1c4473'
                                       }}
                                       keyboardType={'phone-pad'}
                                       textAlign={'center'}
                                       onChangeText={(value => this.setState({phone: value}))}/>
                            </Item>
                        </View>
                        <View style={{width: width / 2, margin: 10}}>
                            <Item style={{backgroundColor: 'white', borderRadius: 7}}>
                                <Input placeholder='شماره تلفن '
                                       textAlign={'center'}
                                       style={{
                                           backgroundColor: '#ffd500', borderWidth: 2,
                                           borderRadius: 7, borderColor: 'white'
                                           ,color:'#1c4473'
                                       }}
                                       onChangeText={(value => this.setState({workPhone: value}))}/>
                            </Item>
                        </View>
                        <View style={{width: width / 2, margin: 10}}>
                            <Item style={{backgroundColor: 'white', borderRadius: 7}}>
                                <Input placeholder='شغل  '
                                       textAlign={'center'}
                                       style={{
                                           backgroundColor: '#ffd500', borderWidth: 2,
                                           borderRadius: 7, borderColor: 'white'
                                           ,color:'#1c4473'
                                       }}
                                       onChangeText={(value => this.setState({job: value}))}/>
                            </Item>
                        </View>
                        <View>
                            <Button
                                style={{
                                    backgroundColor: '#ffd500',
                                    margin: 30,
                                    alignItems: 'center',
                                    borderColor: 'white', borderWidth: 2,borderRadius:7
                                }} onPress={() => this.registerUser()}>
                                <Text style={{
                                    color: 'white', margin: 37,fontSize:23, textAlign: 'center',fontFamily:'B Koodak'
                                    , alignItems: 'center'
                                }}>ثبت نام</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
                </ScrollView>
            </Root>
        );
    }
}

module.export = Register;