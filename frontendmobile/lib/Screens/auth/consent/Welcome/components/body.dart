import 'package:flutter/material.dart';
import 'package:SmartConsent/Screens/auth/consent/Login/login_screen.dart';
import 'package:SmartConsent/Screens/auth/consent/Signup/signup_screen.dart';
import 'package:SmartConsent/Screens/auth/consent/Welcome/components/background.dart';
import 'package:SmartConsent/components/rounded_button.dart';
import 'package:SmartConsent/constants.dart';
import 'package:flutter_svg/svg.dart';
import 'package:flutter/services.dart';

// class Body extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     // This size provide us total height and width of our screen
//     return Background(
//       child: SingleChildScrollView(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: <Widget>[
//             Text(
//               "Bienvenido a e-processmed",
//               style: TextStyle(fontWeight: FontWeight.bold),
//             ),
//             SizedBox(height: size.height * 0.05),
//             SvgPicture.asset(
//               "assets/images/EprocessIcon.svg",
//               height: size.height * 0.45,
//             ),
//             SizedBox(height: size.height * 0.05),
//             RoundedButton(
//               text: "Iniciar Sesión",
//               press: () {
//                 Navigator.push(
//                   context,
//                   MaterialPageRoute(
//                     builder: (context) {
//                       return LoginScreen();
//                     },
//                   ),
//                 );
//               },
//             ),
//             RoundedButton(
//               text: "Regitrarse",
//               color: kPrimaryLightColor,
//               textColor: Colors.black,
//               press: () {
//                 Navigator.push(
//                   context,
//                   MaterialPageRoute(
//                     builder: (context) {
//                       return SignUpScreen();
//                     },
//                   ),
//                 );
//               },
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:SmartConsent/Screens/auth/consent/Signup/signup_screen.dart';
import 'package:SmartConsent/Screens/auth/consent/Welcome/components/DefaultLayout.dart';
import 'package:SmartConsent/Screens/auth/consent/Welcome/components/widgets/ButtonSkipTutoWidget.dart';
import 'package:liquid_swipe/liquid_swipe.dart';

class LiquidSwipeScreen extends StatefulWidget {
  static String tag = '/LiquidSwipeScreen';

  @override
  LiquidSwipeScreenState createState() => LiquidSwipeScreenState();
}

class LiquidSwipeScreenState extends State<LiquidSwipeScreen> {
  List<String> titles = [
    "SmartConsent",
    "SmartConsent",
    "SmartConsent",
  ];
  var subTitles = [
    "The first tool for the comprehensive management of Informed Consent in digital format. A tool with a high technological development, designed by and for health professionals.",
    "It is an easy and simple tool that presents the intervention to the patient with animated videos. In addition, it helps the professional by improving the administrative management of the clinic, digitizing the entire procedure.",
    "Eliminate all the manual process and associated costs since the informed consent is signed digitally, without the need for papers that can be lost or torn, apart from reducing administrative work."
  ];

  void changeColorBar(int page) {
    print('pagina actual $page');
    switch (page) {
      case 0:
        SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
          systemNavigationBarColor: Color(0xFF0083bb), // navigation bar color
          statusBarColor: Color(0xFF0083bb), // status bar color
        ));
        print('Color azul');
        break;
      case 1:
        SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
          systemNavigationBarColor: Color(0xFFB2D3DF), // navigation bar color
          statusBarColor: Color(0xFFB2D3DF), // status bar color
        ));
        print('Color blanco');
        break;
      case 2:
        SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
          systemNavigationBarColor: Color(0xFF0083bb), // navigation bar color
          statusBarColor: Color(0xFF0083bb), // status bar color
        ));
        print('Color azul');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    // changeStatusColor(appColorPrimary);
    Size size = MediaQuery.of(context).size;
    final pages = [
      DefaultLayout(
          title: titles[0],
          description: subTitles[0],
          colorText: Color(0xFFFFFFFF),
          color: Color(0xFF0083bb),
          imageLink: 'assets/images/img1.svg'),
      DefaultLayout(
        title: titles[1],
        description: subTitles[1],
        colorText: Color(0xFF0083bb),
        color: Color(0xFFB2D3DF),
        imageLink: 'assets/images/img2.svg',
      ),
      DefaultLayout(
        title: titles[2],
        description: subTitles[2],
        colorText: Color(0xFFFFFFFF),
        color: Color(0xFF0083bb),
        imageLink: 'assets/images/img3.svg',
      ),
      Background(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                "Welcome to SmartConsent",
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              SizedBox(height: size.height * 0.05),
              SvgPicture.asset(
                "assets/images/isoTipo.svg",
                height: size.height * 0.18,
              ),
              SizedBox(height: size.height * 0.05),
              RoundedButton(
                text: "Login",
                press: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return LoginScreen();
                      },
                    ),
                  );
                },
              ),
              RoundedButton(
                text: "Signup",
                color: kPrimaryLightColor,
                textColor: Colors.black,
                press: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return SignUpScreen();
                      },
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      )
    ];

    return Scaffold(
      body: LiquidSwipe(
        pages: pages,
        enableLoop: false,
        waveType: WaveType.liquidReveal,
        onPageChangeCallback: changeColorBar,
      ),
    );
  }
}
