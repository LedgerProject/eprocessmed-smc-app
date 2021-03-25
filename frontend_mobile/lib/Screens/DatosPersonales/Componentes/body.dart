import 'package:SmartConsent/Screens/video/video.dart';
import 'package:SmartConsent/components/app_bar.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

class DatosPersonalesBody extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var accept;
    return Scaffold(
        appBar: appBar(context, ''),
        body: Container(
          child: SingleChildScrollView(
              child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Align(
                  alignment: Alignment.center,
                  child: Text(
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.This is simply text, Lorem Ipsum is simply dummy text of the printing and typesetting industry.This is simply text,Lorem Ipsum is simply dummy text of the printing and typesetting industry.This is simply text',
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
                    child: Radio(
                      value: 'My data is correct',
                      groupValue: accept,
                      onChanged: (value) {
                        accept = value;
                        toast("$accept Select");
                      },
                    ),
                  ),
                  Text('Correct data', style: primaryTextStyle()),
                  Theme(
                    data: Theme.of(context).copyWith(
                      unselectedWidgetColor: Color(0xFF0083bb),
                    ),
                    child: Radio(
                      value: 'Correct my data',
                      groupValue: accept,
                      onChanged: (value) {
                        accept = value;
                        toast("Reject");
                        setState(() {
                          accept = value;
                        });
                      },
                    ),
                  ),
                  Text('Correct my data', style: primaryTextStyle()),
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
                          return Video();
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
