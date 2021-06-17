// import 'package:flutter/material.dart';

// class BodyHome extends StatelessWidget {
import 'package:SmartConsent/Pages/home/components/cards.dart';
import 'package:SmartConsent/Pages/home/components/cards_List.dart';
import 'package:SmartConsent/Pages/home/components/cards_patient.dart';
import 'package:SmartConsent/pages/NewSmartConsent/components/body.dart';
import 'package:SmartConsent/pages/NewSmartConsent/components/new_smart_consent_body.dart';
import 'package:SmartConsent/pages/auth/Login/login_screen.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:SmartConsent/widgets/general_drawer.dart';
import 'package:SmartConsent/widgets/general_header.dart';
import 'package:cached_network_image/cached_network_image.dart';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import 'package:nb_utils/nb_utils.dart';

// }
class HomeScreenBody extends StatefulWidget {
  static const String _title = 'Flutter Code Sample';

  @override
  State<HomeScreenBody> createState() => _HomeScreenBodyState();
}

class _HomeScreenBodyState extends State<HomeScreenBody> {
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => getData());
  }

  void getData() async {
    GetPatients().getUserRequest().then((value) {
      print('*****valores de retorno*****  getUserRequest$value');
    });
    // setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: HomeScreenBody._title,
      home: MyStatelessWidget(),
    );
  }
}

class MyStatelessWidget extends StatelessWidget {
  MyStatelessWidget({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        brightness: Brightness.dark,
        bottomOpacity: 0.0,
        elevation: 0.0,
        backgroundColor: Color(0xFF0083bb),
        // leading: GestureDetector(
        //   onTap: () {
        //     print('Menu!!!!!!!!!!');
        //     // Navigator.pop(context);
        //   },
        //   child: Icon(
        //     Icons.menu, // add custom icons also
        //   ),
        // ),
      ),
      drawer: DrawerGeneral(),
      body: Center(
        child: ListView(
          children: <Widget>[
            general_header("assets/images/doctorsHome.png", 190,
                'Texto en ingles explicativo de la pantalla '),
            getCards(context),
            getOnlyCards()
          ],
        ),
      ),
    );
  }

  // Cards

  Widget getCards(context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Row(
          children: [
            Expanded(
              flex: 1,
              child: Container(
                height: 200.0,
                child: Card(
                  margin: EdgeInsets.only(top: 16, bottom: 16, right: 16),
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(16))),
                  child: InkWell(
                    borderRadius: BorderRadius.all(Radius.circular(16)),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            return bodyNewSmartConsent();
                          },
                        ),
                      );
                    },
                    child: Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Center(
                            child: Container(
                              width: 100,
                              padding: const EdgeInsets.all(8.0),
                              child: Image(
                                  image: AssetImage(
                                      "assets/images/new_smartConsent.png")),
                            ),
                          ),
                          // Divider(),
                          Center(
                            child: Text('New Smart Consent',
                                style: TextStyle(color: Color(0xFF0083bb))),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            Expanded(
              flex: 1,
              child: Container(
                height: 200.0,
                child: Card(
                  margin: EdgeInsets.only(top: 16, bottom: 16, right: 16),
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(16))),
                  child: InkWell(
                    borderRadius: BorderRadius.all(Radius.circular(16)),
                    onTap: () {
                      //
                    },
                    child: Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Center(
                            child: Container(
                              width: 100,
                              padding: const EdgeInsets.all(8.0),
                              child: Image(
                                  image: AssetImage(
                                      "assets/images/list_patients.png")),
                            ),
                          ),
                          // Divider(),
                          Center(
                            child: Text(
                              'Patient List',
                              style: TextStyle(color: Color(0xFF0083bb)),
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget getOnlyCards() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Row(
          children: [
            Expanded(
              flex: 1,
              child: Container(
                width: 100.0,
                height: 180.0,
                child: Card(
                  margin: EdgeInsets.only(top: 1, bottom: 30, right: 16),
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(16))),
                  child: InkWell(
                    borderRadius: BorderRadius.all(Radius.circular(16)),
                    onTap: () {
                      //
                    },
                    child: Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Center(
                            child: Container(
                              width: 120,
                              padding: const EdgeInsets.all(8.0),
                              child: Image(
                                  image:
                                      AssetImage("assets/images/patients.png")),
                            ),
                          ),
                          // Divider(),
                          Center(
                            child: Text('Patients',
                                style: TextStyle(color: Color(0xFF0083bb))),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _header() {
    return Container(
        child: Padding(
          padding: const EdgeInsets.all(30.0),
          child: Image(image: AssetImage("assets/images/doctorsHome.png")),
        ),
        height: 200.0,
        decoration: new BoxDecoration(
          color: Color(0xFF0083bb),
          boxShadow: [new BoxShadow(blurRadius: 10.0)],
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(40),
          ),
        ));
  }

  Widget itemList(Widget icon, String title) {
    return Row(
      children: [
        icon,
        10.width,
        Text(
          title,
          style: TextStyle(color: Color(0xFF0083bb)),
        ),
      ],
    ).onTap(() {
      toast(title);
    });
  }

  Future<Widget> _menu() async {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: const <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text(
              'Drawer Header',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ListTile(
            leading: Icon(Icons.message),
            title: Text('Messages'),
          ),
          ListTile(
            leading: Icon(Icons.account_circle),
            title: Text('Profile'),
          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Settings'),
          ),
        ],
      ),
    );
  }
}

class OvalRightBorderClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0, 0);
    path.lineTo(size.width - 50, 0);
    path.quadraticBezierTo(
        size.width, size.height / 4, size.width, size.height / 2);
    path.quadraticBezierTo(size.width, size.height - (size.height / 4),
        size.width - 40, size.height);
    path.lineTo(0, size.height);
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) {
    return true;
  }
}
