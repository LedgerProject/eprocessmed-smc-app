import 'package:flutter/material.dart';

// ignore: camel_case_types
// class appBarWidget extends StatefulWidget {
//   final String tittle;
//   const appBarWidget({
//     Key key,
//     this.tittle,
//   }) : super(key: key);

//   @override
//   _appBarWidgetState createState() => _appBarWidgetState();
// }

// class _appBarWidgetState extends State<appBarWidget> {
//   @override

//     );
//   }
// }
Widget appBar(BuildContext context, String title) {
  return AppBar(
    iconTheme: IconThemeData(color: Color(0xFFFFFFFF)),
    bottomOpacity: 0.0,
    elevation: 0.0,
    backgroundColor: Color(0xFF0083bb),
    title: Text(
      title,
      style: TextStyle(color: Color(0xFFFFFFFF)),
    ),
  );
}
