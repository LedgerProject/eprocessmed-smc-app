import 'package:SmartConsent/Screens/record_screen/body.dart';
import 'package:SmartConsent/components/app_bar.dart';
import 'package:flutter/material.dart';
import 'package:SmartConsent/Screens/video/components/body.dart';
import 'package:flutter/cupertino.dart';
import 'package:video_player/video_player.dart';

class Video extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Colors.blueGrey[100],
      appBar: appBar(context, 'Procedure video'),
      body: ListView(
        children: <Widget>[
          VideoBody(
            videoPlayerController: VideoPlayerController.network(
                'https://app1.e-processmed.com/smartConsentWeb/static/CDS/Videos/VID-3.mp4'),
            looping: true,
            autoplay: true,
          ),
          Divider(),
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(50),
              gradient: LinearGradient(colors: [
                Color(0xFF0083bb),
                Color(0xFF0083bb),
              ]),
            ),
            child: MaterialButton(
              onPressed: () {
                // _incrementCounter();
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      // if (number >= 4) {
                      //   return Consent(numerArray: number);
                      // } else {
                      //   number = numerArray + 1;
                      //   print('number$number');
                      //   return Consent(numerArray: number);
                      // }
                      return AudioRecorder();
                    },
                  ),
                );
                // toast('Gradient Material button');
              },
              splashColor: Colors.transparent,
              child: Text(
                'Next',
                style: TextStyle(color: Color(0xFFFFFFFF)),
                // style: primaryTextStyle(color: Colors.white),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
