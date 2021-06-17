import 'package:SmartConsent/pages/TextoConcentimiento/components/texto_concentimiento_body_card.dart';
import 'package:SmartConsent/pages/TextosLegales/components/texto_legales_body_card.dart';
import 'package:SmartConsent/pages/video/video.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:flutter/material.dart';

class TextosConcentimiento extends StatelessWidget {
  const TextosConcentimiento({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: appBar(context, 'Consent document'),
        body: ListView(
          children: [ConsentBodyCard()],
        ),
        floatingActionButton: btnContinueToVideo(context));
  }
}
