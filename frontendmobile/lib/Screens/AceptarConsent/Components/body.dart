// import 'dart:ffi';
import 'package:SmartConsent/Screens/AceptarConsent/aceptarConsent.dart';
import 'package:SmartConsent/Screens/DatosPersonales/datos_personales.dart';
import 'package:SmartConsent/Screens/video/video.dart';
import 'package:SmartConsent/components/MWRadioScreen.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:flutter/material.dart';
// import 'package:SmartConsent/Screens/Consent/consent.dart';
import 'package:SmartConsent/components/app_bar.dart';
import 'package:nb_utils/nb_utils.dart';

import 'dart:io';

import 'package:SmartConsent/Screens/ProcedimientoQuirurjico/procedimiento_quiru.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:permission_handler/permission_handler.dart';

class BodyAcept extends StatefulWidget {
  @override
  BodyAceptState createState() => BodyAceptState();
}

enum SingingCharacter { Accept, Reject }
SingingCharacter _character = SingingCharacter.Accept;

class BodyAceptState extends State<BodyAcept> {
  String textData =
      'The information regarding the informed consent corresponding to the procedure or medical intervention prescribed by your specialist will then be presented in digital format.  ';
  void initState() {
    getData();
  }

  // ignore: missing_return
  Future<bool> getData() async {
    UserGetProvider().getConsents(0).then((value) {
      print('datosObtenido: $value');
      textData = value;
    });
  }

  int _groupValue = -1;
  @override
  @override
  // Widget _myRadioButton({String title, int value, Function onChanged}) {
  //   return RadioListTile(
  //     value: value,
  //     groupValue: _groupValue,
  //     onChanged: onChanged,
  //     title: Text(title),
  //   );
  // }

  Widget buildText({BuildContext context}) {
    if (textData == ' ') {
      Duration(seconds: 2);
      return Text(
        textData,
        style: TextStyle(color: Color(0xFF0083bb), fontSize: 18),
      );
    } else {
      return Text(
        textData,
        style: TextStyle(color: Color(0xFF0083bb), fontSize: 18),
      );
    }
  }

  int _radioValue1 = -1;
  int correctScore = 0;
  void _handleRadioValueChange1(int value) {
    setState(() {
      _radioValue1 = value;

      switch (_radioValue1) {
        case 0:
          Fluttertoast.showToast(
              msg: 'Correct !', toastLength: Toast.LENGTH_SHORT);
          correctScore++;
          break;
        case 1:
          Fluttertoast.showToast(
              msg: 'Try again !', toastLength: Toast.LENGTH_SHORT);
          break;
        case 2:
          Fluttertoast.showToast(
              msg: 'Try again !', toastLength: Toast.LENGTH_SHORT);
          break;
      }
    });
  }

