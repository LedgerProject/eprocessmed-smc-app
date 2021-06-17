import 'dart:typed_data';
import 'package:SmartConsent/Pages/FirmaEspecialista/firma_especialista.dart';
import 'package:SmartConsent/Pages/FirmaPaciente/firma_paciente.dart';
import 'package:SmartConsent/pages/FirmaEspecialista/components/body.dart';
import 'package:SmartConsent/pages/FirmaEspecialista/firma_especialista.dart';
import 'package:SmartConsent/pages/Terminado/terminado.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:SmartConsent/widgets/general_header.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:SmartConsent/widgets/printLarge.dart';
import 'package:SmartConsent/widgets/scroll_test.dart';
import 'package:flutter/material.dart';
import 'package:hand_signature/signature.dart';
import 'package:nb_utils/nb_utils.dart';
// import 'package:flutter_auth/Pages/auth/consent/Process/scroll_test.dart';
// import 'package:flutter_auth/Pages/auth/consent/Process/record_screen.dart';

HandSignatureControl control = new HandSignatureControl(
  threshold: 5.0,
  smoothRatio: 0.65,
  velocityRange: 2.0,
);

ValueNotifier<String> svg = ValueNotifier<String>(null);
ValueNotifier<ByteData> rawImage = ValueNotifier<ByteData>(null);

class FirmaPacienteBody extends StatelessWidget {
  const FirmaPacienteBody({
    Key key,
  }) : super(key: key);

  bool get scrollTest => false;

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            iconTheme: IconThemeData(color: Color(0xFFFFFFFF)),
            bottomOpacity: 0.0,
            elevation: 0.0,
            backgroundColor: Color(0xFF0083bb),
            title: Text(
              'Patient Signature',
              style: TextStyle(color: Color(0xFFFFFFFF)),
            ),
          ),
          backgroundColor: Colors.brown[50],
          body: SafeArea(
            child: Stack(
              children: <Widget>[
                Column(
                  children: <Widget>[
                    general_header("assets/images/signature.png", 120,
                        'Texto en ingles explicativo de la pantalla '),
                    Expanded(
                      child: Container(
                        margin: EdgeInsets.only(top: 20),
                        child: Center(
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
                Align(
                  alignment: Alignment.bottomRight,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      // _buildImageView(),
                      // _buildSvgView(),
                    ],
                  ),
                ),
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
              firmPacienteGeneral = svg.value;
              printWrapped('value pirnt*************** $firmPacienteGeneral');
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    // UserGenertaePdf().generateConsent(idUser, idSpecialist, dni, email, name, lastname, phone, idStablishment);
                    // UserGenertaePdf().firmaEspecialis(svg.value);
                    return FirmaEspecialistaBody();
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
}
