import React, {Component} from 'react';
import {AsyncStorage, renderRow,View,Text, ActivityIndicator,TouchableHighlight, Dimensions, Image, ListView,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/Ionicons'
import {ProgressDialog} from 'react-native-simple-dialogs';


import {
    Container, Button, Toast, List, ListItem,
     Thumbnail, Body,
    Content, Footer, FooterTab,
    Badge, Right,
} from 'native-base';

let testing = [];
export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            list: [],
            newKeys: [],
            list2: [],
            mount: 1,
            visvis:false,
            itemlabel: [],
            isLoading: true,
            disable:true,
            background:'#BDC3C7',


            dataSource: dss.cloneWithRows([]),

        };
        console.log(this.state.list, 'asdfghjk');


    }
    listName() {
        if (this.state.list.product_Name !== null) {
            return (
                this.state.list.product_Name
            )
        }
    }
    componentDidMount() {
        this.listOrder();
    }
    saveMountSelected(mount, detail) {
        let rrr = JSON.parse(detail);
        console.log(mount,detail, 'salalalalala');
        // Toast.show({
        //     text: detail.product_name + ' به سبد خرید اضافه شد',
        //     position: 'bottom',
        //     buttonText: 'خوبه',
        //     duration: 3000
        // });
        // AppFooter.forceUpdate();
        //save new orders with mount in asyncstorage
        console.log(rrr, 'dbfklgjkgjkg');

        try {
            let newOrder = {
                porduct_id: rrr.porduct_id,
                product_name: rrr.product_name,
                product_mount: mount,
                unitPrice: rrr.unitPrice,
                image: rrr.image,
                max_order: rrr.max_order,
                orderUnit:rrr.orderUnit,
            };
            AsyncStorage.setItem('order'+rrr.porduct_id, JSON.stringify(newOrder));

            AsyncStorage.getItem('order'+rrr.porduct_id, (err, result) => {
                const fff = JSON.parse(result);
                console.log(fff, 'grgrgrgr');
                // console.log(detail.product_id,'sljcnasjnj');
                // console.log(fff.product_Name,'sljcnasjnj');
                this.listOrder();

            });
        } catch (error) {
            console.log(error, 'dbfklgjkgjkg');
            // Error saving data
        }
    }
    koon(go) {
        let goo = [];
        console.log(this.state.list.length, 'dldjjssss');
        AsyncStorage.removeItem(this.state.list[go].id, (err) => {
            this.setState({list: []})
        });
        console.log(this.state.list, 'dldjj');
        if (this.state.list.length === 1) {
            console.log(this.state.list, 'dldjj222');

            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({disable:true,
                dataSource: dss.cloneWithRows(goo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            });
        } else {
            this.listOrder();
        }


    }
    edit(go) {
        const item = [];
        let max = 0;
        let half = 0;
        let i = 0;
        let detail = [];
        let idA = this.state.list[go].id;
        console.log(idA,'sasasasasas');
        let min = 0;
        let unit= '';


        AsyncStorage.getItem(idA, (err, result) => {

            detail = JSON.parse(result);
            console.log(detail,'salaaaaaaaaam');
            min = detail.min_order;
            max = detail.max_order * 2;
            unit = detail.orderUnit;
            if (detail.orderUnit === 'کیلو') {
                for (i; i < max; i++) {
                    half = half + 0.5;
                    item.push({
                        key: i,
                        label: half.toString() + '  کیلو',
                        value: half
                    });
                    // item.push(half.toString() + '  کیلو');
                    console.log(item.map(function (itiy) {
                        return (
                            itiy.value
                        )
                    }), 'gohgoh');
                }
            } else {

                for (min; min < max; min++) {

                    item.push({
                        key: min ,
                        label: min  +'   '+ unit,
                        value: min
                    });
                    // item.push(half.toString() + '  کیلو');
                    console.log(item.map(function (itiy) {
                        return (
                            itiy.value
                        )
                    }), 'gohgoh');
                }
            }
            console.log(item, 'asasas');

            Picker.init({
                pickerData: item.map(function (tt) {
                    return (tt.label)
                })
                ,
                selectedValue: [0.5],
                pickerBg: [255, 255, 255, 255],
                pickerFontSize:19,
                pickerConfirmBtnText: 'خوبه',
                pickerCancelBtnText: 'فعلا نه',
                pickerConfirmBtnColor:[34, 167, 240,1.0],
                pickerCancelBtnColor:[108, 122, 137,1.0],
                pickerFontColor:[34, 49, 63,1.0],
                pickerTitleText: 'مقدار موردنیاز را انتخاب کنید',
                onPickerConfirm: items => {
                    console.log(parseFloat(items), 'lalalala');

                    this.saveMountSelected(parseFloat(items), result);
                },
                onPickerCancel: item => {
                    console.log(item);
                },
                onPickerSelect: item => {
                    console.log(item);
                }
            });
            Picker.show();


        });


    }
    listOrder() {
        let aan = [];
        let koon = [];
        console.log(this.state.list, 'dldjj3');
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                //const ghgh=JSON.parse(stores);
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    // console.log(result, '2nhnhnnh');
                    // console.log(store, '2nhnhnnh3');
                    // console.log(aan, '2nhnhnnh4');
                    let key = store[i][0];
                    let value = store[i][1];
                    // let listArray = JSON.parse(value);

                    if (key.includes('order') && value !== null) {
                        const listArray =JSON.parse(value);
                        this.setState({disable:false});
                        aan.push({
                            name: listArray.product_name,
                            id: key,
                            image: listArray.image,
                            mount: listArray.product_mount,
                            unit: listArray.orderUnit,
                            price: listArray.unitPrice,
                            providerDetails: listArray.providerDetails,
                            model: listArray.model,

                        });


                    }
                    // aan.push({name: listArray.product_name, id: key});

                    // console.log(listArray, 'd');
                    const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        list: aan,
                        visvis:false,
                        dataSource: dss.cloneWithRows(aan.map(function (itit) {
                            return (
                                itit
                            )
                        })),
                        isLoading: false,

                    })
                    // console.log(listArray, 'akhonda123');
                    // alert(value);


                });
            });

        });
    }
    chos() {
        console.log('calledme', 'sldkvdlkgk');


    }
    whatToDo() {
        try {
            AsyncStorage.getItem('userInfo', (err, store) => {

                if (store !== null) {
                    console.log(store, 'mahnazparivash17');

                    Actions.address();
                } else {
                    console.log(store, 'mahnazparivash18');
                    let where = 'cart';
                    AsyncStorage.setItem('WhereAmI', JSON.stringify(where));
                    Actions.account();
                    alert('ابتدا وارد حساب کاربری خود شوید');
                }

            });

        } catch (error) {
            // Error retrieving data
        }

    }
    mounting(type,id){
        let pop=[];
        this.setState({visvis:true});
        AsyncStorage.getItem(id,(err,store) => {

            console.log(JSON.parse(store).product_mount,'qawaqawwq');
            let mou = JSON.parse(store);
            switch (type) {
                case '+':
                    if (mou.product_mount < 100) {
                        mou.product_mount=mou.product_mount+1;
                        console.log(mou.product_mount,'lalalalalre')
                        console.log(mou,'lalalalalreqaqwq1111')

                    }
                    break;
                case '-':
                    if (mou.product_mount > 1) {
                        mou.product_mount=mou.product_mount-1;
                        console.log(mou.product_mount,'lalalalalreqaq')
                        console.log(mou,'lalalalalreqaqwq1111')


                    }
            }
            AsyncStorage.setItem(id,JSON.stringify(mou));


        });
        this.listOrder();
        console.log(id,'qawaqawwq2');

        let po=this.state.mount;

        console.log(po,'slsfklskflskfls');
    }
    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width;
        let height = Dimensions.get('window').height;

        if(this.state.disable){
            return (
                <Container style={{backgroundColor:'white'}}>
                    <View style={{height:height,alignItems:'center',justifyContent:'center'}}>
                        <Icon3 color="gray"
                               name="ios-cart" size={100}/>
                        <Text>سبد شما خالی است</Text>

                    </View>



                </Container>
            );

        }else {
            return (

                <Container>
                    <ProgressDialog
                        visible={this.state.visvis}
                        message="لطفا صبر کنید"
                    />
                    <View style={{
                        flexDirection: 'row', alignItems: 'center'
                        , justifyContent: 'center', backgroundColor: 'white',
                        paddingTop: 10, paddingBottom: 10, marginTop: 10
                    }}>
                            <Icon style={{margin: 10}} name="shopping-cart" color="#F39C12" size={30}
                            />


                        <Icon style={{margin: 10}} name="arrow-right" color="#F39C12" size={30}
                        />
                            <Icon2 style={{margin: 10}} name="location-pin" color="#81CFE0" size={37}
                            />
                        <Icon style={{marginRight: 10, marginLeft: 10}} name="arrow-right" color="#F39C12" size={30}
                        />
                            <Icon5 style={{margin: 10}} name="check" color="#81CFE0" size={30}
                            />

                    </View>
                    <ListView
                        style={{width: width, backgroundColor: '#00000000'}}
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={(rowData, rowID, sectionID) =>
                        <View style={{flexDirection:'column', borderRadius: 5, backgroundColor: 'white',width:'95%'
                            , justifyContent: 'center', alignItems: 'center', margin: 5}}>

                            <View style={{
                                borderRadius: 5, flexDirection: 'row', backgroundColor: 'white'
                                , justifyContent: 'center', alignItems: 'center', margin: 5
                            }}>
                                <View style={{marginLeft:5,marginTop:5,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                                <View style={{backgroundColor:'white'}}>
                                    <Button
                                        style={{backgroundColor:'white'}}
                                        onPress={() =>this.mounting('+',rowData.id)}>
                                        <Icon4 style={{marginTop: 5}}
                                               name='ios-add-circle-outline'
                                               color="green" size={29}
                                        />
                                    </Button>
                                </View>
                                <View style={{borderWidth:2,borderRadius:7,borderColor:'#3498DB',margin:13}}>
                                    <Text style={{fontFamily: 'B Koodak',textAlign:'center',fontSize:23,marginTop:5,marginBottom:5,marginLeft:7,marginRight:7}}>{rowData.mount}</Text>
                                </View>
                                <View style={{backgroundColor:'white'}}>
                                    <Button
                                        style={{backgroundColor:'white'}}

                                        onPress={() =>this.mounting('-',rowData.id)}>
                                        <Icon4 style={{marginTop: 5}}
                                               name='ios-remove-circle-outline'
                                               color="red" size={29}
                                        />
                                    </Button>
                                </View>
                            </View>
                                </View>
                                <Right>
                                    <View>
                                        <Text style={{margin: 5,textAlign:'center',fontFamily:'B Koodak'}}>{rowData.name +" "+ rowData.model.model_name}</Text>
                                            <Text style={{margin: 5,textAlign:'center',fontFamily:'B Koodak'}}>{rowData.providerDetails.provider_name}</Text>

                                        <View style={{height: 1, backgroundColor: '#009688'}}/>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                            <Text
                                                style={{margin: 3, color: '#4183D7',fontFamily:'B Koodak'}}> {rowData.price * rowData.mount}
                                                  تومان </Text>
                                            <Text style={{margin: 3, color: '#4183D7',fontFamily:'B Koodak'}}>{rowData.unit}</Text>
                                            <Text style={{margin: 3, color: '#4183D7',fontFamily:'B Koodak'}}>{rowData.mount}</Text>

                                        </View>
                                    </View>
                                </Right>
                                <Image
                                    source={{uri: rowData.image}}


                                    style={{
                                        margin: 10,
                                        width: 60,
                                        height: 60,
                                        borderRadius: 7,
                                        backgroundColor: '#00000000'
                                    }}/>
                            </View>
                            <View style={{width:'100%'}}>
                                <TouchableHighlight style={{marginBottom:5,marginRight: 10, marginLeft: 10,backgroundColor:'white',borderColor:'red',width:'20%'}}
                                                    underlayColor={"white"}
                                        onPress={() => this.koon(sectionID)}>
                                    <Text style={{fontFamily: 'B Koodak',textAlign:'center',fontSize:13,marginTop:2,marginBottom:2,marginLeft:7,marginRight:7,color:'red'}}>حذف</Text>
                                </TouchableHighlight>
                                <View style={{width:'80%'}}/>
                            </View>
                        </View>

                        }/>
                    <View style={{
                        backgroundColor: 'white', margin: 5, borderRadius: 7
                        , alignItems: 'center', justifyContent: 'center'
                    }}>
                        <View>
                            <Button
                                                                     onPress={() => this.whatToDo()}

                                style={ {margin: 10, borderRadius: 7, backgroundColor: '#22A7F0'}}>
                                <Text style={{fontFamily:'B Koodak',margin:5,color:'white'}}>مرحله بعد(مکان تحویل)</Text>
                            </Button>
                        </View>
                    </View>
                </Container>
            );
        }
    }
}

module.export = Cart;