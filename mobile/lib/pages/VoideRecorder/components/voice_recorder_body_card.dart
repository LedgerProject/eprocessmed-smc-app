import 'package:SmartConsent/pages/video/video.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

// ignore: non_constant_identifier_names
class AcceptanceRecorderBodyCard extends StatefulWidget {
  AcceptanceRecorderBodyCard({Key key}) : super(key: key);

  @override
  AcceptanceRecorderBodyCardState createState() =>
      AcceptanceRecorderBodyCardState();
}

class AcceptanceRecorderBodyCardState
    extends State<AcceptanceRecorderBodyCard> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: AcceptanceBodyCard(context),
    );
  }

  bool isAccept = false;
  @override
  Widget AcceptanceBodyCard(context) {
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
}
