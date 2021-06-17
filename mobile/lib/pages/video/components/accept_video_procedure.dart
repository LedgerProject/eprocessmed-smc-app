import 'package:SmartConsent/pages/VoideRecorder/components/simple_recorer.dart';
import 'package:SmartConsent/pages/VoideRecorder/voice_recorder_page.dart';
import 'package:SmartConsent/pages/video/video.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:nb_utils/nb_utils.dart';

// ignore: non_constant_identifier_names
class AcceptanceVideoBodyCard extends StatefulWidget {
  AcceptanceVideoBodyCard({Key key}) : super(key: key);

  @override
  AcceptanceVideoBodyCardState createState() => AcceptanceVideoBodyCardState();
}

bool isAccept = false;

class AcceptanceVideoBodyCardState extends State<AcceptanceVideoBodyCard> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: AcceptanceVideoBodyCard(context),
    );
  }

  @override
  Widget AcceptanceVideoBodyCard(context) {
    Color getColor(Set<MaterialState> states) {
      const Set<MaterialState> interactiveStates = <MaterialState>{
        MaterialState.pressed,
        MaterialState.hovered,
        MaterialState.focused,
      };
      if (states.any(interactiveStates.contains)) {
        return Colors.blue;
      }
      return Colors.red;
    }

    return Padding(
      padding: const EdgeInsets.all(25.0),
      child: Container(
          child: Padding(
            padding: const EdgeInsets.all(5.0),
            child: Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                      'The information regarding the informed the procedure or medical intervention prescribed by your specialist will then be presented in digital format.  '),
                ),
                Divider(),
                StatefulBuilder(
                    builder: (BuildContext context, StateSetter setState) {
                  return Center(
                    child: CheckboxListTile(
                      title: const Text(
                        'Accept procedure',
                        style: TextStyle(color: Color(0xFF0083bb)),
                      ),
                      value: isAccept,
                      onChanged: (bool value) {
                        setState(() {
                          isAccept = value;
                          print("value check $value");
                        });
                      },
                    ),
                  );
                })
              ],
            ),
          ),
          decoration: new BoxDecoration(
            color: Color(0xFFFFFFFF),
            boxShadow: [new BoxShadow(blurRadius: 1.0)],
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(20),
              top: Radius.circular(20),
            ),
          )),
    );
  }

  Widget btnContinueToRecroderVoice(context) {
    return FloatingActionButton(
      onPressed: () {
        if (isAccept == true) {
          var now = DateTime.now();
          acceptTimeConsentAcceptGeneral = now;
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return SimpleRecorder();
                // }
              },
            ),
          );
        } else {
          toast('Not accept');
        }
        // Add your onPressed code here!
      },
      child: const Icon(Icons.navigate_next_rounded),
      backgroundColor: Color(0xFF0083bb),
    );
  }
}
