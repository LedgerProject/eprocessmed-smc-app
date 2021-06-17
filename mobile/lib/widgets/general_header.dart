import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

// ignore: non_constant_identifier_names
Widget general_header(String img, double widthImg, String text) {
  return Container(
      child: Padding(
        padding: const EdgeInsets.all(5.0),
        child: Column(
          children: <Widget>[
            Container(
                margin: const EdgeInsets.only(left: 40.0, right: 20.0),
                child: Text(text, style: TextStyle(color: Colors.white))),
            Divider(
              color: Color(0x000083BB),
            ),
            Container(width: widthImg, child: Image(image: AssetImage(img)))
          ],
        ),
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
