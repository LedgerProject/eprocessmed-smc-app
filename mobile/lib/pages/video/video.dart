import 'package:SmartConsent/pages/VoideRecorder/voice_recorder_page.dart';
import 'package:SmartConsent/pages/video/components/accept_video_procedure.dart';
import 'package:SmartConsent/pages/video/components/body.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:SmartConsent/widgets/general_header.dart';
import 'package:flutter/material.dart';
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
            general_header("assets/images/monitor-screen.png", 120,
                "Accept consent to continue"),
            Container(
              margin: EdgeInsets.only(top: 10),
              height: 200,
              child: VideoBody(
                videoPlayerController: VideoPlayerController.network(
                    'https://app1.e-processmed.com/smartConsentWeb/static/CDS/Videos/VID-3.mp4'),
                looping: true,
                autoplay: true,
              ),
            ),
            Divider(),
            AcceptanceVideoBodyCardState().AcceptanceVideoBodyCard(context)
          ],
        ),
        floatingActionButton:
            AcceptanceVideoBodyCardState().btnContinueToRecroderVoice(context));
  }
}
