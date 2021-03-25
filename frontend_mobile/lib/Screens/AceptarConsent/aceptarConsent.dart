import 'package:SmartConsent/Screens/AceptarConsent/Components/body.dart';
import 'package:SmartConsent/components/app_bar.dart';
import 'package:flutter/material.dart';

class Consent extends StatefulWidget {
  // final String userPatient;
  // const Consent({
  //   this.userPatient,
  // });
  _WidgetConst createState() => _WidgetConst();
  // @override
  // Widget build(BuildContext context) {
  //   return Scaffold(
  //     appBar: appBar(context, 'Procedure acceptance'),
  //     body: BodyAcept(),
  //   );
  // }
}

class _WidgetConst extends State<Consent> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Colors,
      appBar: appBar(context, 'Procedure acceptance'),
      // body: BodyAceptRecorder(),
      body: BodyAcept(),
    );
  }

  @override
  void dispose() {
    super.dispose();
  }
}
