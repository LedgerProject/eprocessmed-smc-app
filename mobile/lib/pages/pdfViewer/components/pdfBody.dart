import 'dart:async';
import 'dart:io';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:path_provider_linux/path_provider_linux.dart';

var urlG =
    'http://144.91.102.69:8080/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV';
// 'http://000.000.000.000:000/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV';

var urlG2 =
    'http://144.91.102.69:8080/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV';
// 'http://000.000.000.000:000/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV';

class PdfViewer extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class GetUrl {
  void getUrl(data, dataG2) {
    urlG = data;
    urlG2 = dataG2;
  }
}

class _MyAppState extends State<PdfViewer> {
  String pathPDF =
      "http://144.91.102.69:8080/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV";
  //"http://000.000.000.000:000/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV";
  @override
  void initState() {
    print('Datos init$urlG');
    super.initState();
    // createFileOfPdfUrl().then((f) {
    //   setState(() {
    //     pathPDF = f.path;
    //     print(pathPDF);
    //   });
    // });
  }

  // Future<File> createFileOfPdfUrl() async {
  //   final url =
  //       "http://144.91.102.69:8080/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV";
  //   final filename = url.substring(url.lastIndexOf("/") + 1);
  //   var request = await HttpClient().getUrl(Uri.parse(url));
  //   var response = await request.close();
  //   var bytes = await consolidateHttpClientResponseBytes(response);
  //   String dir = ('sdsdsd');
  //   File file = new File('$dir/$filename');
  //   await file.writeAsBytes(bytes);
  //   return file;
  // }

  // Future<void> _launchInWebViewOrVC(String url) async {
  //   if (await canLaunch(url)) {
  //     await launch(
  //       url,
  //       forceSafariVC: true,
  //       forceWebView: true,
  //       headers: <String, String>{'my_header_key': 'my_header_value'},
  //     );
  //   } else {
  //     throw 'Could not launch $url';
  //   }
  // }

  Future<void> _launchInWebViewWithJavaScript(String url) async {
    if (await canLaunch(url)) {
      await launch(
        url,
        forceSafariVC: true,
        forceWebView: true,
        enableJavaScript: true,
      );
    } else {
      throw 'Could not launch $url';
    }
  }

  Future<void> _launchInBrowser(String url) async {
    if (await canLaunch(url)) {
      await launch(
        url,
        forceSafariVC: false,
        forceWebView: false,
        headers: <String, String>{'my_header_key': 'my_header_value'},
      );
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, 'View PDF'),
      body: ListView(
        children: [
          // Center(
          //   child: RaisedButton(
          //       child: Text("Open pdf"),
          //       onPressed: () => {_launchInWebViewWithJavaScript(urlG)}
          //       // Navigator.push(
          //       //   context,
          //       //   MaterialPageRoute(builder: (context) => PDFScreen(pathPDF)),
          //       // ),
          //       ),
          // ),
          Divider(),
          Center(
            child: RaisedButton(
              onPressed: () => {_launchInBrowser(urlG)},
              child: Text(urlG),
            ),
          ),
          Divider(),
          Center(
            child: RaisedButton(
              onPressed: () => {_launchInBrowser(urlG2)},
              child: Text(urlG),
            ),
          ),
        ],
      ),
    );
  }
}

// class PDFScreen extends StatelessWidget {
//   String pathPDF =
//       "http://144.91.102.69:8080/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV";
//   PDFScreen(this.pathPDF);

//   // @override
//   // Widget build(BuildContext context) {
//   //   return PDFViewerScaffold(
//   //       appBar: AppBar(
//   //         title: Text(
//   //             "http://144.91.102.69:8080/ipfs/QmStXQUiCnp9itz2gDJwnmtepfdsHmpqL8Mjsrt6c4zPmV"),
//   //         actions: <Widget>[
//   //           // IconButton(
//   //           //   icon: Icon(Icons.share),
//   //           //   onPressed: () {},
//   //           // ),
//   //         ],
//   //       ),
//   //       path: pathPDF);
//   // }
// }

void _launchURL() async =>
    await canLaunch(urlG) ? await launch(urlG) : throw 'Could not launch $urlG';
