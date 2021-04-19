// import 'dart:ffi';
import 'package:SmartConsent/Screens/AceptarConsent/aceptarConsent.dart';
import 'package:SmartConsent/Screens/DatosPersonales/datos_personales.dart';
import 'package:SmartConsent/Screens/ProcedimientoQuirurjico/procedimiento_quiru.dart';
import 'package:SmartConsent/Screens/video/video.dart';
import 'package:flutter/material.dart';
// import 'package:SmartConsent/Screens/Consent/consent.dart';
import 'package:SmartConsent/components/app_bar.dart';
import 'package:nb_utils/nb_utils.dart';

class BodyAceptRecorder extends StatefulWidget {
  @override
  BodyRecorder createState() => BodyRecorder();
}

enum SingingCharacter { Accept, Reject }

class BodyRecorder extends State<BodyAceptRecorder> {
  SingingCharacter _character = SingingCharacter.Accept;
  int _groupValue = -1;
  @override
  @override
  Widget _myRadioButton({String title, int value, Function onChanged}) {
    return RadioListTile(
      value: value,
      groupValue: _groupValue,
      onChanged: onChanged,
      title: Text(title),
    );
  }

  Widget build(BuildContext context) {
    int number = 0;
    var accept;
    List userdetails1 = [
      "I Daniel Romero with ID 0940526536 in my own name, confirm that The physician Sebastian Armijos the medical team of {centro_de_salud .name}, the informed consent of {procedures.name} has been explained to me through the “Smart Consent” application.                                                                                                                                                                                                       I declare that I have understood said procedure and I do not agree to its implementation. In accordance with what was previously expressed below, I digitize my signature in this application.",
    ];
    return Scaffold(
        body: Container(
      child: SingleChildScrollView(
          child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Align(
              alignment: Alignment.center,
              child: Text(
                userdetails1[0],
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
            ],
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
      )),
    ));
  }
}

// class _MyStatefulWidgetState extends State<MyStatefulWidget> {
//   SingingCharacter _character = SingingCharacter.lafayette;

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: <Widget>[
//         ListTile(
//           title: const Text('Lafayette'),
//           leading: Radio<SingingCharacter>(
//             value: SingingCharacter.lafayette,
//             groupValue: _character,
//             onChanged: (SingingCharacter value) {
//               setState(() {
//                 _character = value;
//               });
//             },
//           ),
//         ),
//         ListTile(
//           title: const Text('Thomas Jefferson'),
//           leading: Radio<SingingCharacter>(
//             value: SingingCharacter.jefferson,
//             groupValue: _character,
//             onChanged: (SingingCharacter value) {
//               setState(() {
//                 _character = value;
//               });
//             },
//           ),
//         ),
//       ],
//     );
//   }
// }

void setState(Null Function() param0) {}

class text {
  String texto;

  text({this.texto});
}
