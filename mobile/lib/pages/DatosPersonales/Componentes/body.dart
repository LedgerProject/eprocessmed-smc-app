import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:SmartConsent/pages/NewSmartConsent/components/new_smart_consent_body.dart';

// ignore: non_constant_identifier_names
Widget DatosPersonalesBodyCard() {
  var now = DateTime.now();
  return Padding(
    padding: const EdgeInsets.all(15.0),
    child: Container(
        child: Padding(
          padding: const EdgeInsets.all(5.0),
          child: Column(
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(left: 110.0),
                child: Align(
                  heightFactor: 1,
                  alignment: Alignment.bottomLeft,
                  child: Text(
                    'General data',
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
                    // "Centro de salud:E PROCESSMED - DEMO\n\n"
                    "Fecha: $now   \n\n"
                    "Paciente: $userNameGeneral $userLastnameGeneral\n\n"
                    "Correo: $emailGeneral \n\n"
                    "DNI: $dniGeneral\n\n"
                    "Phone: $phoneGeneral\n\n",

                    style: TextStyle(color: Color(0xFF000000), fontSize: 14),
                    textAlign: TextAlign.start,
                  ),
                ),
              ),
            ],
          ),
        ),
        height: 300.0,
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
