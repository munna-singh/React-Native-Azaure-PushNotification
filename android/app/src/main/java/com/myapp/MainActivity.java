package com.myapp;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import com.azure.reactnative.notificationhub.*;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "myapp";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                String FCMToken = NotificationHubUtil.getInstance().getFCMToken(getApplicationContext());
                String azureRegId = NotificationHubUtil.getInstance().getRegistrationID(getApplicationContext());
                Intent intent = getIntent();
                 Bundle initialProps = new Bundle();
                 Bundle notificationBundle = intent.getBundleExtra("notification");
                initialProps.putString("FCMtoken",FCMToken);
                initialProps.putString("azureRegId",azureRegId);

                 if(notificationBundle!=null){
                   //initialProps.putBundle("notificationBundle",initialProps);
                     initialProps.putString("b","bundle not null");
                     initialProps.putString("uri",intent.toUri(0));
                     initialProps.putInt("count", notificationBundle.keySet().size());
                     //initialProps.putBundle("notificationBundle",initialProps);
                     String KeyVal = "";
                     initialProps.putAll(notificationBundle);

                 }
                 else{
                     initialProps.putString("a","bundle null");
                 }
                // initialProps.putString("SOME_VARIABLE_1", "heloo");
                // initialProps.putString("SOME_VARIABLE_2", "some variable 2 value");
                //Bundle initialProps = myIntent.getExtras();
               // initialProps.put*(info);
               
                return initialProps;
            }
        };
    }
}
