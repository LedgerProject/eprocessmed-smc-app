import 'package:SmartConsent/pages/video/video.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:SmartConsent/pages/NewSmartConsent/components/new_smart_consent_body.dart';
import 'package:nb_utils/nb_utils.dart';

// ignore: non_constant_identifier_names

bool isAccept = false;

Widget ConsentBodyCard() {
  return Padding(
    padding: const EdgeInsets.all(15.0),
    child: Container(
        child: Padding(
          padding: const EdgeInsets.all(5.0),
          child: Column(
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(left: 30.0, right: 20.0),
                child: Align(
                  heightFactor: 1,
                  alignment: Alignment.bottomLeft,
                  child: Text(
                    'Consent document',
                    style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                    textAlign: TextAlign.start,
                  ),
                ),
              ),
              Container(
                margin: const EdgeInsets.only(top: 15, left: 20.0, right: 20.0),
                child: Align(
                  heightFactor: 1,
                  alignment: Alignment.bottomLeft,
                  child: Text(
                    " I $userNameGeneral $userLastnameGeneral with ID $dniGeneral in my own name, confirm that The physician $specialistNameGeneral $specialistLastNameGeneral Col. $specialistColegiaturaGeneral of the medical team of $centroDeSaludGeneral, the informed consent of $procedimientoGeneral has been explained to me through the “Smart Consent” application. I declare that I have understood said procedure and I do not agree to its implementation. In accordance with what was previously expressed below, I digitize my sign home in this application.",
                    style: TextStyle(color: Color(0xFF000000), fontSize: 14),
                    textAlign: TextAlign.start,
                  ),
                ),
              ),
              Divider(),
              StatefulBuilder(
                  builder: (BuildContext context, StateSetter setState) {
                return Row(
                  children: [
                    Expanded(
                      flex: 3,
                      child: Center(
                        child: GestureDetector(
                          onTap: () {
                            // Navigator.push(
                            //   context,
                            //   MaterialPageRoute(
                            //     builder: (context) {
                            //       return TextosLegales();
                            //       // }
                            //     },
                            //   ),
                            // );

                            print("abrir datos de politicas leidas");
                          },
                          child: Text(
                            'I have understood the procedure',
                            style: TextStyle(
                              color: Color(0xFF0083bb),
                              // decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: Center(
                        child: Checkbox(
                          value: isAccept,
                          onChanged: (bool value) {
                            setState(() {
                              isAccept = value;
                              print("value check $value");
                            });
                          },
                        ),
                      ),
                    ),
                  ],
                );
              })
            ],
          ),
        ),
        // height: 500.0,
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

Widget btnContinueToVideo(context) {
  return FloatingActionButton(
    onPressed: () {
      if (isAccept == true) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) {
              return Video();
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
