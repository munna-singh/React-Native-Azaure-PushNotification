# Implementing push notification on Android device using Azure and Google Firebase
React Native Android Push Notification using Azure and Google Firebase

This example will show how to use Azure with React Native for implementing push notification on android device.

**Prerequisites:**
  - Android studio installed and configured [here](https://developer.android.com/studio/install.html)
  - Visual studio code. One of the brilliant editor we have now [VS Code](https://code.visualstudio.com/docs/setup/windows)
  - React native installed and configured [here](https://shift.infinite.red/getting-started-with-react-native-development-on-windows-90d85a72ae65)
  - NPM package installed and configured for push notification [here](https://github.com/CatalystCode/react-native-azurenotificationhub) or [here]https://github.com/zo0r/react-native-push-notification
  - [Firebase](https://console.firebase.google.com/) and [Azure](https://portal.azure.com) access and configured for handshaking between these two components.
  

Once all steps (mentioned above) are done, run your application to make sure that application is running without any issue. For testing of this app,
I have used Android emulator. 

## Registering app with google FCM server ##
  - Login to Firebase console and navigate to Project Overview --> Project Settings
  - Under general tab on top of the page, you can see all apps which has been created under your project.
   ![FCM Json](https://content.screencast.com/users/MunnaSingh/folders/Jing/media/b11482c2-aab5-4e09-8733-3c9e1fde8b15/2018-03-07_1204.png)
  - Click on "google-service.json" download button. This will download a json file which will be required for creating FCM token for the application.
  - Place this json file under "..\android\app\" folder
  
Build the project and reload/reinstall the app on emulator. Click on "Register" link on UI and it should go file without any error. Please note if you
are not getting any alert/exception, that means, either registration is successful or not :D. To check if registration was successful, click on 
"Unregister" link and you should not get any error message. If there is an error, try to debug the package in Android studio as described below:

**Android studio debugging:**
  - Open Android studio and navigate to "..\myapp\node_modules\react-native-azurenotificationhub" folder. It will open the project with all required files.
  - Compile the project and Android studio. If everything is fine, the build will happen successful else tryt o fix the issue.
  - Open the file ReactNativeRegistrationIntentService.java and put a break point in onHandleIntent() method.
  - Click on the option "Attach Debugger to Android Process (Which is on top right corner).
  - Select the app from list and click on OK. Please make sure that app is up and running on emulator.
  - When the app runs and hits this class, observe what is the value of "token" variable. It should not be null nor it should throw exception. If it throws exception,
    there is the issue with either Manifest file or gradle file. Have a close look into these files and make sure nothing is missed out here.
    ![Android Studio](https://content.screencast.com/users/MunnaSingh/folders/Jing/media/ee95c16a-c5d5-4dfe-a0d6-196ede50a0b8/2018-03-07_1230.png)
    
 If everything goes as planned, you should see that your application is getting registered and you are receiving FCM token and Azure registration id.
 Now try to send first notification to the registered emulator.
 
 **Push the notification message from Azure Portal**
 - Open Android studio and navigate to "..\myapp\node_modules\react-native-azurenotificationhub" folder. It will open the project with all required files.
 - Login to Azure portal and navigate to your Hub.
 - Go to bottom of the page and select "Test Send" from sub left navigation bar.
 - Selecting this will open an window which will allow you to send the notification message to the registered device.
 - fill out all required details and click on "Send" button. If everything is configured correctly, you should see a message syaing notification has been sent successfully.
      ![Azure Portal](https://content.screencast.com/users/MunnaSingh/folders/Jing/media/bd3ac3ce-78d8-45dd-ac81-576fa03bd7ff/2018-03-07_1239.png)
      ![Mobile Notification](https://content.screencast.com/users/MunnaSingh/folders/Jing/media/e24082c2-a6b8-47cf-9f34-606e997cc291/2018-03-07_1241.png)
      
That is it. Now your notification implementation is done and you are ready to take the flight for doing next thing.

**Note:**: I have tested this code in happy path scenario and there might be chances that it will break here and there.

**How to receive FCM and Azure registration id for the registered app?**
If you have a requirement to send the notification to only targeted devices, then this section will help you in achieving the goal.

In current package, i did not see a way to find the FCM and registration id after the app/device is registered with FCM. We need to write
custom code to handle and return these details in react-native code. To do so, 
    - Open the app in VS code and navigate to "..\myapp\android\app\src\main\java\com\myapp\MainActivity.java"
    - In MainActivity.java, paste below lines

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
                         initialProps.putAll(notificationBundle);
                     }
                     else{
                         initialProps.putString("a","bundle null");

                    return initialProps;
                }
            };
        }
**|**

Open "..\myapp\App.js" and paste below line of code. This code will help you in receiving all required details which you are getting into  notification message

         componentWillMount = () => {
            alert(JSON.stringify(this.props));
         } 

**|**
That's it. Do whatever you want to do after receiving the notification message here.
    
   
**Sampe JSON message formats**
```
{
	"data": {
		"message": "Notification Hub test notification",
		"id": 123456,
		"title": "hi bro",
		"bigText": "12:21sdf ds sdfsdf sdfsda fds fsdf ds fsdf dsf dsf dsf sdf sdf sdf dsf sdf sdf dsf sdf sdaf sadf sdaf sda",
		"ticker": "Tickerrr",
		"group": "group hi group",
		"subText": "what is subtext?",
		"number": 12345,
		"actions": ["Read", "Dismiss"],
    "color":"red"
	}
}
```
