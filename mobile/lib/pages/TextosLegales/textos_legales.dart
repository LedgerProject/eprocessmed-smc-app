import 'package:SmartConsent/pages/TextosLegales/components/texto_legales_body_card.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:flutter/material.dart';

class TextosLegales extends StatelessWidget {
  const TextosLegales({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, 'Information'),
      body: ListView(
        children: [InfoBodyCard()],
      ),
    );
  }
}
