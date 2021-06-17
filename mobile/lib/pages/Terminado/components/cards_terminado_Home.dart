/// Flutter code sample for Card

// This sample shows creation of a [Card] widget that shows album information
// and two actions.

import 'package:SmartConsent/pages/home/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:SmartConsent/pages/NewSmartConsent/new_smart_consent.dart';

/// This is the main application widget.

/// This is the stateless widget that the main application instantiates.
class CardsTerminadoHome extends StatelessWidget {
  CardsTerminadoHome({Key key}) : super(key: key);
// rerecuperar parametros

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topCenter,
      child: Card(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const ListTile(
              leading: Icon(Icons.home, color: Color(0xFF0083bb)),
              title: Text(
                'Return home',
                style: TextStyle(color: Color(0xFF0083bb)),
              ),
              // subtitle: Text('Ingresa y gestiona un nuevo consentimiento.',
              //     style: TextStyle(color: Color(0xFF0083bb))),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                TextButton(
                  child: const Text(
                    'Return home',
                  ),
                  onPressed: () {
                    // return Navigator.of(context).pushAndRemoveUntil(
                    //     MaterialPageRoute(builder: (context) => this),
                    //     (route) => route == null);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return HomeScreen();
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
