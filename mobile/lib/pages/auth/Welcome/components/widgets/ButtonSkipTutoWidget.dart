import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

class ButtonSkip extends StatefulWidget {
  static String tag = '/BankingButton';
  var textContent;
  VoidCallback onPressed;
  var isStroked = false;
  var height = 50.0;
  var radius = 5.0;

  ButtonSkip(
      {@required this.textContent,
      @required this.onPressed,
      this.isStroked = false,
      this.height = 45.0,
      this.radius = 5.0});

  @override
  ButtonSkipState createState() => ButtonSkipState();
}

class ButtonSkipState extends State<ButtonSkip> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onPressed,
      child: Container(
        height: widget.height,
        padding: EdgeInsets.fromLTRB(16, 4, 16, 4),
        alignment: Alignment.center,
        child: Text(
          widget.textContent.toUpperCase(),
          style: primaryTextStyle(
              color: widget.isStroked ? Color(0xFF0083bb) : Color(0xFFFFFFFF),
              size: 18,
              fontFamily: 'Medium'),
        ).center(),
        // decoration: widget.isStroked ? BoxDecoration(bgColor: Colors.transparent, color: Banking_Primary) : boxDecoration(bgColor: Banking_Secondary, radius: widget.radius),
      ),
    );
  }
}
