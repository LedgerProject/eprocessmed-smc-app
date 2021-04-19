/*
 * Copyright 2018, 2019, 2020 Dooboolab.
 *
 * This file is part of Flutter-Sound.
 *
 * Flutter-Sound is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 (LGPL-V3), as published by
 * the Free Software Foundation.
 *
 * Flutter-Sound is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Flutter-Sound.  If not, see <https://www.gnu.org/licenses/>.
 */

import 'dart:io';

import 'package:SmartConsent/Screens/ProcedimientoQuirurjico/procedimiento_quiru.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:permission_handler/permission_handler.dart';

import '../demo_util/temp_file.dart';

import 'demo_active_codec.dart';
import 'demo_asset_player.dart';
import 'demo_drop_downs.dart';
import 'recorder_state.dart';
import 'remote_player.dart';

enum SingingCharacter { Accept, Reject }
SingingCharacter _character = SingingCharacter.Accept;

class MainBody extends StatefulWidget {
  ///
  const MainBody({
    Key key,
  }) : super(key: key);

  @override
  _MainBodyState createState() => _MainBodyState();
}

class _MainBodyState extends State<MainBody> {
  bool initialized = false;

  String recordingFile;
  Track track;

  @override
  void initState() {
    if (!kIsWeb) {
      var status = Permission.microphone.request();
      status.then((stat) {
        if (stat != PermissionStatus.granted) {
          throw RecordingPermissionException(
              'Microphone permission not granted');
        }
      });
    }
    super.initState();
    tempFile(suffix: '.aac').then((path) {
      recordingFile = path;
      track = Track(trackPath: recordingFile);
      setState(() {});
    });
  }

  Future<bool> init() async {
    if (!initialized) {
      await initializeDateFormatting();
      UtilRecorder().init();
      ActiveCodec().recorderModule = UtilRecorder().recorderModule;
      ActiveCodec().setCodec(withUI: false, codec: Codec.aacADTS);

      initialized = true;
    }
    return initialized;
  }

  void _clean() async {
    if (recordingFile != null) {
      try {
        await File(recordingFile).delete();
      } on Exception {
        // ignore
      }
    }
  }

  @override
  void dispose() {
    _clean();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        initialData: false,
        future: init(),
        builder: (context, snapshot) {
          if (snapshot.data == false) {
            return Container(
              width: 0,
              height: 0,
              color: Colors.white,
            );
          } else {
            final dropdowns = Dropdowns(
                onCodecChanged: (codec) =>
                    ActiveCodec().setCodec(withUI: false, codec: codec));

            return ListView(
              children: <Widget>[
                _buildRecorder(track),
                dropdowns,
                Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: Align(
                    alignment: Alignment.center,
                    child: Text(
                      'I Daniel Romero with ID 0940526536 in my own name, confirm that The physician Sebastian Armijos the medical team of {centro_de_salud .name}, the informed consent of {procedures.name} has been explained to me through the “Smart Consent” application.                                                                                                                                                                                                       I declare that I have understood said procedure and I do not agree to its implementation. In accordance with what was previously expressed below, I digitize my signature in this application.',
                      style: TextStyle(color: Color(0xFF0083bb), fontSize: 18),
                    ),
                  ),
                ),
                Divider(),
                Column(
                  children: <Widget>[
                    ListTile(
                      title: const Text('Accept'),
                      leading: Radio<SingingCharacter>(
                        value: SingingCharacter.Accept,
                        groupValue: _character,
                        onChanged: (SingingCharacter value) {
                          setState(() {
                            _character = value;
                          });
                        },
                      ),
                    ),
                    ListTile(
                      title: const Text('Reject'),
                      leading: Radio<SingingCharacter>(
                        value: SingingCharacter.Reject,
                        groupValue: _character,
                        onChanged: (SingingCharacter value) {
                          setState(() {
                            _character = value;
                          });
                        },
                      ),
                    ),
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
                                return ProcedimientoQuiru();
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
                    )
                  ],
                ),
                // buildPlayBars(),
              ],
            );
          }
        });
  }

  // Widget buildPlayBars() {
  //   return Padding(
  //       padding: const EdgeInsets.all(8.0),
  //       child: Column(
  //         children: [
  //           Left('Asset Playback'),
  //           AssetPlayer(),
  //           Left('Remote Track Playback'),
  //           RemotePlayer(),
  //         ],
  //       ));
  // }

  Widget _buildRecorder(Track track) {
    print(track.dataBuffer);
    return Padding(
        padding: const EdgeInsets.all(8.0),
        child: RecorderPlaybackController(
            child: Column(
          children: [
            Left('Recorder'),
            SoundRecorderUI(track),
            // Left('Recording Playback'),
            // SoundPlayerUI.fromTrack(
            //   track,
            //   // enabled: false,
            //   // showTitle: true,
            //   audioFocus: AudioFocus.requestFocusAndDuckOthers,
            // ),
          ],
        )));
  }
}

///
class Left extends StatelessWidget {
  ///
  final String label;

  ///
  Left(this.label);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 16.0, bottom: 4, left: 8),
      child: Container(
          alignment: Alignment.centerLeft,
          child: Text(label, style: TextStyle(fontWeight: FontWeight.bold))),
    );
  }
}
