import 'dart:typed_data';

import 'package:SmartConsent/Screens/FirmaPaciente/firma_paciente.dart';
import 'package:SmartConsent/Screens/Terminado/terminado.dart';
import 'package:SmartConsent/components/app_bar.dart';
import 'package:SmartConsent/components/printLarge.dart';
import 'package:SmartConsent/components/scroll_test.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:flutter/material.dart';
import 'package:hand_signature/signature.dart';
// import 'package:flutter_auth/Screens/auth/consent/Process/scroll_test.dart';
// import 'package:flutter_auth/Screens/auth/consent/Process/record_screen.dart';

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
        body: scrollTest
            ? ScrollTest()
            : SafeArea(
                child: Stack(
                  children: <Widget>[
                    Column(
                      children: <Widget>[
                        Expanded(
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
                              child:
                                  Text("Clean", style: TextStyle(fontSize: 15)),
                            ),
                            RaisedButton(
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                  side: BorderSide(
                                      color: Color.fromRGBO(0, 160, 227, 1))),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) {
                                      UserGenertaePdf().generatePdf();
                                      UserGenertaePdf()
                                          .firmaEspecialis(svg.value);
                                      return Terminado();
                                    },
                                  ),
                                );
                                svg.value = control.toSvg(
                                  color: Colors.blueGrey,
                                  size: 2.0,
                                  maxSize: 15.0,
                                  type: SignatureDrawType.shape,
                                );
                                UserGenertaePdf()
                                    .firmaEspecialis(svg.toString());
                                printWrapped('value pirnt $svg');
                              },
                              padding: EdgeInsets.all(10.0),
                              color: Color.fromRGBO(0, 160, 227, 1),
                              textColor: Colors.white,
                              child:
                                  Text("Next", style: TextStyle(fontSize: 15)),
                            ),
                            // RaisedButton(
                            //   shape: RoundedRectangleBorder(
                            //       borderRadius: BorderRadius.circular(18.0),
                            //       side: BorderSide(
                            //           color: Color.fromRGBO(0, 160, 227, 1))),
                            //   onPressed: () {
                            //     Navigator.push(
                            //       context,
                            //       MaterialPageRoute(
                            //         builder: (context) {
                            //           return FirmaPaciente();
                            //         },
                            //       ),
                            //     );
                            //   },
                            //   padding: EdgeInsets.all(10.0),
                            //   color: Color.fromRGBO(0, 160, 227, 1),
                            //   textColor: Colors.white,
                            //   child: Text("Record Sound",
                            //       style: TextStyle(fontSize: 15)),
                            // )
                            // TextButton(
                            //   child: Text('Save'),
                            //   style: TextButton.styleFrom(
                            //     primary: Colors.white,
                            //     backgroundColor: Colors.blueAccent[700],
                            //     onSurface: Colors.grey,
                            //   ),
                            //   onPressed: () async {
                            //     //print("ENTRO AL METODO");

                            //     svg.value = control.toSvg(
                            //       color: Colors.blueGrey,
                            //       size: 2.0,
                            //       maxSize: 15.0,
                            //       type: SignatureDrawType.shape,
                            //     );

                            //     rawImage.value = await control.toImage(
                            //       color: Colors.blueAccent,
                            //     );
                            //     //print(rawImage.value);

                            //     // Navigator.push(
                            //     //   context,
                            //     //   MaterialPageRoute(
                            //     //     builder: (context) {
                            //     //       return RecordScreen();
                            //     //     },
                            //     //   ),
                            //     // );
                            //   },
                            // ),
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
      ),
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
