import 'package:SmartConsent/pages/DatosPersonales/datos_personales.dart';
import 'package:SmartConsent/pages/ProcedimientoQuirurjico/components/body.dart';
import 'package:SmartConsent/pages/TextosLegales/textos_legales.dart';
import 'package:SmartConsent/pages/video/video.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:nb_utils/nb_utils.dart';

// ignore: non_constant_identifier_names
class AcceptanceBodyCard extends StatefulWidget {
  AcceptanceBodyCard({Key key}) : super(key: key);

  @override
  AcceptanceBodyCardState createState() => AcceptanceBodyCardState();
}

enum SingingCharacter { Accept, Reject }
bool isAccept = false;

class AcceptanceBodyCardState extends State<AcceptanceBodyCard> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: AcceptanceBodyCard(context),
    );
  }

  @override
  Widget AcceptanceBodyCard(context) {
    SingingCharacter _character = SingingCharacter.Accept;
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
                      'The information regarding the informed consent corresponding to the procedure or medical intervention prescribed by your specialist will then be presented in digital format.  '),
                ),
                Divider(),
                StatefulBuilder(
                    builder: (BuildContext context, StateSetter setState) {
                  return Center(
                    child: Column(
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
                  );
                }),
                StatefulBuilder(
                    builder: (BuildContext context, StateSetter setState) {
                  return Row(
                    children: [
                      Expanded(
                        flex: 3,
                        child: Center(
                          child: GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) {
                                    return TextosLegales();
                                    // }
                                  },
                                ),
                              );

                              print("abrir datos de politicas leidas");
                            },
                            child: Text(
                              'I have read and accept the information on data processing',
                              style: TextStyle(
                                color: Color(0xFF0083bb),
                                decoration: TextDecoration.underline,
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

  Widget btnContinue(context) {
    return FloatingActionButton(
      onPressed: () {
        if (isAccept == true) {
          var now = DateTime.now();
          acceptTimeConsentAcceptGeneral = now;
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return DatosPersonales();
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
