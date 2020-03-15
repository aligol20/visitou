/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import React, {Component} from 'react';
import {Container, Body, Center, Content, Right, Root, Icon, Text,Button} from 'native-base';
import {TouchableHighlight,TouchableWithoutFeedback,Modal,TouchableOpacity,Alert,StyleSheet,Picker,ListView, View, Dimensions, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-banner-carousel';
import DialogManager, {ScaleAnimation, SlideAnimation, DialogComponent} from 'react-native-dialog-component';
import Icon4 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Image2 from 'react-native-image-progress';
import StarRating from 'react-native-star-rating';
let PickerItem = Picker.Item;
let loading = false;
const BannerWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    buttonNo:{justifyContent:'center',alignItems:'center',borderWidth:0,borderColor:'#DADFE1',borderRadius:7,backgroundColor:'white',margin:5,width:'100%'},
    buttonYes:{justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:'green',borderRadius:7,backgroundColor:'white',margin:5,width:'100%'},
    modelYes: {borderRadius:7,borderWidth:2,borderColor:'green',backgroundColor:'#00000000',flexDirection:'column',height:'100%',alignItems:'center'},
    modelNo: {borderRadius:7,borderWidth:0,borderColor:'#00000000',backgroundColor:'#00000000',flexDirection:'column',height:'100%',alignItems:'center'},
    Active: {height:60,backgroundColor:'#00B16A',borderRadius:0,width:'100%'},
    deActive: {height:60,backgroundColor:'#BDC3C7',borderRadius:0,width:'100%'},
    liked:{color:'red'},
    disliked:{color:'grey'}

});

export default class DetailsScreen extends Component {
    constructor(props, context) {
        super(props, context);
        // this.doThis();

        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            mount: 1,
            wait:true,
            name: '',
            qwe: [],
            frf: [],
            isLoading: true,
            imageList: [],
            imageUrl: '',
            imageLoaded: false,
            modalVisibility: false,
            models_array: [],
            dataSource: dss.cloneWithRows([]),
            dataSource2: dss.cloneWithRows([]),
            pressed:false,
            secsec:'nono',
            provider_array:[],
            model_array:[],
            model_array_base:[],
            mount:1,
            selectedPrice:0,
            likeing:false,
            liked:false,
            userPhone:'',
            ouou:true,



        };

        AsyncStorage.getItem('userInfo',(err,store)=>{
            if(store !==null){

                console.log(store,'aqaqaqaqaqaqaqa');
                this.setState({likeing:true,
                    userPhone:JSON.parse(store)[0].phone})
            }
        });

