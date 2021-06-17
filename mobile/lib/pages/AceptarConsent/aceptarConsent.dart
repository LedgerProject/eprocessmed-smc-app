import 'package:SmartConsent/pages/AceptarConsent/Components/acceptance_card_body.dart';
import 'package:SmartConsent/pages/DatosPersonales/datos_personales.dart';
import 'package:SmartConsent/pages/video/video.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:SmartConsent/widgets/general_header.dart';
import 'package:flutter/material.dart';

class Consent extends StatefulWidget {
  _WidgetConst createState() => _WidgetConst();
}

class _WidgetConst extends State<Consent> {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<Object>(
        stream: null,
        builder: (context, snapshot) {
          return Scaffold(
              appBar: appBar(context, 'Procedure acceptance'),
              body: ListView(
                children: <Widget>[
                  general_header("assets/images/procedure_accept.png", 120,
                      "Accept consent to continue"),
                  AcceptanceBodyCard(),
                ],
              ),
              floatingActionButton:
                  AcceptanceBodyCardState().btnContinue(context));
        });
  }

  @override
  void dispose() {
    super.dispose();
  }
}
