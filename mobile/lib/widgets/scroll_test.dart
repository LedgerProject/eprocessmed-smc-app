import 'package:flutter/material.dart';

class ScrollTest extends StatefulWidget {
  @override
  _ScrollTestState createState() => _ScrollTestState();
}

class _ScrollTestState extends State<ScrollTest> {
  ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    this._scrollController.addListener(() {
      print("Execute Listner..........");
    });
    super.initState();
  }

  @override
  void dispose() {
    this._scrollController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      controller: _scrollController,
      itemCount: 1,
      itemBuilder: (context, position) {
        return Text("Hello Developer~ $position");
      },
    );
  }
}
