import React, {Component} from 'react';
import {StyleSheet, AsyncStorage,TouchableHighlight, ActivityIndicator, Alert, Dimensions,renderRow,ListView,View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'jalali-moment';

import {
    Container, Button, Header,
    List, ListItem, Toast, Root, Right, Text, Left, Thumbnail, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
const styles = StyleSheet.create({
    buttonDelYes: {
        backgroundColor: '#2ECC71',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonDelNo: {
        backgroundColor: 'white',
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonDelCan: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    txtDelYes: {fontFamily: 'B Koodak', color: 'white'},
    txtDelNo: {fontFamily: 'B Koodak', color: '#2ECC71'},
    txtDelCan: {fontFamily: 'B Koodak', color: 'red'},


});
export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            asb: [],
            isLoading: true,
            info: [],
            dataSource: dss.cloneWithRowsAndSections([]),
            list: [],
            totalList:[],
            lenghttt:0,

        }

    }

    getData() {
        try {
            AsyncStorage.getItem('userInfo', (err, store) => {
                console.log(JSON.parse(store)[0].phone, 'mahnazparivash899999');
                let pop = JSON.parse(store)[0].phone;
                let aani = [{mobile: pop}];
                this.setState({info: JSON.parse(store)});

                if (pop !== null) {
                    console.log(JSON.stringify(aani), 'mahnazparivash10');

                    let test = fetch('http://visitou.ir/api/readPurchaseHistory.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(aani)
                    }).then((response) => response.json()).then((responseJson) =>{
                        console.log(responseJson,'lvdjlfjdl');
                        this.arrangePurchaseHistory(responseJson)});

                } else {

                }


            });

        }
        catch (error) {
            console.log(error);
            Toast.show({
                text: 'Wrong password!',
                position: 'bottom',
                buttonText: 'Okay'
            })
        }

    }

    arrangePurchaseHistory(data) {
        let ede = [];
        let pop = [];
        let nob = [];
        if(data.length===0){
            Alert.alert(
                'پیغام',
                'شما خریدی نداشته اید',

                [

                    {text: 'خب', onPress: () => Actions.feed()},
                ],
                { cancelable: false }
            )
        }
        let fgf = data.length;

        if(data.length<=10){
            for (let i = 0; i <= fgf; i++) {
                nob[i] = [];
            }
            console.log(data, 'zxcfdrth2');
            let uo = 0;
            for (let i = 0; i < fgf - 1; i++) {
                if (data[i].order_number !== data[i + 1].order_number) {
                    console.log(data[i].order_number, 'mamamama4');
                    pop.push(data[i]);
                    nob[uo].push(data[i]);
                    uo = uo + 1;
                    console.log(uo, 'mamamama3')
                } else {

                    nob[uo].push(data[i]);
                }


            }
            for (let i=0;i<fgf;i++){
                ede.push(data[i])
            }
        }else {
            for (let i = 0; i <= 10; i++) {
                nob[i] = [];
            }
            console.log(data, 'zxcfdrth');
            let uo = 0;
            for (let i = 0; i < 10 - 1; i++) {
                if (data[i].order_number !== data[i + 1].order_number) {
                    console.log(data[i].order_number, 'mamamama4');
                    pop.push(data[i]);
                    nob[uo].push(data[i]);
                    uo = uo + 1;
                    console.log(uo, 'mamamama3')
                } else {

                    nob[uo].push(data[i]);
                }


            }
            for (let i=0;i<=10;i++){
                ede.push(data[i])
            }
        }
        let kon = [];
        const kol = pop.length;
        const jok = nob.length;

        for (let i=kol;i<jok;i++){
            nob.splice(i)
        }


        console.log(nob, 'mamamama42');
        console.log(kon, 'mamamama4s23');
        console.log(pop, 'mamamama421');
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            getRowData: (dataBlob, sectionID, rowID) => nob[sectionID][rowID],
            getSectionHeaderData: (dataBlob, sectionID) => pop[sectionID]
        });

        console.log(ede,'jajajaja878788787878');



        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
            list: ede,
            totalList:data,
            lenghttt: data.length,
            isLoading: false,
                dataSource: ds.cloneWithRowsAndSections(nob),

        })

    }

    componentDidMount() {

        this.getData();

        Toast.toastInstance = null;

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

    signHimOut() {
        AsyncStorage.removeItem('userInfo');
        Actions.feed();
    }
    whichGel(id){

        console.log(parseInt(id),'koakokoaokaoksoqo2');

        let r=parseInt(id)+1;

        if(this.state.list.length-1>=r) {

            let r=parseInt(id)+1;
            let a=this.state.list[id];
            let b=this.state.list[r.toString()];
            if (a.order_number === b.order_number) {
                // let x= this.state.catchCross;
                // let f= a.cross;
                // this.setState({catchCross:x+f});
                return (
                    <View >
                    </View>
                )
            }
        }
        let sis=this.state.list;
        const hth=this.state.list[id].order_number;
        const ghoo = sis.filter(x => x.order_number === hth );

        let hyh=0;
        const e=ghoo.length;

        for(let i=0;i<e;i++){
            const fff=parseInt(ghoo[i].order_price)*parseInt(ghoo[i].order_mount);
            hyh=hyh+fff;
        }

        let y = sis[id].date;
        let yyy=new Date(sis[id].date);
        // // let moment = require('moment-jalaali');
        // let m= moment(yyy.getTime()).format('YYYY/MM/jDD');
        // // console.log(m,'ssssssssssss');
        // // let moment = require('moment-jalaali');
        // let rrr=moment(yyy.getTime()).format('jYYYY/jM/jD');
        // console.log(yyy.getTime(),'gqgqgqgfgfrfrwww');

        return(
            <View style={{alignItems:'center',flexDirection:'row',height:30,flex:1,backgroundColor:'#ECF0F1',borderWidth:2,borderColor:'white',marginTop:5,marginBottom:5
            }}>
                <View style={{width:'35%',flexDirection:'row',justifyContent:'center'}}>
                <Text style={{fontFamily:'B Koodak',margin:1}}>{hyh+' '+'تومان'}</Text>
                </View>
                <View style={{width:'35%',flexDirection:'row',justifyContent:'center'}}>
                <Text style={{fontFamily:'B Koodak',marginRight:3,marginLeft:3}}>تاریخ</Text>
                </View>


                    <View style={{width:'30%',flexDirection:'row',justifyContent:'center'}}>

                        <Text style={{marginRight:3,marginLeft:3}}>{sis[id].order_number}</Text>
                    </View>
            </View>
        )
    }
    kalak(id){
        console.log(parseInt(id),'koakokoaokaoksoqo');
    }
    loadMore(){
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        const lenght=this.state.list.length;
        const totalLenght = this.state.totalList.length;
        const list= this.state.totalList;
        let added=[];
        let mnm = lenght+10;
        if(mnm<totalLenght){
            for (let i=0;i<mnm;i++){
                added.push(list[i])
            }
        }


        let pop = [];
        let nob = [];

        for (let i = 0; i <= mnm; i++) {
            nob[i] = [];
        }
        let uo = 0;
        for (let i = 0; i < mnm - 1; i++) {
            if (list[i].order_number !== list[i + 1].order_number) {
                console.log(list[i].order_number, 'mamamama4');
                pop.push(list[i]);
                nob[uo].push(list[i]);
                uo = uo + 1;
                console.log(uo, 'mamamama3')
            } else {

                nob[uo].push(list[i]);
            }


        }
        let kon = [];
        const kol = pop.length;
        const jok = nob.length;

        for (let i=kol;i<jok;i++){
            nob.splice(i)
        }

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            getRowData: (dataBlob, sectionID, rowID) => nob[sectionID][rowID],
            getSectionHeaderData: (dataBlob, sectionID) => pop[sectionID]
        });

        console.log(added,'mqmqmqmqmq');
        this.setState({
            list: added,
            dataSource: ds.cloneWithRowsAndSections(nob),

        })


    }
    situ(row){
        console.log(row,'kjkjkkjk');
        switch (row.situation){
            case '0':
                return (
                    <Icon3 style={{marginLeft:10,marginRight:5}}
                               name='clock'
                               color='blue'
                                size={23}
                />
                );
            break;
            case '1':
                return (
                    <Icon3 style={{marginLeft:10,marginRight:5}}
                           name='truck'
                           color='#22A7F0'
                           size={23}
                    />
                );
            break;
            case '2':
                return (
                    <Icon3 style={{marginLeft:10,marginRight:5}}
                           name='check'
                           color='green'
                           size={23}
                    />
                );
            break;
            case '3':
                return (
                    <Icon3 style={{marginLeft:10,marginRight:5}}
                           name='close'
                           color='red'
                           size={23}
                    />
                );
                break;
        }
    }
    col(row){
        switch (row.situation){
            case 0:
                return 'blue';
                break;
            case 1:
                return 'red';
                break;
            case 2:
                return 'green';
                break;
        }
    }
    hello(id,sectionID) {


        let r = this.state.list;
        let yyyyyy = this.state.simple;
        console.log(this.state.list,'djfhdskjfdsh');


        let ghoo = r.filter(x => x.order_number === id.order_number);
        let kooni = 0;
        for (let i = 0; i < ghoo.length; i++) {
            kooni = kooni + ghoo[i].order_mount * ghoo[i].order_price
        }


        let yyy = new Date(id.date);
        let selectedFormat = "jDD-jMM-jYYYY";
       let  outputFormat = "YYYY-MM-DD";
        // let moment = require('moment-jalaali');

        let rrr = moment(id.date,outputFormat).format(selectedFormat);

        console.log(id.date, 'ddddkfjhdkj');


        // console.log(fgf[sectionID], 'llllllllkjjjjj33');



        return (


            <View style={{flexDirection: 'column', backgroundColor: '#DADFE1',borderWidth:2,borderColor:'white', width: '100%', marginTop: 20}}>


                <View style={{

                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                }}>

                    <Text style={{

                        fontFamily: 'B Koodak',
                        marginTop: 5,
                        textAlign: 'center',
                        color: "#22313F"
                    }}>{kooni + ' ' + 'تومان'}</Text>
                    <Text style={{

                        fontFamily: 'B Koodak',
                        marginTop: 5,
                        textAlign: 'center',
                        color: "#22313F"
                    }}>{'مجموع' + ' ' + 'مبلغ:'}</Text>


                </View>
                <View>

                    <View >
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                color: "#22313F",
                                width: '50%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'تاریخ:' + ' ' + rrr}</Text>
                            <Text style={{
                                color: "#22313F",
                                width: '50%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'شماره فاکتور:' + ' ' + id.order_number}</Text>
                        </View>

                    </View>
                </View>
                <View style={{backgroundColor: '#DADFE1', flexDirection: 'row', width: '95%',marginBottom: 5,
                    marginRight: 5,
                    marginTop: 5,
                    marginLeft: 5}}>
                    <Text style={{

                        fontSize: 13,marginTop:5,
                        textAlign: 'center',
                        fontFamily: 'B Koodak'
                    }}>{'وضعیت '}</Text>



                            <Text style={{
                                marginLeft:10,
                                fontFamily: 'B Koodak',
                                textAlign: 'center',
                                paddingRight: 20,marginTop:5
                                ,fontSize:13
                            }}>{'تعداد'}</Text>
                            <Text style={{
                                width: '30%',
                                fontFamily: 'B Koodak',
                                textAlign: 'center',
                                paddingRight: 20,marginTop:5
                                ,fontSize:13,
                            }}>{'قیمت '}</Text>
                            <Text style={{
                                width: '20%',
                                marginRight: 20,marginTop:5,
                                fontFamily: 'B Koodak',fontSize:13,textAlign:'center'
                            }}>{'تامین کننده'}</Text>
                            <Text style={{width:'20%',textAlign:'center',fontFamily:'B Koodak',fontSize:13,
                                alignItems: 'center', margin: 10, color: '#34495E',marginBottom:5,marginTop:5,
                            }}>{'محصول'}</Text>



                </View>
            </View>


        )
    }
    shest(uiui) {
        let pp={name:uiui.order_name};
        console.log(uiui.order_name,'djfhdsjfhdj');
        fetch('http://visitou.ir/api/pickproduct.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response) => response.json())
            .then((responseJson) => {
                // AsyncStorage.setItem('offerList', JSON.stringify(responseJson));
                console.log(responseJson,'alalalalal4');
                AsyncStorage.setItem('product',JSON.stringify(responseJson[0]));
                console.log(responseJson[0],'qwerty');

                    Actions.details({ title: responseJson.product_name })


            });
        // AsyncStorage.setItem('product',JSON.stringify(uiui));
        // console.log(uiui,'qwerty');
        // return(
        //     Actions.details({ title: uiui.product_name })
        //
        // )


    }
    render() {

        let moz = [];


        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width; //full width
        console.log('mahnazmahnaz', moz);

        return (

                <Container >
                    <View style={{
                        backgroundColor: 'white',
                        flexDirection:'row',
                        width:'95%',
                        borderRadius: 10, marginTop: 10, marginBottom: 10, marginRight: 10, marginLeft: 10
                    }}>

                            <Text style={{fontSize: 19,fontFamily:'B Koodak',textAlign:"center",width:'50%'}}>{this.state.info[0].phone}</Text>
                        <Text style={{fontFamily:'B Koodak',fontSize: 23,textAlign:'center',width:'50%'}}>{this.state.info[0].name+' '+this.state.info[0].family}</Text>



                    </View>

                    <Content>
                    <ListView
                        style={{width: width, backgroundColor: '#00000000'}}
                        dataSource={this.state.dataSource}
                        renderSectionHeader={(section,sectionID) =>
                            this.hello(section,sectionID)
                        }
                        initialListSize={4}
                        onEndReached={console.log('finishid')}
                        renderRow={(rowData, rowID, sectionID) =>

                            <TouchableHighlight
                                style={{
                                    backgroundColor: '#00000000',
                                    width: width
                                }}
                                underlayColor={'white'}
                            onPress={()=>this.shest(rowData)}>


                                        <View style={{
                                            marginBottom: 5,
                                            marginRight: 5,
                                            marginTop: 5,
                                            marginLeft: 5,
                                            borderRadius: 7,
                                            backgroundColor: 'white',
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems:'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            {this.situ(rowData)}









                                            <Text style={{ marginLeft:10,
                                                fontFamily: 'B Koodak',
                                                textAlign: 'center',
                                                paddingRight: 20,marginTop:5
                                                ,
                                                color: '#19B5FE'
                                            }}>
                                                {rowData.order_mount}

                                            </Text>

                                            <Text style={{width:'30%',textAlign:'center',
                                                marginBottom: 10,fontFamily:'B Koodak', marginTop: 10, color: '#1F3A93',

                                            }}>
                                                {rowData.order_price * rowData.order_mount + ' '+'تومان'}
                                            </Text>
                                            <Text style={{width:'20%',textAlign:'center',fontFamily:'B Koodak',
                                                alignItems: 'center', margin: 10, color: '#34495E',marginBottom:5,marginTop:5,
                                            }}>
                                                {rowData.provider_details}

                                            </Text>

                                                <Text style={{width:'20%',textAlign:'right',fontFamily:'B Koodak',
                                                    alignItems: 'center', marginRight: 10, color: '#34495E'
                                                }}>
                                                    {rowData.order_name}

                                                </Text>




                                        </View>

                            </TouchableHighlight>






                        }/>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <TouchableHighlight
                                style={{margin:10}}
                                onPress={()=>this.state.totalList.length>=10 ? this.loadMore() : null}
                                disabled={this.state.totalList.length<=10}
                                underlayColor='white'>
                                <Text style={{color:'#22A7F0',fontFamily: 'B Koodak'}}>{this.state.totalList.length>=10 ? 'قدیمی تر':''}</Text>
                            </TouchableHighlight>
                        </View>
                    </Content>

                </Container>

        );

    }
}

module.export = OrderHistory;