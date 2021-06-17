import 'dart:typed_data';

import 'package:SmartConsent/Pages/FirmaPaciente/firma_paciente.dart';
import 'package:SmartConsent/Pages/Terminado/terminado.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:SmartConsent/widgets/general_header.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:SmartConsent/widgets/printLarge.dart';
import 'package:SmartConsent/widgets/scroll_test.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:flutter/material.dart';
import 'package:hand_signature/signature.dart';
// import 'package:flutter_auth/Pages/auth/consent/Process/scroll_test.dart';
// import 'package:flutter_auth/Pages/auth/consent/Process/record_screen.dart';

HandSignatureControl control = new HandSignatureControl(
  threshold: 5.0,
  smoothRatio: 0.65,
  velocityRange: 2.0,
);

ValueNotifier<String> svg = ValueNotifier<String>(null);

ValueNotifier<ByteData> rawImage = ValueNotifier<ByteData>(null);

class FirmaEspecialistaBody extends StatelessWidget {
  const FirmaEspecialistaBody({
    Key key,
  }) : super(key: key);

  bool get scrollTest => false;

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: appBar(context, 'Specialist Firm'),
          backgroundColor: Colors.brown[50],
          body: SafeArea(
            child: Stack(
              children: <Widget>[
                Column(
                  children: <Widget>[
                    general_header("assets/images/signature.png", 120,
                        'Texto en ingles explicativo de la pantalla'),
                    Expanded(
                      child: Container(
                        margin: EdgeInsets.only(top: 20),
                        child: Center(
                          // aspectRatio: 2.0,
                          child: Stack(
                            children: <Widget>[
                              Container(
                                constraints: BoxConstraints.expand(),
                                color: Colors.white,
                                child: HandSignaturePainterView(
                                  control: control,
                                  type: SignatureDrawType.shape,
                                ),
                              ),
                              CustomPaint(
                                painter: DebugSignaturePainterCP(
                                  control: control,
                                  cp: false,
                                  cpStart: false,
                                  cpEnd: false,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    //aqui estan los botones de limpiar y guardar
                    Row(
                      children: <Widget>[
                        RaisedButton(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                                side: BorderSide(
                                    color: Color.fromRGBO(0, 160, 227, 1))),
                            onPressed: () {
                              control.clear();
                            },
                            padding: EdgeInsets.all(10.0),
                            color: Color.fromRGBO(0, 160, 227, 1),
                            textColor: Colors.white,
                            child: Icon(Icons.delete)),
                      ],
                    ),
                    SizedBox(
                      height: 20.0,
                    ),
                  ],
                ),
                //aqui se ve lo que exporto
                // Align(
                //   alignment: Alignment.bottomRight,
                //   child: Column(
                //     mainAxisSize: MainAxisSize.min,
                //     children: <Widget>[
                //       _buildImageView(),
                //       _buildSvgView(),
                //     ],
                //   ),
                // ),
              ],
            ),
          ),
          floatingActionButton: FloatingActionButton(
            onPressed: () {
              svg.value = control.toSvg(
                color: Colors.blueGrey,
                size: 2.0,
                maxSize: 15.0,
                type: SignatureDrawType.shape,
              );
              // UserGenertaePdf().firmaEspecialis(svg.toString());
              firmaEspecialistaGeneral = svg.value;
              printWrapped('value pirnt $firmaEspecialistaGeneral');
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    // UserGenertaePdf().generateConsent(idUser, idSpecialist, dni, email, name, lastname, phone, idStablishment);
                    // UserGenertaePdf().firmaEspecialis(svg.value);
                    UserGenertaePdf().generateConsentReady();
                    return Terminado();
                  },
                ),
              );

              // Add your onPressed code here!
            },
            child: const Icon(Icons.navigate_next_rounded),
            backgroundColor: Color(0xFF0083bb),
          )),
    );
  }

//metodo que convierte el trazo a png
  Widget _buildImageView() => Container(
        width: 192.0,
        height: 96.0,
        decoration: BoxDecoration(
          border: Border.all(),
          color: Colors.white30,
        ),
        child: ValueListenableBuilder<ByteData>(
          valueListenable: rawImage,
          builder: (context, data, child) {
            if (data == null) {
              return Container(
                color: Colors.red,
                child: Center(
                  child: Text('not signed yet (png)'),
                ),
              );
            } else {
              return Padding(
                padding: EdgeInsets.all(8.0),
                child: Image.memory(data.buffer.asUint8List()),
              );
            }
          },
        ),
      );

//metodo que convierte el trazo a svg
  Widget _buildSvgView() => Container(
        width: 192.0,
        height: 96.0,
        decoration: BoxDecoration(
          border: Border.all(),
          color: Colors.white30,
        ),
        child: ValueListenableBuilder<String>(
          valueListenable: svg,
          builder: (context, data, child) {
            return HandSignatureView.svg(
              data: data,
              padding: EdgeInsets.all(8.0),
              placeholder: Container(
                color: Colors.red,
                child: Center(
                  child: Text('not signed yet (svg)'),
                ),
              ),
            );
          },
        ),
      );
}
