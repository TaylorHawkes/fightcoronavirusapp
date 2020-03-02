## supoer annoying hack needeed cp -fr platforms/android/app/src/main/res  platforms/android/
cordova build --release android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./fightcoronavirusapp_keystore -storepass 'lacrosse1' ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk fightcoronavirusapp

zipalign -v 4  ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk  ~/Desktop/fightcoronavirusapp.apk