        try {
            AsyncStorage.getItem('product', (err, result) => {
                console.log(JSON.parse(result),'iaiaiaiaia');
                let yuyu = JSON.parse(result).product_id;
                let pp = {id: yuyu};
                this.setState({idid:yuyu});

                AsyncStorage.getItem('userInfo', (err, store) => {
                    if (store !== null) {
                        console.log(JSON.parse(store)[0].phone,'iaiaiaiaia5');
                        let rurur = JSON.parse(store)[0].phone;
                        let o = {pro_id: yuyu, userphone: rurur};

                        console.log(store, 'aqaqaqaqaqaqaqa');
                        fetch('http://visitou.ir/api/is_liked.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(o)
                        }).then((response) => response.json()).then((responseJson) =>
                        {if(responseJson.length===1){
                            this.setState({liked:true})
                        }});
                        this.setState({
                            likeing: true,
                            userPhone: JSON.parse(store)[0].phone
                        });
                    }
                });
                goo = JSON.parse(result);
                let aani = [{id: goo.product_id}];
                    console.log(goo,'lqaszccms');
                fetch('http://visitou.ir/api/get_model_provider.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pp)
                }).then((response) => response.json()).then((responseJson) =>  {
                    if(responseJson.length===1){
                        responseJson[0].is_model_selected='1';

                    }
                    // responseJson[0].is_model_selected='1';

                    console.log(responseJson,'dkjdkljlkdjfld');
                    this.setState({models_array:responseJson});
                    fetch('http://visitou.ir/api/get_provider.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(pp)
                    }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.length===1){
                            responseJson[0].is_selected='1';
                            // this.ridimjomlegi(0,goo.product_id)

                        }
                        // responseJson[0].is_selected='1';
                        if(responseJson.length===0){
                            goo.available = '0';
                            console.log(responseJson,'nnnnnnnnnnn');

                        }
                        console.log(responseJson,'dkjdkljlkdjfld2');
                        this.setState({provider_array:responseJson});
                        this.model_preparing();
                        this.provider_collecting();

                    });

                });


                this.setState({
                    frf: goo,
                    imageUrl: aani
                });
            });
        }catch (err){
            console.log(err,'dkfjdkfjkdfdk')
        }
    }
    componentDidMount(){


    }
    doThis() {
        let pp = {id: '14'};
        try {
             // fetch('http://visitou.ir/api/get_model_provider.php')
             //    .then((response) => response.json())
             //    .then((responseJson) => {
             //        this.setState({models_array:responseJson}),this.model_preparing()
             //    })
             //    .catch((error) => {
             //        console.error(error);
             //    });
             fetch('http://visitou.ir/api/get_model_provider.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pp)
            }).then((response) => response.json()).then((responseJson) =>  {
                 if(responseJson.length===1){
                     responseJson[0].is_model_selected='1';

                 }
                 // responseJson[0].is_model_selected='1';

                 console.log(responseJson,'dkjdkljlkdjfldrrrrrrrr');
                 this.setState({models_array:responseJson});
                 fetch('http://visitou.ir/api/get_provider.php', {
                     method: 'POST',
                     headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify(pp)
                 }).then((response) => response.json()).then((responseJson) => {
                     if(responseJson.length===1){
                         responseJson[0].is_selected='1';

                     }
                     // responseJson[0].is_selected='1';

                     console.log(responseJson,'dkjdkljlkdjfld2');
                     this.setState({provider_array:responseJson});
                     this.model_preparing();
                     this.provider_collecting();
                     });

             });


            console.log(this.state.models_array, 'nanandnjwdj');
            console.log(JSON.stringify(pp), '123444444');

        } catch (error) {
        }


    }
    provider_collecting(){
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const lo = this.state.provider_array;
        this.setState({
            dataSource2: dss.cloneWithRows(lo.map(function (tt) {
                return tt
            })),
        });
        console.log(this.state.provider_array.map(function (tt) {
            return tt
        }),'dededfkdkj');
        // if(this.state.provider_array.length ===1){
        //     this.ridimjomlegi(0,this.state.idid);
        // }

    }
    model_preparing(){
        let ko=[];
        const jo = this.state.models_array;
        // let ghoo = r.filter(x => x.product_name.includes(this.state.item) && x.unitprice !== 'no');

        for (let i=0;i<jo.length;i++){
            if(!ko.map(function (t) {
                    return t.model_name
                }).includes(jo[i].model_name)){
                ko.push(jo[i])
            }
        }
        console.log(ko.map(function (t) {
            return t.model_name
        }).includes('red'),'kjfkjkkdk2');
        console.log(ko,'kjfkjkkdk');
        this.setState({models_array:ko,model_array_base:ko});

        this.model_collecting(ko);



    }
    model_collecting(koko){

        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log(koko,'mimimimi2');
        this.setState({
            isLoading:false,
            visvis:false,
            ouou:false,
            dataSource: dss.cloneWithRows(koko.map(function (tt) {
                return tt
            })),
        });
        console.log(this.state.models_array.map(function (tt) {
            return tt.model_name
        }),'zasasasasasas');


    }
    getImages() {
        let yyy = this.state.imageUrl;
        console.log(yyy, 'lkdkldkd');

    }
    static navigationOptions = {
        title: '',
    };
    boos(koon) {

        return (

            <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, alignItems: 'center'}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{marginBottom: 10, marginTop: 10, color: 'green'}}>
                        هر {koon.orderunit} {koon.unitprice}
                    </Text>
                    <Text style={{
                        marginBottom: 10, marginTop: 10, color: 'red',
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                    }}>
                        {koon.offerprice}
                    </Text>


                </View>


                <Right>
                    <Text style={{
                        alignItems: 'center', marginRight: 10
                    }}>
                        {koon.product_name}

                    </Text>
                </Right>
            </View>
        )

    }
    darekoon(chos) {
        console.log(chos, 'now');
        console.log(this.state.mount, 'before');
        this.setState({mount: chos}, function () {
            console.log(this.state.mount, 'after');
            choose = chos;

        });
        console.log(this.state.mount, 'after2');

        console.log(choose, 'asa');

    }
    yar() {
        console.log(this.state.mount, 'check');
        return (
            this.state.mount
        );
    }
    gooz(detail) {
        console.log(detail, 'dkdkfjkdf');
        const item = [];
        const max = detail.max_order * 2;
        let min = detail.minorder;
        let half = 0;
        let i = 0;
        // if (detail.orderunit === 'کیلو') {
        //     for (i; i < max; i++) {
        //         half = half + 0.5;
        //         item.push({
        //             key: i,
        //             label: half.toString() +'   '+ '  کیلو',
        //             value: half
        //         });
        //         // item.push(half.toString() + '  کیلو');
        //         console.log(item.map(function (itiy) {
        //             return (
        //                 itiy.value
        //             )
        //         }), 'gohgoh');
        //     }
        // } else {
        //     for (min; min < max; min++) {
        //
        //         item.push({
        //             key: min ,
        //             label: min  +'   '+ detail.orderunit,
        //             value: min
        //         });
        //         // item.push(half.toString() + '  کیلو');
        //         console.log(item.map(function (itiy) {
        //             return (
        //                 itiy.value
        //             )
        //         }), 'gohgoh');
        //     }
        // }
        // Picker.init({
        //     pickerData: item.map(function (itit) {
        //
        //         return (
        //             itit.label
        //         );
        //     }),
        //     pickerBg: [236, 240, 241, 1.0],
        //     pickerConfirmBtnText: 'خوبه',
        //     pickerFontSize:19,
        //     pickerConfirmBtnColor:[34, 167, 240,1.0],
        //     pickerCancelBtnColor:[108, 122, 137,1.0],
        //     pickerFontColor:[58, 83, 155,1.0],
        //     pickerCancelBtnText: 'فعلا نه',
        //     pickerTitleText: 'مقدار را انتخاب کنید',
        //     pickerToolBarBg:[245, 245, 245,1.0],
        //     onPickerConfirm: item => {
        //         console.log(item, 'sellllected');
        //         this.setState({
        //             mount: item,
        //             showToast: false
        //
        //
        //         });
        //
        //         this.saveMountSelected(parseFloat(item), detail)
        //
        //
        //     },
        //     onPickerCancel: item => {
        //         console.log(item);
        //     },
        //     onPickerSelect: item => {
        //         console.log(item);
        //     }
        // });
        // Picker.show();
        let width = Dimensions.get('window').width; //full width
        let height = Dimensions.get('window').height;
        return (
            <DialogComponent
                ref={(dialogComponent) => {
                    this.dialogComponent = dialogComponent;
                }}
                dialogAnimation={ new ScaleAnimation() }
                width={100}
            >
                <View>
                    <Text>Hello</Text>
                </View>
            </DialogComponent>
        )
        // DialogManager.show({
        //     title: 'Dialog',
        //     titleAlign: 'center',
        //     animationDuration: 200,
        //     width:0.9*width,
        //     height:0.8*height,
        //     dismissOnHardwareBackPress:false,
        //     dismissOnTouchOutside:false,
        //     dialogStyle:{borderRadius:9},
        //     SlideAnimation: new SlideAnimation({ slideFrom: 'left' }),
        //     children: (
        //         <DialogComponent
        //             ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}
        //         >
        //             <View style={{backgroundColor:'red'}}>
        //                 <Text>
        //                     React Native Dialog Component
        //                 </Text>
        //                 <Button
        //                     style={{backgroundColor:'red'}}
        //                     onPress={()=>this.dialogComponent.dismiss()}>
        //
        //                 </Button>
        //             </View>
        //         </DialogComponent>
        //     ),
        // }, () => {
        //     console.log('callback - show');
        // });
    }
    saveMountSelected() {

        // AppFooter.forceUpdate();
        //save new orders with mount in asyncstorage
        let y= this.state.provider_array;
        let u=this.state.models_array;
        let ghoo = y.filter(x => x.is_selected.includes('1'));
        let hoo = u.filter(x => x.is_model_selected.includes('1'));

        console.log(ghoo[0],'ddldddldldldd');
        console.log(hoo[0],'ddldddldldlddqw');

        try {
            let newOrder = {
                porduct_id: this.state.frf.product_id,
                product_name: this.state.frf.product_name,
                product_mount: this.state.mount,
                unitPrice: this.state.selectedPrice,
                orderUnit: 'بسته',
                model: hoo[0],
                image: this.state.frf.image_link,
                providerDetails:ghoo[0]

            };
            console.log(JSON.stringify(newOrder),'ddldddldldlddqwddd');

            AsyncStorage.setItem('order' + this.state.frf.product_id+ ghoo[0].provider_name+hoo[0].model_name, JSON.stringify(newOrder));
            this.setState({modalVisibility:false});
            AsyncStorage.getItem(detail.product_id, (err, result) => {
                const fff = JSON.parse(result);
                // console.log(detail.product_id,'sljcnasjnj');
                // console.log(fff.product_Name,'sljcnasjnj');

            });

            Toast.show('به سبد شما اضافه شد');

        } catch (error) {

            // Error saving data
        }


    }
    mounting(type){

        let po=this.state.mount;
        switch (type){
            case '+':
                if(this.state.mount<100){
                    this.setState({mount:po+1});
                    loading=false;
                }
                break;
            case '-':
                if(this.state.mount>1){
                    this.setState({mount:po-1});
                    loading=false;

                }
        }
        console.log(po,'slsfklskflskfls');
    }
    berinimJomlegi(sec,id){
        let k=this.state.models_array;
        for (let i=0;i<k.length;i++){
            k[i].is_model_selected = '0'
        }
        k[sec].is_model_selected = '1';
        console.log(k,'kqkqkqkqk');

        this.setState({models_array:k});
        this.model_collecting(k)

    }
    ridimjomlegi(sec,pro_id){
        let k=this.state.provider_array;
        for (let i=0;i<k.length;i++){
            k[i].is_selected = '0'
        }
        let h=this.state.models_array;
        for (let i=0;i<h.length;i++){
            h[i].is_model_selected = '0'
        }
        k[sec].is_selected = '1';
        this.setState({selectedPrice:k[sec].provider_price,provider_array:k});
        this.provider_collecting();
        let r=this.state.model_array_base;
        console.log(sec,pro_id,'lslwlwldkmdkd');

        let ghoo = r.filter(x => x.provider_id.includes(pro_id) );
        console.log(ghoo,'lslwlwldkmdkd444');

        this.setState({models_array:ghoo});

            this.model_collecting(ghoo);

        // if(ghoo.length===1) {
        //     console.log(ghoo, 0, 'lslwlwldkmdkd444');
        //
        //
        //     this.berinimJomlegi(sec, this.state.idid);
        // }

        // console.log(this.state.secsec,'kfjkgdjjdg')
    }
    renderPage() {
        let oo = {id: this.state.imageUrl[0].id};
        // console.log(this.state.imageUrl[0].id, 'dskwwsasod');
        fetch('http://visitou.ir/api/image_list.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(oo)
        }).then((response) => response.json()).then((responseJson) =>{
            // console.log(responseJson.length,'sldkfdksljkd');
            // console.log(oo,'sldkfdksljkd');
                this.setState({imageList: responseJson, imageLoaded: true})
            // console.log(this.state.imageList.length,'lzlzlzlzlz' );
        });

        if (this.state.imageList.length !==0) {
            // console.log(this.state.imageList.length,'lzlzlzlzlsdsddskdz' );

            return this.state.imageList.map((data) => {
                return (
                    <View key={data.image_link } style={{height: BannerWidth}}>
                        <Image


                            style={{width: BannerWidth, height: BannerWidth}}

                            source={{uri: data.image_link, cache: 'force-cache',}}/>
                    </View>
                );
            })


        } else {
            return (
                <View key={9} style={{height: BannerWidth}}>
                    <Image


                        style={{width: BannerWidth, height: BannerWidth}}

                        source={{uri: 'http://www.visitou.ir/images/visitou_free.png', cache: 'force-cache',}}/>
                </View>
            );

        }


    };
    offerVisible() {
        if (this.state.frf.offer === '0') {
            return (
                <View style={{flexDirection: 'column'}}>

                    <Text style={{marginBottom: 10,fontFamily: 'B Koodak', marginTop: 10, color: 'green'}}>
                        هر {this.state.frf.orderunit} {this.state.frf.offerprice} تومان
                    </Text>
                    <Text style={{
                        marginBottom: 10, marginTop: 10, color: 'red',
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        fontFamily: 'B Koodak'
                    }}>
                        هر {this.state.frf.orderunit}{this.state.frf.unitprice}تومان
                    </Text>
                </View>
            )
        }
        return (
            <View style={{flexDirection: 'column'}}>

                <Text style={{marginBottom: 10,fontFamily:'B Koodak', marginTop: 10, color: 'green'}}>
                    هر {this.state.frf.orderunit} {this.state.frf.unitprice} تومان
                </Text>
            </View>
        )

    }
    abbrNum(number, decPlaces) {
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10,decPlaces);

        // Enumerate number abbreviations
        var abbrev = [ " k", " m", " b", " t" ];

        // Go through the array backwards, so we do the largest first
        for (var i=abbrev.length-1; i>=0; i--) {

            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10,(i+1)*3);

            // If the number is bigger or equal do the abbreviation
            if(size <= number) {
                // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                // This gives us nice rounding to a particular decimal place.
                number = Math.round(number*decPlaces/size)/decPlaces;

                // Handle special case where we round up to the next abbreviation
                if((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }

                // Add the letter for the abbreviation
                number += abbrev[i];

                // We are done... stop
                break;
            }
        }

        return number;
    }
    modal() {
        let width = Dimensions.get('window').width; //full width
        return (
            <Modal
                swipeDirection="down"
                onRequestClose={null}
                animationInTiming={500}
                onSwipe={() => this.setState({modalVisibility: false})}
                isVisible={this.state.modalVisibility}
                style={{borderRadius: 7}}>

                <View style={{flex: 1, backgroundColor: 'white', borderRadius: 7}}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: '95%',
                        backgroundColor: 'white'
                    }}>
                        <View style={{
                            width: '90%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}>
                            <Text style={{justifyContent: 'center'}}>انتخاب و تایید کالا</Text>
                        </View>
                        <Icon4 style={{marginTop: 5}}
                               name='ios-close'
                               color="gray" size={47}
                               onPress={() => this.setState({modalVisibility: false})}/>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'brown', width: '100%', height: 80}}>
                        <Right style={{backgroundColor: 'white', width: '100%'}}>
                            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    marginRight: 30
                                }}>
                                    <Text style={{
                                        color: 'green',
                                        alignItems: "center",
                                        justifyContent: 'center'
                                    }}>هر{this.state.frf.orderunit} {this.state.frf.unitprice}</Text>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    marginRight: 30
                                }}>

                                    <Text style={{
                                        marginLeft: 30,
                                        alignItems: "center",
                                        justifyContent: 'center'
                                    }}>{this.state.frf.product_name}</Text>

                                </View>
                                <View style={{overflow: 'hidden', margin: 10, borderRadius: 7}}>
                                    <Image2
                                        source={{uri: this.state.frf.small_image_link, cache: 'force-cache',}}


                                        style={{
                                            width: 60,
                                            height: 60
                                        }}/>
                                </View>
                            </View>
                        </Right>


                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: '#DADFE1', marginTop: 10}}/>
                    <View style={{
                        height: 131,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        flexDirection: 'column'
                    }}>
                        <Text style={{alignItems: 'center', marginTop: 7}}>انتخاب نوع کالا</Text>
                        <ScrollView
                            horizontal={true}>
                            <ListView
                                horizontal={true}
                                style={{width: width, backgroundColor: '#00000000'}}
                                dataSource={this.state.dataSource}
                                renderRow={(rowData, rowID, sectionID) =>
                                    <View style={{backgroundColor:'red',width:30,height:30}}>

                                        <Text>{rowData.model_name}</Text>
                                    </View>

                                }
                            />
                        </ScrollView>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: '#DADFE1', marginTop: 10}}/>
                    <View style={{
                        height: 131,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        flexDirection: 'column'
                    }}>
                        <Text style={{alignItems: 'center', marginTop: 7}}>انتخاب تامین کننده</Text>

                    </View>

                </View>

            </Modal>

        )


    }
    likeThis(){
        let o=[{pro_id:this.state.imageUrl[0].id,userPhone:this.state.userPhone}];
        console.log(this.state.imageUrl[0].id,'koaoaads3');
        console.log(o,'koaoaads4');
        if(this.state.liked){
            Alert.alert(
                '',
                ' آیا میخواهید از لیست علاقه مندی ها حذف شود؟',
                [
                    {text: 'آره', onPress: () => { this.setState({liked:false})
            fetch('http://visitou.ir/api/dislike.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(o)
            }).then((response) => console.log(response,'koaoaads'))}
        },
                    {text: 'نه', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

                ],
                {cancelable: false}
            );

    }else {
            Alert.alert(
                '',
                ' به لیست علاقه مندی ها افزوده شد',
                [
                    {text: 'خب', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

                ],
                {cancelable: false}
            );
        this.setState({liked:true});
         fetch('http://visitou.ir/api/like.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(o)
        }).then((response) => console.log(response,'koaoaads2'));

    }

    }
    render() {
        let width = Dimensions.get('window').width; //full width
        let height = Dimensions.get('window').height;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }


        return (

            <Container>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems:'center',
                    width:'100%',
                    height:50,
                    backgroundColor:'#1c375c'
                }}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'center',width:'30%',flexDirection:'row'}}>
                        <Icon4 name='md-arrow-back'
                               color='#FDE3A7'
                               size={27}
                               style={{marginLeft:10}}
                               onPress={()=>Actions.pop()}
                        />
                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center',width:'40%'}}>
                        <Text style={{width:'100%',textAlign:'center',
                            fontSize: 13, color: '#FDE3A7', fontFamily: 'B Koodak',
                        }}>{this.state.frf.product_name}</Text>

                    </View>
                    <View style={{width:'30%'}}/>

                    <View/>
                </View>
                <ScrollView style={{backgroundColor: 'white'}}>

                    <Carousel

                        index={0}
                        pageSize={BannerWidth}
                    >
                        {this.renderPage()}

                    </Carousel>


                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, alignItems: 'center',backgroundColor:'white'}}>

                        {this.offerVisible()}


                        <View style={{alignItems:'flex-end',flexDirection:'column',justifyContent:'flex-end',backgroundColor:'white',flex:1}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                                <View
                                    style={{backgroundColor:'white',marginRight:20}}>
                                    <TouchableHighlight
                                        onPress={()=>this.state.likeing ? this.likeThis():alert('firstlogin')} underlayColor="white">
                                    <Icon3
                                        size={27}
                                        name={this.state.liked ?'favorite':'favorite-border'}
                                    color={this.state.liked ? 'red':'grey'}/>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View>
                            <Text style={{
                                alignItems: 'center', marginRight: 10, fontFamily: 'B Koodak',
                                fontSize:23,
                            }}>
                                {this.state.frf.product_name}

                            </Text>
                            </View>
                        </View>
                    </View>

                    <View
                            style={this.state.frf.available==='1' ? {margin: 10,backgroundColor:'#2ECC71',borderRadius:5} : {margin: 10,backgroundColor:'#6C7A89',borderRadius:5}}>
                        <TouchableOpacity
                            disabled={this.state.frf.available!=='1'}
                            onPress={() =>{
                                if(this.state.provider_array.length===1   ){
                                    console.log(this.state.idid,'lfkdjfkldj');
                                    this.ridimjomlegi(0,this.state.idid);
                                    this.berinimJomlegi(0,this.state.idid);
                                    console.log(this.state.model_array,'lqaalksklf');
                                }
                                this.setState({modalVisibility:true})}}
                            underlayColor={'white'}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily: 'B Koodak',color:'white',marginTop:10,marginBottom:10}}>{this.state.frf.available==='1' ? "افزودن به سبد خرید" : "    ناموجود"}</Text>
                        <Icon3 name='shopping-cart'
                              color='white'
                               size={27}
                        />
                            </View>
                        </TouchableOpacity>

                    </View>

                    <Text style={{
                        fontFamily: 'B Koodak',
                        textAlign: 'right',
                        marginLeft: 20,
                        marginRight: 20,
                        paddingBottom: 10
                    }}>{this.state.frf.properties}</Text>

                </ScrollView>
                <Modal


                    animationInTiming={100}
                    useNativeDriver={true}
                    onRequestClose={()=>this.setState({modalVisibility:false})}
                    hideModalContentWhileAnimating = {true}
                    visible={this.state.modalVisibility}
                >

                    <ScrollView style={{backgroundColor:'white'}}>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',

                            backgroundColor: 'white'
                        }}>
                            <View style={{
                                width: '90%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white'
                            }}>
                                <Text style={{justifyContent: 'center'}}>انتخاب و تایید کالا</Text>
                            </View>
                            <Icon4 style={{marginTop: 5,marginRight:7}}
                                   name='ios-close'
                                   color="gray" size={47}
                                   onPress={() => this.setState({modalVisibility: false})}/>
                        </View>
                        <View style={{flexDirection: 'row', backgroundColor: 'brown', width: '100%', height: 80}}>
                            <Right style={{backgroundColor: 'white', width: '100%'}}>
                                <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: "row",
                                        justifyContent: 'center',
                                        backgroundColor: 'white',
                                        marginRight: 30
                                    }}>
                                        <Text style={{
                                            color: 'green',
                                            alignItems: "center",
                                            justifyContent: 'center',
                                            fontFamily: 'B Koodak'
                                        }}>هر{this.state.frf.orderunit} {this.state.selectedPrice} تومان </Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: "row",
                                        justifyContent: 'center',
                                        backgroundColor: 'white',
                                        marginRight: 30
                                    }}>

                                        <Text style={{
                                            marginLeft: 30,
                                            alignItems: "center",
                                            justifyContent: 'center'
                                        }}>{this.state.frf.product_name}</Text>

                                    </View>
                                    <View style={{overflow: 'hidden', margin: 10, borderRadius: 7}}>
                                        <Image2
                                            source={{uri: this.state.frf.small_image_link, cache: 'force-cache',}}


                                            style={{
                                                width: 60,
                                                height: 60
                                            }}/>
                                    </View>
                                </View>
                            </Right>


                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: '#DADFE1', marginTop: 10}}/>
                        <View style={{
                            width:'100%',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent:'center',
                            marginTop:10
                        }}>
                            <View>
                            <Text style={{alignItems: 'center', marginTop: 7}}>انتخاب تامین کننده</Text>
                            </View>
                            <ListView
                                enableEmptySections={true}
                                style={{width:'100%'}}
                                dataSource={this.state.dataSource2}
                                renderRow={(rowData, rowID, sectionID) =>
                                        <View

                                            style={styles.buttonNo }>
                                            <TouchableWithoutFeedback

                                                onPress={()=>this.ridimjomlegi(sectionID,rowData.provider_details_id)}>
                                                <View
                                                    style={{flexDirection:'row',backgroundColor:'white',borderWidth:1,borderColor:'grey',paddingLeft:3
                                                        ,alignItems:'center',justifyContent:'center'}}>
                                            <StarRating
                                                disabled={true}
                                                maxStars={5}
                                                rating={parseInt(rowData.rate)}
                                                starSize={13}
                                                starColor='#F9BF3B'
                                                fullStarColor='#F9BF3B'
                                                emptyStarColor="#F9BF3B"



                                            />
                                            <Text style={{width:'15%',color:'black',fontFamily:'B Koodak',fontSize:13,paddingLeft:-7,paddingRight:-7,marginRight:3,marginLeft:3}}>{this.abbrNum(rowData.votes,1) } </Text>
                                            <Text style={{width:'20%',color:'black',fontFamily:'B Koodak',fontSize:13,paddingLeft:-7,paddingRight:-7,marginRight:3,marginLeft:3}}>{rowData.provider_price+' '+'تومان'} </Text>
                                            <Text style={{width:'33%',paddingTop:3,textAlign:'center',justifyContent:'center',fontFamily:'B Koodak',fontSize:17,color: '#22313F'}}>{rowData.persian_name}</Text>

                                                <Icon4
                                                        style={{width:'7%',marginRight:7}}
                                                       name='ios-checkmark'
                                                       color={rowData.is_selected === '1' ? 'green' : 'white'}
                                                       size={47}
                                                       />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                }
                            />



                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: '#DADFE1', marginTop: 10}}/>
                        <View style={{
                            height:150,
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <Text style={{alignItems: 'center', marginTop: 7}}>انتخاب نوع کالا</Text>

                            <ListView
                                horizontal={true}
                                enableEmptySections={true}
                                style={{ backgroundColor: 'white',height:70,marginTop:10}}
                                dataSource={this.state.dataSource}
                                renderRow={(rowData, rowID, sectionID) =>
                                        <View
                                            style={styles.modelNo }
                                        >
                                            <TouchableWithoutFeedback
                                                style={{borderWidth:1,borderColor:'grey',backgroundColor:'white',height:'100%',marginRight:7}}
                                                onPress={()=>this.berinimJomlegi(sectionID,rowData.model_id)}>

                                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',margin:3}}>
                                            <View style={{overflow: 'hidden',  borderRadius: 7}}>
                                            <Image
                                                source={{uri: rowData.model_image}}


                                                style={{
                                                    borderRadius:7,
                                                    width: 50,
                                                    height: 50
                                                }}/>

                                            </View>
                                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{textAlign:'center',color:'black'}}>{rowData.model_name}</Text>
                                                <Icon4
                                                       name='ios-checkmark'
                                                       color={rowData.is_model_selected ==='1' ? 'green' : 'white'}
                                                           size={29}
                                                       />
                                                </View>

                                            </View>
                                            </TouchableWithoutFeedback>
                                        </View>


                                }
                            />
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: '#DADFE1', marginTop: 10}}/>
                        <View style={{

                            alignItems: 'center',
                            backgroundColor: 'white',
                            flexDirection: 'column',
                            justifyContent:'center',
                            marginTop:10
                        }}>
                            <View>
                                <Text style={{alignItems: 'center', marginTop: 7}}>انتخاب تعداد</Text>
                            </View>
                            <View style={{flexDirection:'row',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                                <View                                     style={{backgroundColor:'white'}}
                                >
                                <TouchableWithoutFeedback
                                    underlayColor={'white'}
                                    style={{backgroundColor:'white'}}
                                    onPress={() =>{this.mounting('+')}}>
                                <Icon4 style={{marginTop: 5}}
                                       name='ios-add-circle-outline'
                                       color="green" size={47}
                                       />
                                </TouchableWithoutFeedback>
                                </View>
                                <View style={{borderWidth:2,borderRadius:7,borderColor:'#3498DB',margin:13,width:73}}>
                                <Text style={{fontFamily: 'B Koodak',textAlign:'center',fontSize:23,marginTop:5,marginBottom:5,marginLeft:7,marginRight:7}}>{this.state.mount}</Text>
                                </View>
                                <View style={{backgroundColor:'white'}}>
                                <TouchableWithoutFeedback
                                    underlayColor={'white'}
                                    style={{backgroundColor:'white'}}

                                    onPress={() =>{this.mounting('-')}}>
                                    <Icon4 style={{marginTop: 5}}
                                       name='ios-remove-circle-outline'
                                       color="red" size={47}
                                       />
                                </TouchableWithoutFeedback>
                                </View>
                            </View>


                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:60}}>
                            <Button
                                style={ this.state.provider_array.map(function (dd) {
                                    return dd.is_selected
                                }).includes('1') &&
                                    this.state.models_array.map(function (rr) {
                                        return rr.is_model_selected

                                    }).includes('1')
                                    ? styles.Active : styles.deActive }

                             onPress={()=>this.saveMountSelected()}>
                                <View style={{flex:1,alignItems:'center',flexDirection:'row',justifyContent:'center',width:'100%'}}>
                                    <Text style={{textAlign:'center',justifyContent:'center',fontFamily: 'B Koodak'}}>جمع نهایی: {this.state.selectedPrice*this.state.mount} تومان </Text>
                                    <View style={{width:3,height:'100%',backgroundColor:'white'}}/>
                                    <Text style={{textAlign:'center',fontFamily: 'B Koodak'}}>ثبت خرید</Text>

                                </View>
                            </Button>
                        </View>
                    </ScrollView>

                </Modal>

            </Container>
        );

    }


    }

module.export = DetailsScreen;

