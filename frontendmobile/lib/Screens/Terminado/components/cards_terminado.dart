/// Flutter code sample for Card

// This sample shows creation of a [Card] widget that shows album information
// and two actions.

import 'package:SmartConsent/Screens/pdfViewer/components/pdfBody.dart';
import 'package:flutter/material.dart';
import 'package:SmartConsent/Screens/NewSmartConsent/new_smart_consent.dart';

/// This is the main application widget.

/// This is the stateless widget that the main application instantiates.
class CardsTerminadoPdf extends StatelessWidget {
  CardsTerminadoPdf({Key key}) : super(key: key);
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
              leading: Icon(Icons.picture_as_pdf, color: Color(0xFF0083bb)),
              title: Text(
                'View PDF',
                style: TextStyle(color: Color(0xFF0083bb)),
              ),
              subtitle: Text('Check the Pdf of the consent.',
                  style: TextStyle(color: Color(0xFF0083bb))),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                TextButton(
                  child: const Text(
                    'start',
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return PdfViewer();
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
