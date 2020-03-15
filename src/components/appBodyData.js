import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
    Modal,
    Linking, AsyncStorage, ActivityIndicator, ScrollView,StyleSheet, NativeModules,
    StatusBar,TouchableHighlight, Image, Alert, renderRow, ListView, Platform, Dimensions
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Communications from 'react-native-communications';
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons'
import Image2 from 'react-native-image-progress';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'
import Carousel from 'react-native-banner-carousel';
const BannerWidth = Dimensions.get('window').width;
import Banner, {IndicaterAlign, IndicaterType} from 'react-native-whc-banner'


const images = [
    "http://visitou.ir/images/banner.png",
    "http://visitou.ir/images/banner2.png",
    "http://visitou.ir/images/banner3.png"
];
export default class AppBodyData extends React.Component {


    constructor(props) {

        super(props);

        this.getData();


        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            imageLoading: true,
            isLoading: true,

            asb: [],
            rrr: '123',
            dataSource: dss.cloneWithRows([]),
            forRank: dss.cloneWithRows([]),
            list: [],
            first: 1,
            reload: true,
            dialog: [],
            loaded: false,
            isUpdateReady: false,
            upDateLink: '',
            modalSeen: false,
            citys: [],
            citySource: dss.cloneWithRows([]),
            rankInfo: [],
            getRank: false,
            rankSetted:[],
            rarra:3,
        };
        AsyncStorage.getItem('whereAmI', (err, store) => {
            console.log(store, 'hthththt');
            if (store === null) {
                this.setState({modalSeen: true})
            } else {
                this.setState({modalSeen: false})
            }


        });

    }
    renderPage(image, index) {
        console.log(images,'lalalala');
        return (
            <View key={index}>
                <Image

                    style={{ width: BannerWidth, height: 2*BannerWidth/3 }} source={{ uri: image ,   cache: 'force-cache',}} />
            </View>
        );
    }
    getData() {


        try {
            AsyncStorage.getItem('offerList', (err, stores) => {
                if(stores !==null) {
                    const listArray = JSON.parse(stores);
                    // console.log(store, 'ghghghghgh');
                    // console.log(err,'ghghghghgh');

                    const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    console.log(listArray, 'mahnaz777');

                    this.setState({
                        list: listArray,
                        isLoading: false,
                        dataSource: dss.cloneWithRows(listArray.map(function (tt) {
                            return tt
                        })),
                    });
                }
            });

        } catch (err) {
            console.log(err, 'hyhyhyhyhy')
        }
        //get offer list from koala server


        // console.log(this.state.dataSource,'rtrtrtrt');


        // console.log(this.state.names[i]);
        this.getRate();

    }

    getRate() {
        AsyncStorage.getItem('userInfo', (err, store) => {
            if(store!==null) {
                console.log(JSON.parse(store)[0].phone, 'mahnazparivash899999');
                let pop = JSON.parse(store)[0].phone;
                const phone = {phone: pop};

                fetch('http://visitou.ir/api/get_ready_for_rate.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(phone)
                }).then((response) => response.json())
            .then((responseJson) => {
                    console.log(responseJson, 'djfhdfdfdhk');
                    const l = responseJson.length;
                    const info = responseJson;
                    let ko = [];
                    for (let i = 0; i < info.length; i++) {
                        if (!ko.map(function (t) {
                                return t.provider_details
                            }).includes(info[i].provider_details)) {
                            ko.push(info[i])
                        }
                    }
                    console.log(ko, 'alalalalal');
                    if (l > 0) {
                        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                        this.setState({
                            getRank: true, rankInfo: ko,
                            forRank: dss.cloneWithRows(ko.map(function (tt) {
                                return tt
                            }))
                        })
                    }
                });

            }
        });
    }

    buttonPress() {
        navigation.navigate('Details');

        console.log('hamashoon dozdan');
    }

    koon(ggoh) {
        return (
            ggoh.map(function (item) {
                let offers = item.offerprice;
                let prices = item.unitprice;
                let names = item.product_name;

                return {
                    offer: offers,
                    price: prices,
                    name: names
                };
            }))

    }

    gogo() {
        //AsyncStorage.setItem('product',fox);
        // return(
        //     Actions.details
        // )
        console.log('salaaaaaam');

    }

    test(moz, navi) {
        return (

            <View style={{backgroundColor: 'green'}}>

                {moz.map(function (item) {
                    function Test(uiui) {
                        AsyncStorage.setItem('product', JSON.stringify(uiui));
                        console.log(uiui, 'qwerty');
                        return (
                            Actions.details
                        )

                    }

                    // console.log(item,'jgjgjgjggj');
                    return (

                        <Button style={{width: 400, backgroundColor: 'yellow'}}
                                onPress={Test(1)}>


                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{backgroundColor: 'red', flexDirection: 'column'}}>
                                    <Text>
                                        {item.offerprice}
                                    </Text>
                                    <Text>
                                        {item.unitprice}
                                    </Text>

                                </View>
                                <Text>
                                    {item.product_name}

                                </Text>
                            </View>
                        </Button>

                    )


                })}


            </View>

        )
    }

    introduce() {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }

    shoombol() {
        return (
            <Image source={require('../imageSource/koalaborder.png')}
            />

        )
    }

    upGradeButton() {
        if (this.state.isUpdateReady) {


            return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>

                    <Icon6 style={{marginTop: 5}}
                           name='update'
                           color="#ffffff" size={27}
                           onPress={() => introduce()}/>
                </View>
            )
        }
        return (
            <View>

            </View>
        )
    }

    updateMe() {
        Alert.alert(
            'کوالای جدید آماده است',
            'آن را نصب کنید  و از کوالای بهتر لذت ببرید',
            [

                {text: 'بعدا', onPress: () => console.log('OK lklklkllkll Pressed')},
                {text: 'باشه', onPress: () => this.upgrade()},

            ],
            {cancelable: true}
        )
    }

    upgrade() {
        // let filePath = RNFS.ExternalDirectoryPath + '/visitou.apk';

        // NativeModules.InstallApk.install(filePath);

        Linking.canOpenURL(this.state.upDateLink).then(supported => {
            if (supported) {
                Linking.openURL(this.state.upDateLink);
                console.log("know how to open URI:fffdfdddfdf " + this.state.upDateLink);

            } else {
                console.log("Don't know how to open URI: " + this.state.upDateLink);
            }
        });

    }
    selectingRate(eee){
        console.log(eee,'fdfdfdfdf');
        this.setState({rarra: eee})
    }
    readyForRank(rowData,rowID,sectionID){
        let height = Dimensions.get('window').height; //full width
        const pp=parseInt(sectionID);
        const r=this.state.rankInfo;
        console.log(r,'aqazxsss');
        for(let i=0;i<r.length;i++){

        }
        // if(r[pp+1].provider_details===r[pp].provider_details){
        // return(
        //     <View style={{backgroundColor:'red'}}>
        //
        //     </View>
        // )
        // }
        return(
           <View style={{marginTop:40,backgroundColor:'white',justifyContent:'center'}}>
               <View style={{
                   backgroundColor: '#00000000',
                   flexDirection: 'row',
                   backgroundColor: 'white',
                   borderRadius:7,
                   borderWidth:2,
                   height:0.1*height,
                   borderColor:'#22313F',
                   margin:7,
                   alignItems:'center',
                   justifyContent:'center',
               }}>
                   <View style={{width:'40%'}}>
                       <StarRatingBar
                           starStyle={{
                               width: 20,
                               height: 20,
                           }}
                           readOnly={false}
                           continuous={true}
                           score={3.7}
                           allowsHalfStars={true}
                           accurateHalfStars={true}
                           onStarValueChanged={(score) => {
                               console.log('new score:' + score);
                           }}
                       />
                   </View>
                   <Text style={{
                       alignItems: 'center',textAlign:'right'
                       , fontFamily: 'B Koodak',fontSize:23,width:'40%',backgroundColor:'white'
                   }}>
                       {rowData.provider_details}

                   </Text>
               </View>
           </View>
       )
    }
    caneclVote(){
        let  pip = this.state.rankInfo;
        for (let i=0;i<pip.length;i++){
            if(pip[i].vote_rate==='0'){
                pip[i].vote_rate=0.1
            }
        }
        console.log(pip,'aqwqwqwqw');
        fetch('http://visitou.ir/api/set_rank.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pip)
        }).then((response) => {console.log(response,'koaoaads'),this.setState({getRank:false})})

    }
    setIt(){
        let  pip = this.state.rankInfo;
        for (let i=0;i<pip.length;i++){
            if(pip[i].vote_rate==='0'){
                pip[i].vote_rate=0.1
            }
        }
        console.log(pip,'aqwqwqwqw');
        fetch('http://visitou.ir/api/set_rank.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pip)
        }).then((response) => {console.log(response,'koaoaads'),this.setState({getRank:false})})

    }
    setRank(score,id,provider_details,orderer_phone){
        let opop=this.state.rankInfo;
        console.log(id,'ssssssssss')
        opop[parseInt(id)].vote_rate=score;
        this.setState({rankInfo:opop});
        const op={phone:orderer_phone,provider:provider_details,score:score};



        console.log(this.state.rankInfo,'vasasas');
    }
    goh(){
        let aaaan=  {
            "to" : "/topics/ahmad",
            "priority" : "high",
            "notification" : {
                "body" : "دااااااااااابه هولم دااااااااد",
                "title" : "سلام!",
            }
        };
        console.log(JSON.stringify(aaaan),'mamamamamam');
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': 'key=AIzaSyDa_jg-APcHVFYlnPpPR-sR1ESsrEq_Hy4',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aaaan)

        }).then((response) =>
            console.log(response,'mamamamamam2')

       );
    }
    render() {


        function shest(uiui) {
            AsyncStorage.setItem('product', JSON.stringify(uiui));
            return (
                Actions.details()

            )


        }

        function goTelegram() {
            console.log('hihibyebye');
            Linking.canOpenURL('https://t.me/koalafruit').then(supported => {
                if (supported) {
                    Linking.openURL('https://t.me/koalafruit');
                    console.log("Don't know how to open URI:fffdfdddfdf " + 'https://t.me/koalafruit');

                } else {
                    console.log("Don't know how to open URI: " + 'https://t.me/koalafruit');
                }
            });

        }

        function callKoala() {
            Communications.phonecall('09387756324', true)
        }

        function introduce() {
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


        if (this.state.isLoading) {

            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width; //full width
        let height = Dimensions.get('window').height; //full width
        console.log(width, 'frfrfrfrfrfr');

        return (
            <Container>

                <Modal
                    onRequestClose={()=>console.log('hello')}
                    visible={this.state.getRank}
                >
                    <View style={{backgroundColor:'#22313F',height:70,alignItems:'center',justifyContent:'flex-end'}}>
                        <Text style={{color:'white',fontFamily: 'B Koodak',fontSize:23,marginBottom:5}}>ثبت نظر</Text>
                    </View>
                    <Text style={{fontFamily: 'B Koodak',fontSize:17,textAlign:'right',
                        lineHeight:20,marginTop:5,marginRight:10,marginLeft:10}}>به این تامین کننده چه امتیازی می دهید؟</Text>
                    <ListView
                        enableEmptySections={true}
                        style={{width: width, backgroundColor: '#00000000'}}
                        dataSource={this.state.forRank}
                        renderRow={(rowData, rowID, sectionID) =>
                            <View style={{marginTop:10,backgroundColor:'white',justifyContent:'center'}}>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:2,width:'90%',backgroundColor:'#BDC3C7',borderRadius:2}}/>
                                </View>
                                <View style={{
                                    backgroundColor: '#00000000',
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    borderRadius:7,
                                    height:0.1*height,
                                    borderColor:'#22313F',
                                    margin:1,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}>
                                    <View style={{width:'40%'}}>
                                        <StarRatingBar
                                            starStyle={{
                                                width: 20,
                                                height: 20,
                                            }}
                                            readOnly={false}
                                            continuous={true}
                                            score={0.1}
                                            allowsHalfStars={true}
                                            accurateHalfStars={true}
                                            onStarValueChanged={(score) => {
                                                this.setRank(score,sectionID,rowData.provider_details,rowData.orderer_phone)
                                            }}
                                        />
                                    </View>
                                    <Text style={{
                                        alignItems: 'center',textAlign:'right'
                                        , fontFamily: 'B Koodak',fontSize:23,width:'40%',backgroundColor:'white'
                                    }}>
                                        {rowData.provider_details}

                                    </Text>
                                </View>

                            </View>
                        }/>

                    <View style={{height:50,backgroundColor:'white',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                        <TouchableHighlight onPress={()=>this.caneclVote()}
                            style={{marginRight:5,borderRadius:7,borderWidth:1,backgroundColor:'white',borderColor:'#22313F'}}>
                            <Text style={{fontFamily: 'B Koodak',color:'#22313F'}}>نظر نمی دهم</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>this.setIt()}
                            style={{marginLeft:5,width:'30%',backgroundColor:'#3FC380',borderRadius:7,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontFamily: 'B Koodak'}}>ثبت رای</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems:'center',
                        width:'100%',
                        height:50,
                        backgroundColor:'#1c375c'
                    }}>
                        <View style={{justifyContent: 'flex-start', alignItems: 'center',width:'30%',flexDirection:'row'}}/>

                        <View style={{alignItems: 'center', justifyContent: 'center',width:'40%'}}>
                            <Text style={{width:'100%',textAlign:'center',
                                fontSize: 23, color: '#ffd500', fontFamily: 'DastNevis',
                            }}>ویزیتو</Text>

                        </View>
                        <View style={{width:'30%'}}/>

                        <View/>
                    </View>
                <Content style={{backgroundColor: '#00000000'}}>

                    <ScrollView style={{backgroundColor: '#00000000'}}>

                        <View style={{backgroundColor: 'white', marginTop: 0}}>
                            <View style={styles.container}>
                                <Banner
                                style={{ width: BannerWidth, height: 2*BannerWidth/3 }}>




                                        <Image style={{ width: BannerWidth, height: 2*BannerWidth/3 }} source={{ uri: 'http://visitou.ir/images/banner.png' }} />
                                        <Image style={{ width: BannerWidth, height: 2*BannerWidth/3 }} source={{ uri: 'http://visitou.ir/images/banner2.png' }} />
                                        <Image style={{ width: BannerWidth, height: 2*BannerWidth/3 }} source={{ uri: 'http://visitou.ir/images/banner3.png' }} />



                            </Banner>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 7,
                            margin: 5,
                            marginBottom: 2,
                            marginTop: 3,
                            borderRadius: 7,
                            backgroundColor: 'white',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={{
                                paddingTop: 5,
                                paddingBottom: 5,
                                fontFamily: 'DastNevis',
                                color: '#F22613',
                                fontSize: 27
                            }}> ویژه...</Text>
                            <Text style={{
                                paddingTop: 5,
                                paddingBottom: 5,
                                fontFamily: 'DastNevis',
                                color: '#22313F',
                                fontSize: 27
                            }}> پیشنهاد </Text>
                        </View>

                        <ListView
                            enableEmptySections={true}
                            style={{width: width, backgroundColor: '#00000000'}}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData, rowID, sectionID) =>

                                <View style={{
                                    backgroundColor: '#00000000',
                                    width: width
                                }}>
                                    <View style={{
                                        marginBottom: 2,
                                        marginRight: 5,
                                        marginLeft: 5,
                                        marginTop: 1,
                                        borderRadius: 7,
                                    }}>
                                        <Button style={{backgroundColor: 'white', height: 80}}
                                                onPress={() => shest(rowData)}>


                                            <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                                                <View style={{flexDirection: 'column'}}>
                                                    <Text style={{
                                                        marginBottom: 10,
                                                        marginTop: 10,
                                                        color: 'green',
                                                        fontFamily: 'B Koodak'
                                                    }}>
                                                        هر {rowData.orderunit} {rowData.offerprice} تومان

                                                    </Text>
                                                    <Text style={{
                                                        marginBottom: 10, marginTop: 10, color: 'red',
                                                        textDecorationLine: 'line-through',
                                                        textDecorationStyle: 'solid'
                                                        , fontFamily: 'B Koodak'

                                                    }}>
                                                        هر {rowData.orderunit} {rowData.unitprice} تومان
                                                    </Text>


                                                </View>
                                                <Right>
                                                    <Text style={{
                                                        alignItems: 'center', marginRight: 7
                                                        , fontFamily: 'B Koodak'
                                                    }}>
                                                        {rowData.product_name}

                                                    </Text>
                                                </Right>
                                            </View>
                                            <View style={{overflow: 'hidden', margin: 10, borderRadius: 7}}>
                                                <Image2
                                                    key={rowID}
                                                    source={{uri: rowData.small_image_link, cache: 'force-cache',}}

                                                    style={{
                                                        width: 60,
                                                        height: 60
                                                    }}/>

                                            </View>


                                        </Button>

                                    </View>
                                </View>

                            }/>


                    </ScrollView>
                </Content>

            </Container>
        );

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});
module.export = AppBodyData;