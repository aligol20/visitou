
import {Platform,AppState,StatusBar,PushNotificationIOS,StyleSheet, AsyncStorage,NetInfo,Alert,ActivityIndicator,Image,Text, View} from 'react-native';
import React, {Component} from 'react';
import {Container, Button} from 'native-base';
import AppFooter from './src/components/appFooter.js';
import AppBodyData from './src/components/appBodyData';
import Cart from './src/components/cart';
import {Router, Scene} from 'react-native-router-flux';
import Search from './src/components/pages/search';
import Address from './src/components/address';
import Final from './src/components/final';
import DetailsScreen from './src/components/detailsBody';
import Category from './src/components/Category';
import Account from './src/components/appaccount';
import ProductList from './src/components/productList';
import LoginMain from './src/components/loginMain';
import Register from './src/components/register';
import OrderHistory from './src/components/orderHistory'
import Intro from './src/components/intro';
import Header_cat from './src/components/Header_cat';
import sub_cat from './src/components/sub_cat';
import EdittingInfo from './src/components/edittingInfo';
import {Actions} from 'react-native-router-flux';
import CitySelecting from './src/components/citySelecting';
import Me from './src/components/Me';
import Pp from './src/components/pp';
// import SplashScreen from 'react-native-splash-screen'
import RNExitApp from 'react-native-exit-app-no-history';
import Toast from 'react-native-simple-toast';
let catTi = 0;
const gooz = 7;
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';


// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
        //this is a local notification
    }
    if(notif.opened_from_tray){
        //iOS: app is open/resumed because user clicked banner
        //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();

    if(Platform.OS ==='ios'){
        if (notif._actionIdentifier === 'com.myapp.MyCategory.Confirm') {
            // handle notification action here
            // the text from user is in notif._userText if type of the action is NotificationActionType.TextInput
        }
        //optional
        //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
        //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //notif._notificationType is available for iOS platfrom
        switch(notif._notificationType){
            case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
            case NotificationType.NotificationResponse:
                notif.finish();
                break;
            case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
        }
    }
});
FCM.on(FCMEvent.RefreshToken, (token) => {
    console.log(token)
    // fcm token may not be available on first load, catch it here
});
export default class App extends Component<{}> {

