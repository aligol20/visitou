import React, {Component} from 'react';
import {Text, AsyncStorage} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import {Actions} from 'react-native-router-flux';
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import {Footer, FooterTab, Badge, Button, View, Icon} from 'native-base';
let badgNumber;

export default class AppFooter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            koooni: 0,
            activeTabName: 'feed',
            nameUser: 'حساب ',
            isSignIn: '',
            fe: '#fdb913',
            ca: '#FDE3A7',
            se: '#FDE3A7',
            cgy: '#FDE3A7',
            ac: '#FDE3A7',
            l:'kfjf',


        }
    }

    componentDidMount() {
        
        // this.justForFun();
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
    }

    tabAction(tab) {

        switch (tab) {
            case 'feed':
                this.setState({
                    fe: '#fdb913',
                    ca: '#FDE3A7',
                    se: '#FDE3A7',
                    cgy: '#FDE3A7',
                    ac: '#FDE3A7',
                });
                console.log(Actions.state.index, 'manman');
                // this.justForFun();

                Actions.feed();
                break;
            case 'cart':
                this.setState({
                    fe: '#FDE3A7',
                    ca: '#fdb913',
                    se: '#FDE3A7',
                    cgy: '#FDE3A7',
                    ac: '#FDE3A7',
                });
                Actions.cart();
                break;
            case 'search':
                this.setState({
                    fe: '#FDE3A7',
                    ca: '#FDE3A7',
                    se: '#fdb913',
                    cgy: '#FDE3A7',
                    ac: '#FDE3A7',
                });
                Actions.search();
                break;
            case 'category':
                this.setState({
                    fe: '#FDE3A7',
                    ca: '#FDE3A7',
                    se: '#FDE3A7',
                    cgy: '#fdb913',
                    ac: '#FDE3A7',
                });
                Actions.header();
                break;
            case 'account':
                this.setState({
                    fe: '#FDE3A7',
                    ca: '#FDE3A7',
                    se: '#FDE3A7',
                    cgy: '#FDE3A7',
                    ac: '#fdb913',
                });
                Actions.account();
                break;
            case 'orderHistory':
                this.setState({
                    fe: '#FDE3A7',
                    ca: '#FDE3A7',
                    se: '#FDE3A7',
                    cgy: '#FDE3A7',
                    ac: '#fdb913',
                });
                Actions.orderHistory();
                break;
            case 'empty':
                this.setState({
                    fe: '#FDE3A7',
                    ca: '#fdb913',
                    se: '#FDE3A7',
                    cgy: '#FDE3A7',
                    ac: '#FDE3A7',
                });
                console.log('salamalmasalma');
                Actions.empty();
                break;
        }

    }

    whatToDo() {
        // AsyncStorage.getItem('userInfo',(err,store)=>{
        //     // console.log(JSON.parse(store)[0].name,'mahnazparivash8');
        //     // let pop=JSON.parse(store)[0].phonenumber;
        //     if(JSON.parse(store)[0].phonenumber !== null){
        //         Actions.orderHistory();
        //     }else {
        //         Actions.account();
        //     }
        //     // Actions.account();
        //
        //
        //
        // });
        try {
            AsyncStorage.getItem('userInfo', (err, store) => {
                console.log(store, 'mahnazparivash19');
                if (store !== null) {
                    console.log(store, 'mahnazparivash17');

                    Actions.me()
                } else {
                    console.log(store, 'mahnazparivash18');

                    Actions.account()


                }
            });

        } catch (error) {
            // Error retrieving data
        }

    }
    isCartEmpty() {

        try {
            AsyncStorage.getAllKeys((err, keys) => {

                AsyncStorage.multiGet(keys, (err, stores) => {
                    //const ghgh=JSON.parse(stores);
                    stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];
                        let listArray = JSON.parse(value);
                        console.log(listArray, 'aqaqaqaqaq');

                        if (key.includes('order')) {
                                console.log(store, 'aqaqaqaqaq');
                                this.tabAction('cart');
                            } else {
                                console.log(store, 'zxzxzxzxzxzx');
                                this.tabAction('empty');

                            }

                    });
                });

            });


        } catch (error) {
            // Error retrieving data
        }

    }



    render() {
        let gooz = [];

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
                            console.log('lkklkllll',result[i]);

                            gooz.push(result[i]);

                        }


                    });
                    console.log(gooz,'dfdfdfdf333');
                // console.log(gooz,'dfdfdfdf');
                this.setState({koooni: gooz.length});
                })


            badgNumber = this.state.koooni;


        });
        let pp=Actions.currentScene;
                switch (pp){
                    case 'feed':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => Actions.cart()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => Actions.search()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => Actions.feed()}>
                                    <Icon5 color={'#fdb913'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'cart':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>


                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#fdb913'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'address':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#fdb913'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#1c375c', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>

                        </Footer>);
                        break;
                    case 'final':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#fdb913'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#fdb913'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'account':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#fdb913'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'infoEdit':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#fdb913'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'loginMain':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>


                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#fdb913'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'register':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>


                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#fdb913'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'orderHistory':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>


                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#fdb913'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'me':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#fdb913'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'details':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#fdb913'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'category':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button


                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#fdb913'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'products':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>



                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#fdb913'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'search':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>

                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#fdb913'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'intro':
                        return (
                            <View >

                        </View>);
                        break;
                    case 'city':
                        return (
                            <View >

                            </View>);
                        break;
                    case 'header':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#fdb913'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;
                    case 'sub_cat':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#1c375c'}}>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#FDE3A7'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سبد خرید</Text>
                                </Button>
                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                                <Button

                                    onPress={() => Actions.header()}>
                                    <Icon3 color={'#fdb913'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#FDE3A7'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#FDE3A7'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                                </Button>
                            </FooterTab>
                        </Footer>);
                        break;



                }
        }
    }

    module.export = AppFooter;
