import 'package:SmartConsent/services/post.dart';
import 'package:flutter/material.dart';
import 'package:SmartConsent/Pages/NewSmartConsent/new_smart_consent.dart';

class CardsPatient extends StatelessWidget {
  CardsPatient({Key key}) : super(key: key);

  void getData() async {
    await UserGetProvider().getUserRequest().then((value) {
      print('VALOR DE ENTRAD $value');
      // finish(context);
    }).catchError((e) {
      // isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topCenter,
      child: Card(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const ListTile(
              leading: ImageIcon(
                AssetImage("assets/images/logo.png"),
                size: 50,
                color: Color(0xFF3A5A98),
              ),
              title: Text(
                'Patients',
                style: TextStyle(color: Color(0xFF0083bb)),
              ),
              subtitle: Text('Enter and manage a new consent.',
                  style: TextStyle(color: Color(0xFF0083bb))),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                TextButton(
                  child: const Text(
                    'Start',
                  ),
                  onPressed: () {
                    getData();
                    // Menu();

                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return NewSmartConsent();
                        },
                      ),
                    );
                  },
                ),
                const SizedBox(width: 8),
                const SizedBox(width: 8),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
