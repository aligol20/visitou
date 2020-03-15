/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

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

let PickerItem = Picker.Item;
let choose = 0;
const BannerWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    button:{width:'100%',height:73,alignItems:'center',marginBottom:3,justifyContent:'flex-end'
    ,backgroundColor:'white'},
    text:{textAlign:'right',fontFamily:'B Koodak',color:'#1c375c',padding:3},
    laws:{fontFamily:'B Koodak',textAlign:'right'},
    njn:{fontFamily:'B Koodak',textAlign:'right',width:'80%'}


});

export default class Me extends Component {
    constructor(props, context) {
        super(props, context);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.getInfo();
        this.state = {
            visible:false,
            waiting: false,
            v:false,
            laws:false,
            rrr: '123',
            selectedCat: '',
            dataSource: dss.cloneWithRows([]),
            city: [],
            isLoading:true,
            item: '',
            asb: [],
            myCity:'',
            editDialog:false,
            info:[],
            buttonLabel:'',
            myLocation:'',
            address:'',
            job:'',
            worphone:'',
            nameChanged:'',
            familyChanged:'',
            addressChanged:'',
            favoriteList:dss.cloneWithRows([]),
            messages:dss.cloneWithRows([]),
            visibleM:false,
            fdfdf:'',




        };
        AsyncStorage.getItem('whereAmI',(err,store)=>{
            this.setState({myCity: JSON.parse(store)})
        })
        AsyncStorage.getItem('wherewhere',(err,store)=>{
            this.setState({fdfdf:store})
        })


    }
    signHimOut() {
        AsyncStorage.removeItem('userInfo');
        Actions.feed();
    }
    getMessages(){
        AsyncStorage.getItem('wherewhere',(err,store)=>{
            console.log('wherewhere',store);
            let pp={loc:store+'customers',pro:'qwerty'};



            fetch('http://visitou.ir/api/readMessages.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
                    console.log(responseJson,'kakakakaka');
                    const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                    this.setState({
                        messages: dss.cloneWithRows(responseJson.map(function (tt) {
                            return tt
                        })),
                    });

                }));
        })

    }
    share() {
        Alert.alert(
            '',
            'ویزیتو را به دوستان خود نیز معرفی کنید:',
            [
                {text: 'بستن', onPress: () => console.log('OK lklklkllkll Pressed')},
                {text: 'ارسال اپ اندروید', onPress: () => Share.share({message:'https://cafebazaar.ir/app/ir.manaseh.manzoom/?l=fa',dialogTitle:'https://t.me/koalafruit'})},
                {text: 'ارسال اپ ios', onPress: () => Share.share({message:'https://cafebazaar.ir/app/ir.manaseh.manzoom/?l=fa',dialogTitle:'https://t.me/koalafruit'})},

            ],
            {cancelable: false}
        )
    }
    suggest() {
        Alert.alert(
            '',
            ' در کنارتان هستیم'+'\n'+'پذیرای پیشنهادات سازنده شما می باشیم.'+'\n',
            [

                {text: 'خب', onPress: () => console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => this.goTelegram()},
                {text: 'ارتباط با ما', onPress: () => this.callKoala()}

            ],
            {cancelable: true}
        )
    }
    services() {
        Alert.alert(
            'در خدمتیم!',
            'جهت سفارش های خاص خود و یا ارتباط با ادمین کانال کوالافروت میتوانید با شماره زیر تماس حاصل فرمایید.۰۹۳۸۶۳۶۷۳۶۱',
            [

                {text: 'خب', onPress: () => console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => goTelegram()},
                {text: 'تماس با ما', onPress: () => callKoala()}

            ],
            {cancelable: true}
        )
    }
    groupWork() {
        Alert.alert(
            '',
            ' حمایت از کالای ایرانی'+'\n'+'تامین کنندگان کالا در هر گروه صنفی می توانند جهت معرفی و فروش محصولات خود به خانواده ویزیتو ملحق شوند.'+'\n'+'جهت عضویت به آیدی تلگرامی @visitou مراجعه نمایید.',
            [

                {text: 'خب', onPress: () => console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => this.goTelegram()},
                {text: 'ارتباط با ما', onPress: () => this.callKoala()}

            ],
            {cancelable: true}
        )
    }
    moshtari() {
        Alert.alert(
            '',
            ' در کنارتان هستیم'+'\n'+'پذیرای پیشنهادات سازنده شما می باشیم.'+'\n'+'جهت ارتباط با واحد پشتیبانی به آیدی تلگرامی @visitou مراجعه نمایید.',
            [

                {text: 'خب', onPress: () => console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => this.goTelegram()},
                {text: 'ارتباط با ما', onPress: () => this.callKoala()}

            ],
            {cancelable: true}
        )
    }
    guide() {
        Alert.alert(
            'در خدمتیم!',
            'جهت سفارش های خاص خود و یا ارتباط با ادمین کانال کوالافروت میتوانید با شماره زیر تماس حاصل فرمایید.۰۹۳۸۶۳۶۷۳۶۱',
            [

                {text: 'خب', onPress: () => console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => goTelegram()},
                {text: 'تماس با ما', onPress: () => callKoala()}

            ],
            {cancelable: true}
        )
    }

    goTelegram() {
        console.log('hihibyebye');
        Linking.canOpenURL('https://t.me/joinchat/AAAAAEU_VLjRP6dTO1W0Fg').then(supported => {
            if (supported) {
                Linking.openURL('https://t.me/joinchat/AAAAAEU_VLjRP6dTO1W0Fg');
                console.log("Don't know how to open URI:fffdfdddfdf " + 'https://t.me/joinchat/AAAAAEU_VLjRP6dTO1W0Fg');

            } else {
                console.log("Don't know how to open URI: " + 'https://t.me/joinchat/AAAAAEU_VLjRP6dTO1W0Fg');
            }
        });

    }

    callKoala() {
        Linking.openURL('https://t.me/visitou');
    }
    signOut() {
        Alert.alert(
            'خروج از حساب ...',
            'آیا مطمین هستید؟',
            [
                {text: 'آره', onPress: () => this.signHimOut()},
                {text: 'نه', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

            ],
            {cancelable: false}
        );

    }
    getInfo(){
        this.getMessages();
        AsyncStorage.getItem('AddHistory', (err, store) => {
            let ror = JSON.parse(store);
            console.log(store, 'mamamasmdmdcek2');
            if (store !== null) {
                this.setState({ address: JSON.parse(store),waiting:false})

            }


        });
        AsyncStorage.getItem('userInfo', (err, store) => {
            console.log(JSON.parse(store)[0].phone, 'mahnazparivash899999');
            let pop = JSON.parse(store)[0].phone;
            let aani = [{mobile: pop}];
            console.log(JSON.parse(store),'mamamasmdmdcek');
            this.getFavoriteIds(pop);

            this.setState({info: JSON.parse(store),isLoading:false});





        });

    }
    searchMe(value) {

        this.setState({isLoading:true});
        if (value === '') {
            value = 'nothing';

        }
        let r = this.state.city;
        console.log(r, 'zxsawssdcsdc');

        let ghoo = r.filter(x => x.city_name.includes(value) );

        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
            list: ghoo,
            isLoading: false,
            dataSource: dss.cloneWithRows(ghoo.map(function (itit) {
                return (
                    itit
                )
            })),
        });

        //console.log(ghoo,'mahnazparivash14');


    }
    getProductList() {
        AsyncStorage.getItem('cityList',(err,stores)=>{
            let r = JSON.parse(stores);
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            console.log(r,'aqaqaqaq5');
            this.setState({
                city: r,
                visible:true,
                isLoading: false,
                dataSource: dss.cloneWithRows(r.map(function (itit) {
                    return (
                        itit
                    )
                })),
            });



        });
        console.log(this.state.dataSource,'rtrtrtrt');

    }
    shest(uiui) {
        this.setState({waiting:true,visible:false});
        AsyncStorage.setItem('wherewhere',JSON.stringify(uiui));
        let pp = {city: uiui};
        this.setState({myCity:uiui,fdfdf:uiui});
        setTimeout(() => {
            this.setState({waiting:false})

        }, 10000);
        console.log(pp,'nananana3');
        AsyncStorage.removeItem('allProducts');
        AsyncStorage.removeItem('offerList');
        fetch('http://visitou.ir/api/readProducts_offer_new.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson, 'nananana');
                AsyncStorage.setItem('offerList',JSON.stringify(responseJson));

            }
        );

        fetch('http://visitou.ir/api/readProducts_new.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response) => response.json()).then((responseJson) => {
                AsyncStorage.setItem('allProducts',JSON.stringify(responseJson));
                console.log(responseJson, 'nananana2');
                this.setState({waiting:false});
                Actions.feed()


            }
        );




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
    editting(){

        this.setState({editDialog:true});
    }
    getFavoriteIds(pop){
        const phone={userphone:pop};
        fetch('http://visitou.ir/api/favorite_ids.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(phone)
        }).then((response) => response.json())
            .then((responseJson) => {
        console.log(responseJson,'pqpqpqpqp2')
            this.findFavorites(responseJson) });
        // this.findFavorites(JSON.parse(response._bodyinit))

    }
    findFavorites(ids){
        console.log(ids,'pqpqpqpqp');
        AsyncStorage.getItem('allProducts',(err,stores)=>{
            let r = JSON.parse(stores);
            let finded=[];
            for (let i=0;i<ids.length;i++){
                let yuy = r.filter(x => x.product_id === ids[i].product_id)
                if(yuy.length !== 0 ){
                    finded.push(yuy[0]);
                }
                console.log(yuy[0],'frfegehfghefhd')
                // console.log(JSON.parse(finded),'frfegehfghefhd2')

            }
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            console.log(finded,'frfegehfghefhd5');
            console.log(r,'aqaqaqaq5');

            this.setState({
                list: finded,
                isLoading: false,
                favoriteList: dss.cloneWithRows(finded.map(function (itit) {
                    return (
                        itit
                    )
                })),
            })
        });
    }
    favL(){
        this.setState({v:true});
    }
    removeFromFavorite(id){
        let o=[{pro_id:id,userPhone:this.state.info[0].phone}];
        console.log(o,'kakqkdkwkdwkjw');
        Alert.alert(
            'آیا میخواهید از لیست علاقه مندی ها حذف شود؟',
            ' ',
            [
                {text: 'آره', onPress: () => { this.setState({liked:false})
                    fetch('http://visitou.ir/api/dislike.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(o)
                    }).then((response) => {console.log(response,'koaoaads'),this.getInfo()})}
                },
                {text: 'نه', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

            ],
            {cancelable: false}
        );
    }
    render() {
        function shest(uiui) {

            AsyncStorage.setItem('product',JSON.stringify(uiui));
            console.log(uiui,'qwerty1234');
            return(
                Actions.details({ title: uiui.product_name })

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

            <Container>
                <ScrollView>
                <ProgressDialog
                    visible={this.state.waiting}
                    title="ثبت ..."
                    message="لطفا صبر کنید"
                />
                    <Modal
                        onRequestClose={()=>this.setState({visibleM:false})}
                        visible={this.state.visibleM}>

                        <View style={{backgroundColor:'#ffd500',flexDirection:'row',alignItems:'center',height:47}}>
                            <Text style={{fontFamily: 'BYekan',color:'#1c375c',width:'100%',textAlign:'center'}}>لیست پیام ها</Text>
                        </View>

                        <ListView

                            style={{ backgroundColor: '#00000000'}}
                            dataSource={this.state.messages}
                            renderRow={(rowData, rowID, sectionID) =>
                                <View
                                    style={{width:'100%',alignItems:'center',justifyContent:'flex-end',backgroundColor:'white',flexDirection:'row'}}>
                                    <Text style={{
                                        fontFamily: 'BYekan',width:'80%',marginRight:13,
                                        color:'black',textAlign:'right',marginBottom:7,marginTop:7}}>{rowData.message_text}</Text>
                                    <Text style={{
                                        fontFamily: 'BYekan',width:'20%',marginRight:7,fontSize:13,
                                        color:'grey',textAlign:'right',marginBottom:7,marginTop:7}}>{':'+moment(rowData.message_date,'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</Text>

                                </View>
                            }/>
                        <View style={{justifyContent:'center',flexDirection:'row'}}>

                            <Button
                                style={{backgroundColor:'#1c375c',borderRadius:0,borderColor:'#1c375c',borderWidth:2,width:'100%',justifyContent:'center'}}
                                onPress={()=>this.setState({visibleM:false})}>
                                <Text style={{color:'white'}}>بستن پنجره</Text>
                            </Button>
                        </View>

                    </Modal>
                <Modal
                    onRequestClose={()=>this.setState({visible:false})}
                    visible={this.state.visible}>
                        <Content style={{backgroundColor:'#ECF0F1'}}>
                             <View style={{backgroundColor:'#ECF0F1',flexDirection:'row',alignItems:'center'}}>
                                <Input placeholder="شهرتان را بیابید"
                                       style={{justifyContent:'flex-end',
                                           backgroundColor:'white',
                                            marginTop:30,
                                           textAlign:'right',
                                           marginBottom:10,
                                           marginRight:5,
                                           marginLeft:5,
                                           borderRadius:7,
                                           fontFamily: 'B Koodak',
                                       }}
                                       onChangeText={(value => this.searchMe(value))}/>
                                 <Icon name="ios-search-outline"
                                       size={27}
                                       style={{marginRight: 10,
                                           marginTop:30,
                                       }}/>
                             </View>
                            {this.state.isLoading && (
                                <ActivityIndicator
                                    style={{ height: 80 }}
                                    color="#6C7A89"
                                    size="small"
                                />
                            )}
                            <ListView

                                style={{ backgroundColor: '#00000000'}}
                                dataSource={this.state.dataSource}
                                renderRow={(rowData, rowID, sectionID) =>
                                    <Button
                                        onPress={()=>this.shest(rowData.city_en)}
                                        style={{width:'100%',marginBottom:3,alignItems:'center',justifyContent:'flex-end',backgroundColor:'white'}}>
                                        <Text style={{
                                            fontFamily: 'B Koodak',
                                            color:'black',textAlign:'center'}}>{rowData.city_name}</Text>

                                    </Button>
                                }/>
                        </Content>
                    <View style={{justifyContent:'center',flexDirection:'row'}}>

                        <Button
                            style={{backgroundColor:'#1c375c',borderRadius:0,borderColor:'#1c375c',borderWidth:2,width:'100%',justifyContent:'center'}}
                            onPress={()=>this.setState({visible:false})}>
                            <Text style={{color:'white'}}>فعلا نه</Text>
                        </Button>
                    </View>

                </Modal>
                <Modal
                    onRequestClose={()=>this.setState({v:false})}
                    visible={this.state.v}>
                    <Content style={{backgroundColor:'white',marginTop:30}}>
                            <ListView
                                enableEmptySections={true}
                                style={{width: '100%', backgroundColor: '#00000000'}}
                                dataSource={this.state.favoriteList}
                                renderRow={(rowData, rowID, sectionID) =>
                                    <View style={rowData.length === 0 ? {
                                        backgroundColor: '#00000000',
                                        width: 0,height:0
                                    }:{
                                        backgroundColor: '#00000000',
                                        width: '100%'
                                    }}>


                                        <Button style={{
                                            backgroundColor: 'white', height: 80,
                                            marginBottom: 2,
                                            marginRight: 5,
                                            marginLeft: 5
                                        }}
                                                onPress={() => {
                                                    shest(rowData) , this.setState({v: false});
                                                }}>


                                            <View style={{flex: 1, flexDirection: 'row', marginLeft: 20}}>
                                                <TouchableHighlight
                                                    underlayColor={'white'}
                                                    onPress={() => this.removeFromFavorite(rowData.product_id)}
                                                    style={{backgroundColor: 'white'}}>
                                                    <Icon3
                                                        size={31}
                                                        name={'trash'}
                                                        color={'red'}/>
                                                </TouchableHighlight>
                                                <Right>
                                                    <Text style={{fontFamily: 'B Koodak'}}>
                                                        {rowData.product_name}

                                                    </Text>
                                                </Right>

                                            </View>
                                            <View style={{overflow: 'hidden', margin: 10, borderRadius: 7}}>

                                                <Image
                                                    source={{uri: rowData.small_image_link, cache: 'force-cache',}}
                                                    indicator={Progress}


                                                    style={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 7,
                                                        backgroundColor: '#00000000'
                                                    }}/>
                                            </View>
                                        </Button>


                                    </View>
}/>
                               {/*/>*/}

                    </Content>
                    <Button style={{backgroundColor:'white',width:'100%',alignItems:'center',justifyContent:'center'}}
                    onPress={()=>this.setState({v:false})}>
                        <Text style={{color:'#22313F',fontFamily:'B Koodak'}}>بستن پنجره</Text>
                    </Button>
                </Modal>

            <View style={{flex:1,flexDirection:'column'}}>
                <Button style={styles.button}
                onPress={()=>Actions.orderHistory()}>
                    <Text style={styles.text}>سوابق خرید</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='history'
                           color="#fdb913" size={29}
                    />
                </Button>
                <Button style={styles.button}
                onPress={()=>this.getProductList()}>
                    <Text style={styles.text}>{this.state.fdfdf}</Text>

                    <Text style={styles.text}>تغییر شهر</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='edit-location'
                           color="green" size={31}
                    /></Button>
                <Button
                    onPress={()=>Actions.infoEdit()}
                    style={styles.button}>
                    <Text style={styles.text}>اصلاح اطلاعات</Text>
                    <Icon7 style={{marginRight: 5}}
                           name='account-edit'
                           color="#1c375c" size={29}
                    />
                </Button>
                <Button
                    onPress={()=>this.favL()}
                    style={styles.button}>
                    <Text style={styles.text}>علاقه مندی ها</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='favorite-border'
                           color="red" size={29}
                    />
                </Button>
                <Button style={styles.button}
                        onPress={()=>this.share()}>
                    < Text style={styles.text}>معرفی به دوستان</Text>
                    <Icon5 style={{marginRight: 5}}
                           name='share-2'
                           color="#19B5FE" size={29}
                    />
                </Button>
                <Button style={styles.button}
                        onPress={()=>this.moshtari()}>
                    < Text style={styles.text}> خدمات مشتریان</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='contact-mail'
                           color="purple" size={29}
                    />
                </Button>
                <Button style={styles.button}
                onPress={()=>this.setState({visibleM:true})}>
                    <Text style={styles.text}>پیام ها</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='mail'
                           color="#1c375c" size={29}
                    />
                </Button>
                <Button style={styles.button}
                        onPress={()=>this.groupWork()}>
                    <Text style={styles.text}>همکاری با ما</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='group-add'
                           color="#F89406" size={29}
                    />
                </Button>

                <Button style={styles.button}
                        onPress={()=>this.suggest()}>
                    <Text style={styles.text}>نظرات و پیشنهادات</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='chat'
                           color="#1c375c" size={29}
                    />
                </Button>
                <Button style={styles.button}
                        onPress={()=>this.setState({laws:true})}>
                    < Text style={styles.text}>راهنما</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='receipt'
                           color="green" size={29}
                    />
                </Button>
                <Button style={styles.button}
                onPress={()=>this.signOut()}>
                    <Text style={styles.text}>خروج از حساب کاربری</Text>
                    <Icon8 style={{marginRight: 5}}
                           name='md-exit'
                           color="red" size={29}
                    />
                </Button>
            </View>
                </ScrollView>
                <Modal
                    onRequestClose={()=>this.setState({laws:false})}

                    visible={this.state.laws}>
                    <ScrollView>

                        <View style={{flexDirection:'column',margin:7,borderRadius:5,borderWidth:2,borderColor:'#1c375c',padding:3}}>

                            <Text style={styles.laws}>
                                ثبت نام: جهت ثبت نام و ورود به حساب کاربری ابتدا باید به اینترنت متصل بوده، به گزینه حساب کاربری مراجعه نموده،در صورتی که قبلا ثبت نام نموده باشید با وارد نمودن شماره همراه و وارد نمودن کد تایید وارد حساب کاربری می شوید، در صورتی که قبلا ثبت نام نکرده اید از گزینه پایین صفحه و وارد نمودن اطلاعات رسمی و مورد تایید اقدام به ثبت نام نمایید.                            </Text>
                            <Text style={styles.laws}>
                                جهت تغییر و بروزرسانی اطلاعات ثبت نامی خود از گزینه حساب کاربری استفاده نمایید.
                            </Text>

                            <Text style={styles.laws}>

                                سفارش محصولات: جهت سفارش محصولات از گزینه دسته بندی نسبت به بررسی و انتخاب محصولات و اضافه نمودن به سبد خرید اقدام کنید، در صورت تمایل می توانید از قسمت جستجو محصول مورد نظر خود را سریعتر جستجو کنید. محصولات مورد علاقه را میتوان نشانه گذاری کرد و برای دسترسی به آنها از گزینه حساب کاربری اقدام نمایند.                            </Text>

                            <Text style={styles.laws}>
                                محصولات انتخاب شده در سبد خرید قرار گرفته اند، از این قسمت می توان سفارش داده شده و یا مقدار آن را ویرایش نمود، مرحله بعد آدرس محل تحویل را بصورت دقیق وارد نموده و در آخر اقدام به کنترل نهایی سفارش نموده و تایید می کند. در این مرحله سفارشات جهت بررسی به تامین کنندگان مربوطه ارسال می شود.                            </Text>

                            <Text style={styles.laws}>
                                سفارشات شما پس از تایید به قسمت سوابق خرید منتقل شده.
                            </Text>
                                                        <View style={{flexDirection:'row',marginRight:2,alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={styles.njn}>: محصولاتی که منتظر تایید باشند با این علامت مشخص می شود.</Text>
                                <Icon7 style={{marginLeft: 2}}
                                       name='clock'
                                       color="blue" size={29}
                                />

                            </View>
                            <View style={{flexDirection:'row',marginRight:2,alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={styles.njn}>: محصولاتی که تایید شده باشند با این علامت مشخص می شود.</Text>
                                <Icon7 style={{marginLeft: 2}}
                                       name='truck'
                                       color="#22A7F0" size={29}
                                />

                            </View>
                            <View style={{flexDirection:'row',marginRight:2,alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={styles.njn}>: محصولاتی که تایید نشده باشند با این علامت مشخص می شود.</Text>
                                <Icon7 style={{marginLeft: 2}}
                                       name='close'
                                       color="red" size={29}
                                />

                            </View>
                            <View style={{flexDirection:'row',marginRight:2,alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={styles.njn}>: محصولاتی که تحویل شده باشند با این علامت مشخص می شود.</Text>
                                <Icon7 style={{marginLeft: 2}}
                                       name='check'
                                       color="green" size={29}
                                />

                            </View>

                            <Text style={styles.laws}>
                                تامین، حمل، تحویل، تسویه فاکتور به عهده شرکتهای تامین کننده می باشد.
                            </Text>
                            <Text style={styles.laws}>
                                توجه داشته باشید پیش از تحویل سفارش از پرداخت هرگونه وجه خودداری نمایید.
                            </Text>

                            <Text style={styles.laws}>
                                کاربر گرامی خواهشمند است موارد زیر را جهت استفاده بهینه از خدمات و برنامه های کاربردی ویزیتو مطالعه فرمایید:
                            </Text>
                            <Text style={styles.laws}>
                                *کاربران می پذیرند که ویزیتو شرکت پخش محصولات نیست بلکه تنها خدمات نرم افزاری است که ارتباط بین کاربر سفارش دهنده(مشتری) و شرکت پخش(تامین کننده) را به منظور تسهیل در روند سفارش محصولات فراهم می نماید.                            </Text>
                            <Text style={styles.laws}>
                                *ویزیتو 7 روز هفته به صورت شبانه روز امکان خدمات رسانی به مشتریان را دارد و کلیه سفارش های ثبت شده در صف پردازش قرار می گیرد و پس از تایید با توجه به برنامه پخش شرکت ها در روزهای کاری تحویل می گردد.
                            </Text>
                            <Text style={styles.laws}>
                                *مسئولیت مربوط به کیفیت، قیمت محصولات، بسته بندی، شرایط،حمل، تحویل کالا و تسویه فاکتور به عهده تامین کننده می باشد و مسئولیتی متوجه ویزیتو نخواهد بود.                            </Text>
                            <Text style={styles.laws}>
                                *به منظور سفارش کالا،بازدید سوابق خرید و ویرایش اطلاعات کاربری خود ابتدا باید به اینترنت متصل بوده و پس از ثبت نام وارد حساب کاربری تان شوید.                            </Text>
                            <Text style={styles.laws}>
                                *کاربران با ثبت نام در سامانه و هربار استفاده از خدمات ویزیتو می پذیرند که قوانین و مقررات جاری شرکت را بصورت کامل مطالعه نموده و با اطلاع کامل از مفاد مندرج، آن را می پذیرند. این مقررات ممکن است در طول زمان تغییر یابد، مطالعه قوانین و اطلاع از بروزرسانی آن بعهده کاربران می باشد.                            </Text>
                            <Text style={styles.laws}>
                                *کاربر می پذیرد اطلاعات خواسته شده را بصورت صحیح و بروز در سامانه وارد نماید و مسئولیت عدم صحت اطلاعات اعلام شده به عهده کاربر می باشد.                            </Text>
                            <Text style={styles.laws}>
                                *کاربر موظف است در ثبت و ارسال سفارش و ثبت آدرس دقیق خود دقت لازم را بعمل آورد.
                            </Text>
                            <Text style={styles.laws}>
                                *لازم بذکر می باشد افزودن کالا به سبد خرید به معنی رزرو کالا نیست و هیچگونه حقی را برای مشتریان ایجاد نمی کند. همچنین تا قبل از ثبت نهایی هرگونه تغییر از جمله موجودی کالا یا قیمت کالا در سبد خرید اعمال می گردد.                             </Text>
                            <Text style={styles.laws}>
                                *پس از ثبت سفارش نهایت دقت برای تایید فاکتور انجام می گردد، با این حال در موارد خاص امکان لغو سفارش مشتری برای ویزیتو محفوظ می باشد.                            </Text>
                            <Text style={styles.laws}>
                                *در صورت بروز هرگونه خطا نسبت به درج قیمت و ارزش ریالی محصولات موجود،حق لغو نمودن سفارش مشتری برای ویزیتو محفوظ می باشد.                            </Text>
                            <Text style={styles.laws}>
                                *صرف نظر از عدم امکان استفاده از کد کاربری برای اشخاص ثالث در صورت سفارش و استفاده از خدمات ویزیتو، مسئولیت سفارش ثبت شده و پرداخت هزینه بعهده کاربر اصلی می باشد.                             </Text>
                            <Text style={styles.laws}>
                                *قیمتهای ارائه شده در ویزیتو قیمت های عمده فروشی بوده و دقیقا مطابق با قیمتهای اعلام شده تامین کنندگان می باشد و ویزیتو هیچگونه دخل و تصرفی در قیمتها ندارد، چنانچه تخفیف و یا تغییر قیمتی از طرف تامین کننده بر روی قیمتها اعمال شود اولین فرصت در سامانه بروزرسانی می گردد.  هرگونه مغایرت در این خصوص از جانب ویزیتو قابل پیگیری خواهد بود.                            </Text>
                            <Text style={styles.laws}>
                                *عکس محصولات جهت اطلاع و کمک به خرید مشتری می باشد و ممکن است در پاره ای از جزییات با محصولات اصلی تفاوت هایی وجود داشته باشد.
                            </Text>
                            <Text style={styles.laws}>
                                *کاربران می پذیرند که شرکت ممکن است از طریق تماس، ارسال پیامک، ایمیل، اعلان به عنوان راه ارتباطی با وی استفاده نماید و تنها راه ارتباط با مشتریان اطلاعات ثبت شده رسمی و مورد تایید مشتری، هنگام ثبت می باشد.
                            </Text>
                            <Text style={styles.laws}>
                                *ویزیتو محدود به منطقه جغرافیایی خاصی نمی باشد و در هر منطقه که تامین کننده ای درخواست همکاری داشته باشد برای مشتریان آن منطقه قابل بهره برداری می باشد.                            </Text>
                            <Text style={styles.laws}>
                                ویزیتو در تمام نقاط کشور آماده عقد قرار داد با شرکت های تامین کننده و ارائه خدمات به مشتریان می باشد.                            </Text>
                            <Text style={styles.laws}>
                                جهت حمایت از ما نظرات، پیشنهادات و انتقادات خود را برای ما ارسال نمایید.
                                امید داریم تسهیل در فرآیند خرید باعث معرفی ویزیتو به دوستان تان و پویایی هرچه بیشتر این مجموعه باشد.                            </Text>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableWithoutFeedback
                                    onPress={()=>this.setState({laws:false})}>
                                    <View style={{width:40,height:40,backgroundColor:'#1c375c',borderRadius:3,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{padding:7,color:'white',fontFamily:'B Koodak'}}>خب</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </ScrollView>

                </Modal>
            </Container>
        )

    }
}
    module.export = Me;