  Widget buildRadio(BuildContext context) {
    return new MaterialApp(
        home: new Scaffold(
            appBar: AppBar(
              title: new Text('Kids Quiz App'),
              centerTitle: true,
              backgroundColor: Colors.blue,
            ),
            body: new Container(
                padding: EdgeInsets.all(8.0),
                child: new Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      new Text(
                        'Select correct answers from below:',
                        style: new TextStyle(
                            fontSize: 20.0, fontWeight: FontWeight.bold),
                      ),
                      new Padding(
                        padding: new EdgeInsets.all(8.0),
                      ),
                      new Divider(height: 5.0, color: Colors.black),
                      new Padding(
                        padding: new EdgeInsets.all(8.0),
                      ),
                      new Text(
                        'Lion is :',
                        style: new TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18.0,
                        ),
                      ),
                      new Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          new Radio(
                            value: 0,
                            groupValue: _radioValue1,
                            onChanged: _handleRadioValueChange1,
                          ),
                          new Text(
                            'Carnivore',
                            style: new TextStyle(fontSize: 16.0),
                          ),
                          new Radio(
                            value: 1,
                            groupValue: _radioValue1,
                            onChanged: _handleRadioValueChange1,
                          ),
                          new Text(
                            'Herbivore',
                            style: new TextStyle(
                              fontSize: 16.0,
                            ),
                          ),
                          new Radio(
                            value: 2,
                            groupValue: _radioValue1,
                            onChanged: _handleRadioValueChange1,
                          ),
                          new Text(
                            'Omnivore',
                            style: new TextStyle(fontSize: 16.0),
                          ),
                        ],
                      ),
                      new Divider(
                        height: 5.0,
                        color: Colors.black,
                      ),
                      new Padding(
                        padding: new EdgeInsets.all(8.0),
                      ),
                    ]))));
  }

  Widget build(BuildContext context) {
    return FutureBuilder(
        initialData: false,
        future: getData(),
        builder: (context, snapshot) {
          if (snapshot.data == false) {
            return Container(
              width: 0,
              height: 0,
              color: Colors.white,
            );
          } else {
            return ListView(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: Align(
                    alignment: Alignment.center,
                    child: Text(
                      textData,
                      style: TextStyle(color: Color(0xFF0083bb), fontSize: 18),
                    ),
                  ),
                ),
                Divider(),
                Column(
                  children: <Widget>[
                    // Align(
                    //   alignment: Alignment.topCenter,
                    //   child: MWRadioScreen(),
                    // ),
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
                                return Video();
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
    // final Future<String> _calculation = Future<String>.delayed(
    //   const Duration(seconds: 2),
    //   () => UserGetProvider().getConsents(0).then((value) {
    //     print('datosObtenido: $value');
    //     textData = value;
    //   }),
    // );
    // String text = textData;
    // int number = 0;
    // var accept;
    // return Scaffold(
    //     appBar: appBar(context, 'Procedure acceptance'),
    //     body: Container(
    //       child: SingleChildScrollView(
    //           child: Column(
    //         children: [
    //           Padding(
    //             padding: const EdgeInsets.all(18.0),
    //             child: Align(
    //               alignment: Alignment.center,
    //               child:
    //                   // buildText(context: context)
    //                   Text(
    //                 'The information regarding the informed consent corresponding to the procedure or medical intervention prescribed by your specialist will then be presented in digital format',
    //                 style: TextStyle(color: Color(0xFF0083bb), fontSize: 18),
    //               ),
    //             ),
    //           ),
    //           Divider(),
    //           Column(
    //             children: <Widget>[
    //               ListTile(
    //                 title: const Text('Accept'),
    //                 leading: Radio<SingingCharacter>(
    //                   value: SingingCharacter.Accept,
    //                   groupValue: _character,
    //                   onChanged: (SingingCharacter value) {
    //                     setState(() {
    //                       _character = SingingCharacter.Accept;
    //                     });
    //                   },
    //                 ),
    //               ),
    //               ListTile(
    //                 title: const Text('Reject'),
    //                 leading: Radio<SingingCharacter>(
    //                   value: SingingCharacter.Reject,
    //                   groupValue: _character,
    //                   onChanged: (SingingCharacter value) {
    //                     setState(() {
    //                       _character = SingingCharacter.Reject;
    //                     });
    //                   },
    //                 ),
    //               ),
    //             ],
    //           ),
    //           Divider(),
    //           Container(
    //             decoration: BoxDecoration(
    //               borderRadius: BorderRadius.circular(50),
    //               gradient: LinearGradient(colors: [
    //                 Color(0xFF0083bb),
    //                 Color(0xFF0083bb),
    //               ]),
    //             ),
    //             child: MaterialButton(
    //               onPressed: () {
    //                 // _incrementCounter();
    //                 Navigator.push(
    //                   context,
    //                   MaterialPageRoute(
    //                     builder: (context) {
    //                       // if (number >= 4) {
    //                       //   return Consent(numerArray: number);
    //                       // } else {
    //                       //   number = numerArray + 1;
    //                       //   print('number$number');
    //                       //   return Consent(numerArray: number);
    //                       // }
    //                       return Video();
    //                     },
    //                   ),
    //                 );
    //                 // toast('Gradient Material button');
    //               },
    //               splashColor: Colors.transparent,
    //               child: Text(
    //                 'Next',
    //                 style: TextStyle(color: Color(0xFFFFFFFF)),
    //                 // style: primaryTextStyle(color: Colors.white),
    //               ),
    //             ),
    //           )
    //         ],
    //       )),
    //     ));
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
