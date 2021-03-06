package com.visitou;

import android.app.Application;
import android.os.Bundle;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import com.facebook.react.ReactApplication;
import com.beefe.picker.PickerViewPackage;
import com.wix.reactnativenotifications.RNNotificationsPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.evollu.react.fcm.FIRMessagingPackage;

import com.rnfs.RNFSPackage;

import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PickerViewPackage(),
            new RNFirebasePackage(),
            new RNFetchBlobPackage(),
            new FastImageViewPackage(),
            new FIRMessagingPackage(),
            new RNFSPackage(),
            new RNExitAppPackage(),
            new VectorIconsPackage()



      );
    }

    @Override
    protected String getJSMainModuleName() {

      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {

    return mReactNativeHost;
  }

  @Override
  public void onCreate() {

    super.onCreate();
    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
