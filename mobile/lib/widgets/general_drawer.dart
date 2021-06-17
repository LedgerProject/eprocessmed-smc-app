import 'package:SmartConsent/models/DrawerModel.dart';
import 'package:SmartConsent/pages/Perfil/profile.dart';
import 'package:SmartConsent/pages/auth/Login/login_screen.dart';
import 'package:SmartConsent/utils/itemsDrawer.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:SmartConsent/widgets/menu.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

class DrawerGeneral extends StatefulWidget {
  DrawerGeneral({Key key}) : super(key: key);

  @override
  DrawerGeneralState createState() => DrawerGeneralState();
}

class DrawerGeneralState extends State<DrawerGeneral> {
  List<DrawerList> drawerList = getDrawerList();

  @override
  void initState() {
    super.initState();
    init();
  }

  Future<void> init() async {
    //
  }

  @override
  void setState(fn) {
    if (mounted) super.setState(fn);
  }

  @override
  Widget build(context) {
    return ClipPath(
      clipper: OvalRightBorderClipper(),
      clipBehavior: Clip.antiAliasWithSaveLayer,
      child: Drawer(
        child: Container(
          padding: const EdgeInsets.only(left: 16.0, right: 40),
          decoration: BoxDecoration(
              // color: appStore.appBarColor,
              ),
          width: 300,
          child: SafeArea(
            child: SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  Container(
                    alignment: Alignment.centerRight,
                    child: IconButton(
                      icon: Icon(
                        Icons.power_settings_new,
                        // color: appStore.textPrimaryColor,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) {
                            return LoginScreen();
                          }),
                        );
                      },
                    ),
                  ),
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
                  SizedBox(height: 5.0),
                  Text(
                    "$nameSpecialist",
                    style: TextStyle(
                        fontSize: 18.0,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF0083bb)),
                  ),
                  Text(
                    "$mailActualEspecialista",
                    style: TextStyle(fontSize: 12.0, color: Color(0xFF0083bb)),
                  ),
                  30.height,
                  Container(
                    padding: EdgeInsets.only(bottom: 16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: drawerList.map((e) {
                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(e.name,
                                        style: primaryTextStyle(
                                            color: Color(0xFF0083bb)))
                                    .paddingAll(8),
                                Divider(),
                              ],
                            ).onTap(() {
                              finish(context);
                              e.widget.launch(context);
                            });
                          }).toList(),
                        ).paddingAll(8),
                        16.height,
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
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
}
