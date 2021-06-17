import 'package:SmartConsent/pages/Terminado/components/cards_terminado.dart';
import 'package:SmartConsent/pages/Terminado/components/cards_terminado_Home.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:flutter/material.dart';

class BodyTerminado extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, ''),
      body: ListView(
        children: [CardsTerminadoPdf(), CardsTerminadoHome()],
      ),
    );
  }
}
