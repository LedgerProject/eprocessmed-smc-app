// import 'package:flutter/material.dart';

// class BodyHome extends StatelessWidget {
import 'package:SmartConsent/Screens/home/components/cards.dart';

import 'package:flutter/material.dart';

import 'package:nb_utils/nb_utils.dart';

// }
class BodyHome extends StatelessWidget {
  static const String _title = 'Flutter Code Sample';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: MyStatelessWidget(),
    );
  }
}

class MyStatelessWidget extends StatelessWidget {
  MyStatelessWidget({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        brightness: Brightness.dark,
        bottomOpacity: 0.0,
        elevation: 0.0,
        backgroundColor: Color(0xFF0083bb),
        title: const Text(
          'Home',
          style: TextStyle(color: Color(0xFFFFFFFF)),
        ),
        actions: <Widget>[
          IconButton(
            color: Color(0xFFFFFFFF),
            iconSize: 45,
            icon: const Icon(Icons.account_circle),
            tooltip: 'Perfil de usuario',
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(
                builder: (BuildContext context) {
                  return Scaffold(
                    appBar: AppBar(
                      iconTheme: IconThemeData(color: Color(0xFF0083bb)),
                      bottomOpacity: 0.0,
                      elevation: 0.0,
                      backgroundColor: Color(0xFFFFFFFF),
                      title: const Text(
                        'Perfil de usuario',
                        style: TextStyle(color: Color(0xFF0083bb)),
                      ),
                    ),
                    body: const Align(
                      alignment: Alignment.topCenter,
                      child: IconButton(
                        iconSize: 245,
                        icon: const Icon(Icons.account_circle,
                            color: Color(0xFF0083bb)),
                      ),
                    ),
                  );
                },
              ));
            },
          ),
        ],
      ),
      body: ListView(
        children: <Widget>[Cards()],
      ),

      // body: const Center(
      //   child: Text(
      //     'This is the home page',
      //     style: TextStyle(fontSize: 24),
      //   ),
      // ),
    );
  }
}
