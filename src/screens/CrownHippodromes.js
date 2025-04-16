import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  Text,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const CrownHippodromes = ({navigation, route}) => {
  const [product, setProduct] = useState(route.params?.product);
  const [timeStampUserId, setTimeStampUserId] = useState(
    route.params?.timeStampUserId,
  );
  //console.log('product========>', product);
  //Alert.alert(product);
  ///////////

  const INITIAL_URL = `https://fabulous-dominant-exultation.space/`;
  const URL_IDENTIFAIRE = `qTY7B3xm`;

  const refWebview = useRef(null);

  const customSchemes = [
    'mailto:',
    'itms-appss://',
    'https://m.facebook.com/',
    'https://www.facebook.com/',
    'https://www.instagram.com/',
    'https://twitter.com/',
    'https://www.whatsapp.com/',
    'https://t.me/',
    'fb://',
    'bncmobile://',
    'scotiabank',
    'bmoolbb',
    'cibcbanking',
    'conexus://',
    'connexion',
    'rbcmobile',
    'pcfbanking',
    'tdct',
    'blank',
    'wise',
    'https://app.rastpay.com/payment/',
    'googlepay://',
    'applepay://',
    'skrill',
    'nl.abnamro.deeplink.psd2.consent://',
    'nl-snsbank-sign://',
    'nl-asnbank-sign://',
    'triodosmobilebanking',
    'revolut',
  ];

  //**івент push_subscribe
  useEffect(() => {
    const sendPushSubscribeEvent = async () => {
      const pushSubscribeStatus = await AsyncStorage.getItem(
        'pushSubscribeStatus',
      );

      // Відправляємо івент лише, якщо його ще не відправляли
      if (!pushSubscribeStatus && route.params?.responseToPushPermition) {
        fetch(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_subscribe&jthrhg=${timeStampUserId}`,
        );
        //console.log('івент push_subscribe !!!');
        await AsyncStorage.setItem('pushSubscribeStatus', 'sent');
      }
    };

    setTimeout(() => {
      sendPushSubscribeEvent();
    }, 500);
  }, []);

  //**івент webview_open
  const hasWebViewOpenEventSent = useRef(false); // Використовуємо useRef для збереження стану між рендерами

  useEffect(() => {
    if (!hasWebViewOpenEventSent.current) {
      hasWebViewOpenEventSent.current = true; // Встановлюємо, що івент вже відправлений
      fetch(
        `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=webview_open&jthrhg=${timeStampUserId}`,
      );
      //console.log('Івент webview_open відправлено!');
    }
  }, []);

  // кастомний юзерагент  https://dou.ua
  const deviceInfo = {
    deviceBrand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId(),
    deviceModel: DeviceInfo.getModel(),
    deviceSystemName: DeviceInfo.getSystemName(),
    deviceSystemVersion: DeviceInfo.getSystemVersion(),
  };

  //console.log('My product Url ==>', product);

  const userAgent = `Mozilla/5.0 (Linux; Android ${deviceInfo.deviceSystemVersion}; ${deviceInfo.deviceModel})  Chrome/91.0.4472.124 Mobile `;
  const customUserAgent = `${userAgent} MyAndroidApp/1.0`;
  //console.log('customUserAgent ==>', customUserAgent);
  //const customUserAgent =
  //  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  useEffect(() => {
    WebView.userAgent = customUserAgent;
  }, []);
  ///////////////////////////

  const [redirectUrl, setRedirectUrl] = useState(product);
  const [checkNineUrl, setCheckNineUrl] = useState();
  //console.log('checkNineUrl====>', checkNineUrl);

  const handleShouldStartLoad = event => {
    const {url} = event;
    ////console.log('Should Start Load: ', url);
    return true;
  };

  const handleNavigationStateChange = navState => {
    const {url} = navState;
    const {mainDocumentURL} = navState;
    console.log('NavigationState: ', navState);
    if (
      url.includes(
        'https://api.paymentiq.io/paymentiq/api/piq-redirect-assistance',
      )
    ) {
      setRedirectUrl(product);
    } else if (url.includes('https://ninecasino')) {
      setCheckNineUrl(product);
    } else if (
      url.includes('https://interac.express-connect.com/cpi?transaction=')
    ) {
      setRedirectUrl(product);
    } else if (url.includes('about:blank') && checkNineUrl === product) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      console.log('xxxx');
    } else if (
      url.includes('https://app.corzapay.com/payment/') &&
      checkNineUrl === product
    ) {
      Linking.openURL(
        `https://payment.paydmeth.com/en/cointy-white/payment/c13f7613-8ae7-48e0-8915-aa8187dd94ed`,
      );
      console.log('WWWWW');
    } //else if (
    //url.includes('neteller') ||
    //url.includes('rapidtransfer') ||
    //(url.includes('paysafecard') && checkNineUrl === product)
    //  ) {
    //console.log('WWWWW');
    ////Linking.openURL(url);
    ////return false;
    //return; // Дозволити навігацію для цих URL-адрес
    //  }
    else if (
      mainDocumentURL === 'https://winspirit.best/' ||
      url.includes('https://malinacasino21.com') ||
      url.includes('ninecasino') ||
      url.includes('https://winspirit')
    ) {
      // Умова для ввімкнення/вимкнення onOpenWindow
      setEnableOnOpenWindow(true);
    } else {
      setEnableOnOpenWindow(false);
    }
  };

  const onShouldStartLoadWithRequest = event => {
    const {url} = event;
    console.log('onShouldStartLoadWithRequest========> ', event);

    const canOpen = Linking.canOpenURL(url);

    if (url.startsWith('mailto:')) {
      Linking.openURL(url);
      return false;
    } else if (url.startsWith('itms-appss://')) {
      Linking.openURL(url);
      return false;
    } else if (
      url.includes('bitcoin') ||
      url.includes('litecoin') ||
      url.includes('dogecoin') ||
      url.includes('tether') ||
      url.includes('ethereum') ||
      url.includes('bitcoincash')
    ) {
      return false;
    } else if (
      url.startsWith('https://m.facebook.com/') ||
      url.startsWith('https://www.facebook.com/') ||
      url.startsWith('https://www.instagram.com/') ||
      url.startsWith('https://twitter.com/') ||
      url.startsWith('https://www.whatsapp.com/') ||
      url.startsWith('https://t.me/') ||
      url.includes('https://web.telegram') //||
      //url.includes('https://gate.mrbl.cc/payments/process/')
    ) {
      Linking.openURL(url);
      return false; // && checkNineUrl === product
    } else if (url.includes('https://gatewaynpay.com/gateway/')) {
      console.log('Hello!!!!!!!!!!!!!!!!!!!!!');
      Linking.openURL(url);
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url.includes('applepay://') || url.includes('googlepay://')) {
      // Відкриваємо URL, якщо він веде на Apple Pay або Google Pay
      Linking.openURL(url);
      return false;
    } else if (
      url.includes('app.rastpay.com/payment') &&
      checkNineUrl === product
    ) {
      //console.log('Wise!');
      Linking.openURL(
        `https://openbanking.paysolo.net/session/38174d728a-730e664b72498a6f-GjwWW08AOP`,
      );
      return false;
    } else if (url === 'https://jokabet.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://ninecasino.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://bdmbet.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://winspirit.app/?identifier=') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url.includes('https://rocketplay.com/api/payments')) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url.includes('secure.livechatinc.com/customer/action/')) {
      //refWebview?.current?.goBack();
      return false;
    } else if (url.startsWith('bncmobile://')) {
      console.log('Перехоплений URL:', url);
      //Alert.alert(`Wait a few seconds, the loading process is underway...`);
      // Ви можете використати Linking для обробки
      Linking.openURL(url);

      return false; // Забороняємо WebView завантажувати цей URL
    } else if (url.startsWith('cibcbanking://')) {
      console.log('Перехоплений URL:', url);
      //Alert.alert(`Wait a few seconds, the loading process is underway...`);

      Linking.openURL(url);

      return false; // Забороняємо WebView завантажувати цей URL
    } else if (url.includes('monzo')) {
      console.log('Перехоплений URL:', url);
      Linking.openURL(url);
      return false; // Забороняємо WebView завантажувати цей URL
    } else if (url.startsWith('intent://rbcbanking')) {
      console.log('RBC URL detected:', url);
      // Extract the scheme and package from the intent URL
      const scheme = 'rbcbanking';
      const packageName = 'com.rbc.mobile.android';
      try {
        // Try to open with custom scheme first
        console.log('scheme', `${scheme}://${url.split('?')[1].split('#')[0]}`);
        Linking.openURL(`${scheme}://${url.split('?')[1].split('#')[0]}`).catch(
          () => {
            // If custom scheme fails, try using intent
            Linking.sendIntent('android.intent.action.VIEW', [
              {key: 'package_name', value: packageName},
            ]).catch(error => {
              console.error('Error opening RBC app:', error);
              Alert.alert(
                'App Not Found',
                'The RBC banking app is not installed.',
                [{text: 'OK'}],
              );
            });
          },
        );
      } catch (error) {
        console.error('Error parsing RBC URL:', error);
      }
      return false;
    } else if (url.startsWith('scotiabank://')) {
      console.log('Перехоплений URL:', url);
      //Alert.alert(`Wait a few seconds, the loading process is underway...`);

      Linking.openURL(url);

      return false; // Забороняємо WebView завантажувати цей URL
    } else if (url.startsWith('bmoolbb://')) {
      console.log('Перехоплений URL:', url);
      //Alert.alert(`Wait a few seconds, the loading process is underway...`);

      Linking.openURL(url);

      return false; // Забороняємо WebView завантажувати цей URL
    } else if (url.startsWith('tdct://')) {
      console.log('Перехоплений URLLLL:', url);
      //Alert.alert(`Wait a few seconds, the loading process is underway...`);

      Linking.openURL(url);

      return false; // Забороняємо WebView завантажувати цей URL
    } else if (url.includes('xxxx')) {
      console.log('Перехоплений URL:', url);
      Linking.canOpenURL(url).then(canOpen => {
        if (!canOpen) {
          //navigation.navigate('ChildWebViewApplication', {data: url});
        }
      });

      //Alert.alert(`Wait a few seconds, the loading process is underway...`);
      //navigation.navigate('ChildWebViewApplication', {data: url});

      //refWebview.current.injectJavaScript(
      //  `window.location.href = 'https://www.td.com'`,
      //); //https://etransfer.interac.ca/redirectFromShortcutToFi.do?rID=CA1MRdmaG5HS&fiID=CA000004&lang=en

      return false; // Забороняємо WebView завантажувати цей URL
    } else if (url.includes('revolut')) {
      Linking.openURL('revolut://');

      return false; // Забороняємо WebView завантажувати цей URL
    } else if (
      url.includes(
        'revolut' ||
          'monzo' ||
          'rabobank' ||
          'myaccount.ing.com' ||
          'abnamro' ||
          'natwest' ||
          'santander' ||
          'lloyds' ||
          'barclays' ||
          'hsbc' ||
          'chase' ||
          'tsb' ||
          'halifax' ||
          'wise' ||
          'royalbank' ||
          'nationwide' ||
          'intent://rbcbanking' ||
          'cibcbanking://' ||
          'scotiabank://' ||
          'bmoolbb://' ||
          'tdct://',
      )
    ) {
      Linking.openURL(url);

      return false; // Забороняємо WebView завантажувати цей URL
    } else {
      const scheme = url.split(':')[0];
      if (customSchemes.includes(scheme)) {
        Linking.canOpenURL(url)
          .then(canOpen => {
            if (canOpen) {
              Linking.openURL(url).catch(error => {
                console.warn(`Unable to open URL: ${url}`, error);
              });
            } else {
              Alert.alert(`The ${scheme} app is not installed on your device.`);
            }
          })
          .catch(error => {
            console.warn(`Error checking if URL can be opened: ${url}`, error);
          });
        return false;
      }
    }

    return true;
  };

  // Хендлер для кнопки "Назад" андроід
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (refWebview.current && refWebview.current.goBack) {
          refWebview.current.goBack();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  ////////////////////////////
  const [enableOnOpenWindow, setEnableOnOpenWindow] = useState(false); // Стан для управління onOpenWindow

  const onOpenWindow = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    const {targetUrl} = nativeEvent;
    console.log('nativeEvent', nativeEvent);
    if (targetUrl.includes('pay.funid.com')) {
      Linking.openURL(targetUrl);

      return false;
    }
  };

  ////////////////////////////
  const [isLoading, setIsLoading] = useState(true);
  const [skipFirstLoadEnd, setSkipFirstLoadEnd] = useState(true);
  const [isLoadingInOnError, setIsLoadingInOnError] = useState(false);

  const handleLoadingStart = () => {
    setIsLoading(true);
  };

  const handleLoadingEnd = () => {
    if (skipFirstLoadEnd) {
      setSkipFirstLoadEnd(false); // Пропускаємо перше завантаження
    } else {
      setIsLoading(false); // Ховаємо лоадер
    }
  };

  const LoadingIndicatorView = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#191d24', // затемнення
        }}>
        <ActivityIndicator size="large" color="#40b8ff" />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191d24'}}>
      {isLoading && <LoadingIndicatorView />}

      <WebView
        originWhitelist={[
          '*',
          'http://*',
          'https://*',
          'intent://*',
          'tel:*',
          'mailto:*',
        ]}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={handleLoadingStart} // Викликається при початку завантаження
        onLoadEnd={handleLoadingEnd} // Викликається при завершенні завантаження
        source={{
          uri: product,
        }}
        onOpenWindow={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          const {targetUrl} = nativeEvent;
          console.log('targetUrl======????>>>>>', targetUrl);
        }}
        // onOpenWindow тільки якщо enableOnOpenWindow === true
        //{...(enableOnOpenWindow ? {onOpenWindow: onOpenWindow} : {})}
        //onError={syntheticEvent => {
        //  const {nativeEvent} = syntheticEvent;
        //  const url = nativeEvent.url;
        //  console.warn('WebView error url ', nativeEvent.url);
        //  // Якщо це специфічний URL, ігноруємо помилку
        //  if (url.startsWith('bncmobile://')) {
        //    return;
        //  }
        //
        //  Alert.alert('Error', `Failed to load URL: ${url}`, [{text: 'OK'}]);
        //}}
        textZoom={100}
        thirdPartyCookiesEnabled={true}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        style={{flex: 1}}
        ref={refWebview}
        //userAgent={userAgent}
        //userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        startInLoadingState={true}
        renderLoading={() => <LoadingIndicatorView />}
        mixedContentMode="always"
        //setSupportMultipleWindows={true}
        onMessage={event => {
          console.log('WebView Message:', event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
};

export default CrownHippodromes;
