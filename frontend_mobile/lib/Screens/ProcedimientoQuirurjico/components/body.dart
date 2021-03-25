import 'package:SmartConsent/Screens/FirmaPaciente/firma_paciente.dart';
import 'package:SmartConsent/components/app_bar.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

enum SingingCharacter { Accept, Reject }

class ProcedimientoQuiruBody extends StatelessWidget {
  SingingCharacter _character = SingingCharacter.Accept;
  @override
  Widget build(BuildContext context) {
    var accept;
    return Scaffold(
        appBar: appBar(context, 'Surgical procedure'),
        body: Container(
          child: SingleChildScrollView(
              child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Align(
                  alignment: Alignment.center,
                  child: Text(
                    'Do you accept or reject the surgical procedure?                                                                                                                                                                   As explained in the video presenting through this application you accept or reject the performance of the X procedure, confirm it by checking the acceptance or rejection button.',
                    style: TextStyle(color: Color(0xFF0083bb), fontSize: 18),
                  ),
                ),
              ),
              Divider(),
              Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                alignment: WrapAlignment.start,
                direction: Axis.horizontal,
                children: [
                  Theme(
                    data: Theme.of(context)
                        .copyWith(unselectedWidgetColor: Color(0xFF0083bb)),
                    child: Radio<SingingCharacter>(
                      value: SingingCharacter.Accept,
                      groupValue: _character,
                      onChanged: (SingingCharacter value) {
                        _character = SingingCharacter.Accept;
                        toast("$accept");
                      },
                    ),
                  ),
                  Text('Accept', style: primaryTextStyle()),
                  Theme(
                    data: Theme.of(context).copyWith(
                      unselectedWidgetColor: Color(0xFF0083bb),
                    ),
                    child: Radio<SingingCharacter>(
                      value: SingingCharacter.Reject,
                      groupValue: _character,
                      onChanged: (SingingCharacter value) {
                        _character = SingingCharacter.Reject;
                        toast("$accept");
                      },
                    ),
                  ),
                  Text('Not accepted', style: primaryTextStyle()),
                ],
              ),
              Divider(),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  gradient: LinearGradient(colors: [
                    Color(0xFF0083bb),
                    Color(0xFF0083bb),
                  ]),
                ),
                child: MaterialButton(
                  onPressed: () {
                    // _incrementCounter();
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          // if (number >= 4) {
                          //   return Consent(numerArray: number);
                          // } else {
                          //   number = numerArray + 1;
                          //   print('number$number');
                          //   return Consent(numerArray: number);
                          // }
                          return FirmaPaciente();
                        },
                      ),
                    );
                    // toast('Gradient Material button');
                  },
                  splashColor: Colors.transparent,
                  child: Text(
                    'Next',
                    style: TextStyle(color: Color(0xFFFFFFFF)),
                    // style: primaryTextStyle(color: Colors.white),
                  ),
                ),
              )
            ],
          )),
        ));
  }

  void setState(Null Function() param0) {}
}
