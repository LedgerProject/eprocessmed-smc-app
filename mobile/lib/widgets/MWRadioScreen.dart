import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

class MWRadioScreen extends StatefulWidget {
  static String tag = '/MWRadioScreen';

  @override
  MWRadioScreenState createState() => MWRadioScreenState();
}

class MWRadioScreenState extends State<MWRadioScreen> {
  var gender;
  var gender1;

  @override
  void initState() {
    super.initState();
    init();
  }

  init() async {
    //
  }

  @override
  void setState(fn) {
    if (mounted) super.setState(fn);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          padding: EdgeInsets.all(16),
          child: Column(
            children: [
              Container(
                margin: EdgeInsets.only(bottom: 10),
                alignment: Alignment.topCenter,
                child: Text('choose an option', style: boldTextStyle(size: 18)),
              ),
              Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                alignment: WrapAlignment.start,
                direction: Axis.horizontal,
                children: [
                  Theme(
                    data: Theme.of(context)
                        .copyWith(unselectedWidgetColor: Color(0xFF0083bb)),
                    child: Radio(
                      value: 'Accept',
                      groupValue: gender,
                      onChanged: (value) {
                        setState(() {
                          gender = value;
                          toast("$gender Selected");
                        });
                      },
                    ),
                  ),
                  Text('Accept', style: primaryTextStyle()),
                  Theme(
                    data: Theme.of(context).copyWith(
                      unselectedWidgetColor: Color(0xFF0083bb),
                    ),
                    child: Radio(
                      value: 'Reject',
                      groupValue: gender,
                      onChanged: (value) {
                        setState(() {
                          gender = value;
                          toast("$gender Selected");
                        });
                      },
                    ),
                  ),
                  Text('Reject', style: primaryTextStyle()),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