    constructor(props) {

        super(props);
        this.state = {
            userTitle: '',
            catTi: '',
            intro: true,
            name: 'intro',
            component: Intro,
            koon: 5,
            offer: false,
            shir: 1,
            khar:true,
            connection:false,
        };
        AsyncStorage.getItem('wherewhere',(err,store)=>{
            console.log(store,'alalalalal');
            if (store !== null) {
                this.setState({shir:3});
                console.log(store,'cccccccccc');

                NetInfo.isConnected.fetch().then(isConnected => {
                    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
                });
                console.log(store,'alalalalal5');

                // AsyncStorage.removeItem('allProducts');
                // AsyncStorage.removeItem('offerList');
                let pp = {city: JSON.parse(store)};

                console.log(store,'alalalalal5');

                fetch('http://visitou.ir/api/readProducts_offer_new.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pp)
                }).then((response) => response.json())
                    .then((responseJson) => {
                        AsyncStorage.setItem('offerList', JSON.stringify(responseJson));
                        console.log(store,'alalalalal4');
                        console.log(pp,'alalalalal47');
                        fetch('http://visitou.ir/api/readProducts_new.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(pp)
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                AsyncStorage.removeItem('allProducts');
                                AsyncStorage.setItem('allProducts', JSON.stringify(responseJson));
                                console.log(responseJson,'dldldldldl')
                            })
                    });






//         NetInfo.isConnected.removeEventListener(
//             'connectionChange',
//             handleFirstConnectivityChange
//         );
//
//     NetInfo.isConnected.addEventListener(
//     'connectionChange',
//     handleFirstConnectivityChange
// );

} else {
                this.setState({shir:7});
            }

        });
        this.fetchJsons();

        // if(this.state.connection){
        //     this.fetchJsons()
        // }else {
        //  RNExitApp.exitApp();
        //
        // }


    }

    componentDidMount(){
        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));

        FCM.getFCMToken().then(token => {
            console.log(token,'aqwsaqw')
            // store fcm token in your server
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff
        });

        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
            console.log(notif,'cbcbccb')
        });


        AppState.addEventListener('change',this.handleAppStateChange);
    }
    componentWillMount() {
        AppState.removeEventListener('change',this.handleAppStateChange);
        // this.notificationListener.remove();

        // AsyncStorage.getItem('introSeen', (err, store) => {
        //     console.log(store, 'ridim...2');




        // });
    }
    handleAppStateChange(appState){
        if(appState=== 'background'){
            // PushNotification.localNotificationSchedule({
            //     message: "My Notification Message", // (required)
            //     date: new Date(Date.now() + (10 * 1000)) // in 60 secs
            // });
        }

    }

    otherMethods(){

        FCM.subscribeToTopic('/topics/foo-bar');
        FCM.unsubscribeFromTopic('/topics/foo-bar');
        FCM.presentLocalNotification({
            id: "UNIQ_ID_STRING",                               // (optional for instant notification)
            title: "My Notification Title",                     // as FCM payload
            body: "My Notification Message",                    // as FCM payload (required)
            sound: "default",                                   // as FCM payload
            priority: "high",                                   // as FCM payload
            click_action: "com.myapp.MyCategory",               // as FCM payload - this is used as category identifier on iOS.
            badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
            number: 10,                                         // Android only
            ticker: "My Notification Ticker",                   // Android only
            auto_cancel: true,                                  // Android only (default true)
            large_icon: "ic_launcher",                           // Android only
            icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
            big_text: "Show when notification is expanded",     // Android only
            sub_text: "This is a subText",                      // Android only
            color: "red",                                       // Android only
            vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
            wake_screen: true,                                  // Android only, wake up screen when notification arrives
            group: "group",                                     // Android only
            picture: "https://google.png",                      // Android only bigPicture style
            ongoing: true,                                      // Android only
            my_custom_data:'my_custom_field_value',             // extra data you want to throw
            lights: true,                                       // Android only, LED blinking (default false)
            show_in_foreground                                  // notification when app is in foreground (local & remote)
        });

        FCM.scheduleLocalNotification({
            fire_date: new Date().getTime(),      //RN's converter is used, accept epoch time and whatever that converter supports
            id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
            body: "from future past",
            repeat_interval: "week" //day, hour
        })

        FCM.getScheduledLocalNotifications().then(notif=>console.log(notif));

        //these clears notification from notification center/tray
        FCM.removeAllDeliveredNotifications()
        FCM.removeDeliveredNotification("UNIQ_ID_STRING")

        //these removes future local notifications
        FCM.cancelAllLocalNotifications()
        FCM.cancelLocalNotification("UNIQ_ID_STRING")

        FCM.setBadgeNumber(1);                                       // iOS and supporting android.
        FCM.getBadgeNumber().then(number=>console.log(number));     // iOS and supporting android.
        FCM.send('984XXXXXXXXX', {
            my_custom_data_1: 'my_custom_field_value_1',
            my_custom_data_2: 'my_custom_field_value_2'
        });

        // Call this somewhere at initialization to register types of your actionable notifications. See https://goo.gl/UanU9p.
        FCM.setNotificationCategories([
            {
                id: 'com.myapp.MyCategory',
                actions: [
                    {
                        type: NotificationActionType.Default, // or NotificationActionType.TextInput
                        id: 'com.myapp.MyCategory.Confirm',
                        title: 'Confirm', // Use with NotificationActionType.Default
                        textInputButtonTitle: 'Send', // Use with NotificationActionType.TextInput
                        textInputPlaceholder: 'Message', // Use with NotificationActionType.TextInput
                        // Available options: NotificationActionOption.None, NotificationActionOption.AuthenticationRequired, NotificationActionOption.Destructive and NotificationActionOption.Foreground.
                        options: NotificationActionOption.AuthenticationRequired, // single or array
                    },
                ],
                intentIdentifiers: [],
                // Available options: NotificationCategoryOption.None, NotificationCategoryOption.CustomDismissAction and NotificationCategoryOption.AllowInCarPlay.
                // On iOS >= 11.0 there is also NotificationCategoryOption.PreviewsShowTitle and NotificationCategoryOption.PreviewsShowSubtitle.
                options: [NotificationCategoryOption.CustomDismissAction, NotificationCategoryOption.PreviewsShowTitle], // single or array
            },
        ]);

        FCM.deleteInstanceId()
            .then( () => {
                //Deleted instance id successfully
                //This will reset Instance ID and revokes all tokens.
            })
            .catch(error => {
                //Error while deleting instance id
            });
    }
    fetchJsons() {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
        function handleFirstConnectivityChange(isConnected) {

            console.log('Then,shoombool is ' + (isConnected ? 'online' : 'offline'));
            // this.setState({connection:true});
            if (isConnected){
                try {

                    // Promise.all() lets us coalesce multiple promises into a single super-promise


                    fetch('http://visitou.ir/api/readCity.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('cityList', JSON.stringify(responseJson));

                            // console.log(responseJson,'hfjjghjgjhgjfjf')
                            fetch('http://visitou.ir/api/readCategory.php')
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    AsyncStorage.setItem('categoryList', JSON.stringify(responseJson));

                                    console.log(responseJson,'categoryList')

                                    fetch('http://visitou.ir/api/header.php')
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            AsyncStorage.setItem('header', JSON.stringify(responseJson));

                                            console.log(responseJson,'header')
                                            fetch('http://visitou.ir/api/sub_cat.php')
                                                .then((response) => response.json())
                                                .then((responseJson) => {
                                                    AsyncStorage.setItem('sub_cat', JSON.stringify(responseJson));

                                                    console.log(responseJson,'sub_cat')
                                                    fetch('http://visitou.ir/api/readLocals.php')
                                                        .then((response) => response.json())
                                                        .then((responseJson) => {
                                                            AsyncStorage.setItem('localsList', JSON.stringify(responseJson));

                                                            console.log(responseJson,'localsList')
                                                            fetch('http://visitou.ir/api/read_delivery_time.php')
                                                                .then((response) => response.json())
                                                                .then((responseJson) => {
                                                                    AsyncStorage.setItem('deliveryTimes', JSON.stringify(responseJson));

                                                                    console.log(responseJson,'deliveryTimes')

                                                                    fetch('http://visitou.ir/api/read_delivery_text.php')
                                                                        .then((response) => response.json())
                                                                        .then((responseJson) => {
                                                                            AsyncStorage.setItem('deliveryText', JSON.stringify(responseJson));

                                                                            console.log(responseJson,'deliveryText')
                                                                            fetch('http://visitou.ir/api/get_dialogs.php')
                                                                                .then((response) => response.json())
                                                                                .then((responseJson) => {
                                                                                    AsyncStorage.setItem('dialogs', JSON.stringify(responseJson));
                                                                                    console.log(responseJson,'dialogs')
                                                                                    const ghoo = responseJson.filter(x => x.dialog_type.includes("firstdialog"));
                                                                                    fetch('http://visitou.ir/api/checkupdate.php')
                                                                                        .then((response) => response.json())
                                                                                        .then((responseJson) => {
                                                                                            AsyncStorage.setItem('checkUpdates', JSON.stringify(responseJson));

                                                                                            console.log(responseJson,'checkUpdates')
                                                                                            fetch('http://visitou.ir/api/read_delivery_costs.php')
                                                                                                .then((response) => response.json())
                                                                                                .then((responseJson) => {
                                                                                                    AsyncStorage.setItem('deliveryCost', JSON.stringify(responseJson));
                                                                                                    // SplashScreen.hide();


                                                                                                });
                                                                                        });

                                                                                });
                                                                        });
                                                                });
                                                        });
                                                });
                                        });
                                });
                        });


                } catch (error) {
                    console.log(error, 'akhond dozd');
                }
            }else {
                RNExitApp.exitApp();



            }


            NetInfo.isConnected.removeEventListener(
                'connectionChange',
                handleFirstConnectivityChange
            );
        }
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );

        console.log('ridim...');

        // if(this.state.connection){

        // }else {
        //     Alert.alert(
        //         'پیغام',
        //         'اتصال اینترنت خود را بررسی کنید',
        //
        //         [
        //
        //             {text: 'خب', onPress: () => console.log('OK Pressed')},
        //         ],
        //         { cancelable: false }
        //     );
        //     // RNExitApp.exitApp();
        //
        //
        // }

        console.log('ridim...234');

    }



    onBackFunction() {
        console.log("mahnazparivash20");
        Actions.cart();
    }

    onBackPress = () => {
        if (Actions.currentScene === 'feed') {
            return false
        }
        Actions.pop();
        return true
    };


    render() {


        let rrr='';


        console.log( Actions.currentScene,'ridim...478');

        // console.log( frd,'ridim...437');


        if (this.state.shir === 7) {
            return (
                <Container>
                    <StatusBar backgroundColor="#055389" barStyle="light-content" />

                    <Router backAndroidHandler={this.onBackPress} >

                        <Scene   key="root" sceneStyle={{fontFamily: 'BYekan'}}  navigationBarStyle={{backgroundColor:'#1c4473'}}  titleStyle={{fontFamily: 'BYekan'}} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7">
                            <Scene  key="city" component={CitySelecting} title="انتخاب شهر" hideNavBar={true} />
                            <Scene key="intro" component={Intro} title="خانه" hideNavBar={true} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="feed" component={AppBodyData} title="خانه" hideNavBar={true} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="cart" component={Cart} title="سبد خرید" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="search" component={Search} title="جستجو" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="address" component={Address} title="ثبت آدرس"
                                   onBack={() => this.onBackFunction()} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="final" component={Final} title="تایید نهایی"  navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="details" component={DetailsScreen} title="دسته بندی " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7" hideNavBar={true}/>
                            <Scene key="category" component={Category} title="دسته بندی " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="header" component={Header_cat} title="دسته بندی " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="sub_cat" component={sub_cat} title="دسته بندی "  navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="account" component={Account} title="حساب" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="loginMain" component={LoginMain} title="ورود" hideNavBar={true} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="register" component={Register} title="ثبت نام" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="products" component={ProductList} title='محصول' navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="orderHistory" component={OrderHistory} title='سوابق خرید' navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7" />
                            <Scene key="me" component={Me} title='حساب کاربری' navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="infoEdit" component={EdittingInfo} title=' اصلاح اطلاعات' navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>


                        </Scene>
                    </Router>
                    <AppFooter/>


                </Container>
            );
        }
        if (this.state.shir === 3) {
            return (
                <Container>
                    <StatusBar backgroundColor="#055389" barStyle="light-content" />

                    <Router backAndroidHandler={this.onBackPress} >

                        <Scene   key="root"  navigationBarStyle={{backgroundColor:'#1c4473'}} backButtonTintColor='#FDE3A7'>
                            <Scene key="feed" component={AppBodyData} title="خانه"   hideNavBar={true} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="cart" component={Cart} title="سبد خرید" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="search" component={Search} title="جستجو" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="address" component={Address} title="ثبت آدرس"
                                   onBack={() => this.onBackFunction()} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="final" component={Final} title="تایید نهایی"  navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="details" component={DetailsScreen} title="دسته بندی " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"  hideNavBar={true} />
                            <Scene key="category" component={Category}  title="دسته بندی " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="header" component={Header_cat} title="دسته بندی " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="sub_cat" component={sub_cat} title="دسته بندی " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="account" component={Account} title="حساب" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="loginMain" component={LoginMain} title="ورود" hideNavBar={true} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="register" component={Register} title="ثبت نام" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="products" component={ProductList} title='محصول' navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="orderHistory" component={OrderHistory} title='سوابق خرید' navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7" />
                            <Scene key="me" component={Me} title='حساب کاربری' navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="infoEdit" component={EdittingInfo} title=' اصلاح اطلاعات' navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>




                        </Scene>
                    </Router>
                    <AppFooter/>

                </Container>
            );
        }
        else {
            return (
                <Container style={{backgroundColor:'white'}}>


                </Container>
            );
        }


    }


}
