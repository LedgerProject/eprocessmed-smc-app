import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  Profile({Key key}) : super(key: key);

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, 'Profile'),
      body: ListView(
        children: <Widget>[
          Container(
              child: Padding(
                padding: const EdgeInsets.all(5.0),
                child: Column(
                  children: <Widget>[
                    Container(
                      height: 90,
                      width: 90,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          width: 2,
                          color: Color(0xFF0083bb),
                        ),
                        image: DecorationImage(
                            image: CachedNetworkImageProvider(
                                'https://image.flaticon.com/icons/png/512/1738/1738691.png')),
                      ),
                    ),
                  ],
                ),
              ),
              height: 200.0,
              decoration: new BoxDecoration(
                color: Color(0xFF0083bb),
              ))
        ],
      ),
    );
  }
}
