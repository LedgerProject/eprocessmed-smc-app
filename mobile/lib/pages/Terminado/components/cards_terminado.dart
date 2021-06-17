/// Flutter code sample for Card

// This sample shows creation of a [Card] widget that shows album information
// and two actions.

import 'package:SmartConsent/pages/pdfViewer/components/newPdfShow.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';
// import 'package:SmartConsent/Pages/NewSmartConsent/new_smart_consent.dart';

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
                    'View',
                  ),
                  onPressed: () {
                    if (urlPdfGeneral == null || urlGeneralService == '') {
                      toastLong("Generating pdf ..."
                          "please try again in a moment");
                    } else {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            // return PdfViewer();
                            return NewPdf();
                          },
                        ),
                      );
                    }
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
