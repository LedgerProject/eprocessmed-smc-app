import 'package:SmartConsent/pages/Perfil/profile.dart';
import 'package:flutter/material.dart';
import 'package:SmartConsent/models/DrawerModel.dart';

List<DrawerList> getDrawerList() {
  List<DrawerList> drawerList = [];
  drawerList.add(DrawerList(name: "Profile", widget: Profile()));

  return drawerList;
}
