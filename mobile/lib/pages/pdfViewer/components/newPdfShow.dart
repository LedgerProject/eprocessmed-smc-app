import 'package:SmartConsent/pages/Terminado/terminado.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:flutter/material.dart';
import 'package:advance_pdf_viewer/advance_pdf_viewer.dart';
import 'package:url_launcher/url_launcher.dart';

class NewPdf extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<NewPdf> {
  bool _isLoading = true;
  PDFDocument document;

  @override
  void initState() {
    super.initState();
    changePDF();
  }

  changePDF() async {
    setState(() => _isLoading = true);
    document = await PDFDocument.fromURL(
      "$urlPdfGeneral",
    );
    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: WillPopScope(
        onWillPop: () {
          _moveBack(
            context,
          );
        },
        child: Scaffold(
          appBar: AppBar(
            backgroundColor: Color(0xFF0083bb),
            leading: IconButton(
                icon: Icon(Icons.arrow_back),
                onPressed: () {
                  _moveBack(context);
                }),
            title: Text("PDF"),
          ),
          body: Center(
            child: _isLoading
                ? Center(child: CircularProgressIndicator())
                : PDFViewer(
                    document: document,
                    zoomSteps: 1,
                  ),
          ),
          floatingActionButton: FloatingActionButton(
            isExtended: true,
            onPressed: () {
              // Add your onPressed code here!
              _launchInBrowser();
            },
            child: const Icon(Icons.download),
            backgroundColor: Color(0xFF0083bb),
          ),
        ),
        // ignore: missing_return
      ),
    );
  }

  void _moveBack(BuildContext context) => Navigator.pop(context);

  Future<void> _launchInBrowser() async {
    if (await canLaunch(urlPdfGeneral)) {
      await launch(
        urlPdfGeneral,
        forceSafariVC: false,
        forceWebView: false,
        headers: <String, String>{'my_header_key': 'my_header_value'},
      );
    } else {
      throw 'Could not launch $urlPdfGeneral';
    }
  }
}
