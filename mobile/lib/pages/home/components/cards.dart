/// Flutter code sample for Card

// This sample shows creation of a [Card] widget that shows album information
// and two actions.

import 'package:SmartConsent/services/post.dart';
import 'package:flutter/material.dart';
import 'package:SmartConsent/Pages/NewSmartConsent/new_smart_consent.dart';

/// This is the main application widget.

/// This is the stateless widget that the main application instantiates.
class Cards extends StatelessWidget {
  Cards({Key key}) : super(key: key);

  void getData() async {
    // userProvider.authRequest(login, password);
    await UserGetProvider().getUserRequest().then((value) {
      // isLoading = false;
      print('VALOR DE ENTRAD $value');

      // finish(context);
    }).catchError((e) {
      // isLoading = false;
    });
  }
// rerecuperar parametros

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topCenter,
      child: Container(
        width: 200.0,
        height: 200.0,
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
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
                  'New Smart Consent',
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
      ),
    );
  }
}
