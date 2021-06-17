import 'package:SmartConsent/pages/DatosPersonales/Componentes/body.dart';
import 'package:SmartConsent/pages/TextoConcentimiento/textos_concentimientos.dart';
import 'package:SmartConsent/pages/video/video.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:flutter/material.dart';

class DatosPersonales extends StatelessWidget {
  const DatosPersonales({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: appBar(context, 'General data'),
        body: DatosPersonalesBodyCard(),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) {
                  return TextosConcentimiento();
                  // }
                },
              ),
            );
            // Add your onPressed code here!
          },
          child: const Icon(Icons.navigate_next_rounded),
          backgroundColor: Color(0xFF0083bb),
        ));
  }
}
