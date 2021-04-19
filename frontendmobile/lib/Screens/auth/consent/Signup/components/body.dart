import 'package:SmartConsent/Screens/pdfViewer/components/pdfBody.dart';
import 'package:SmartConsent/Screens/video/video.dart';
import 'package:SmartConsent/components/recordAudio.dart';
import 'package:flutter/material.dart';
// import 'package:SmartConsent/Screens/auth/consent/Login/components/background.dart';
// import 'package:SmartConsent/Screens/Signup/components/background.dart';
import 'package:SmartConsent/Screens/auth/consent/Signup/components/background.dart';
import 'package:SmartConsent/components/rounded_button.dart';
import 'package:SmartConsent/components/rounded_input_field.dart';
import 'package:SmartConsent/components/rounded_password_field.dart';
import 'package:flutter_svg/svg.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "SINGUP",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: size.height * 0.03),
            SvgPicture.asset(
              "assets/images/isoTipo.svg",
              height: size.height * 0.18,
            ),
            RoundedInputField(
              hintText: "Enter your mail",
              onChanged: (value) {},
            ),
            RoundedPasswordField(
              onChanged: (value) {},
            ),
            RoundedButton(
              text: "SINGUP",
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return PdfViewer();
                      // return AudioApp();
                    },
                  ),
                );
              },
            ),
            // SizedBox(height: size.height * 0.03),
            // AlreadyHaveAnAccountCheck(
            //   login: false,
            //   press: () {
            //     Navigator.push(
            //       context,
            //       MaterialPageRoute(
            //         builder: (context) {
            //           return LoginScreen();
            //         },
            //       ),
            //     );
            //   },
            // ),
            // OrDivider(),
            // Row(
            //   mainAxisAlignment: MainAxisAlignment.center,
            //   children: <Widget>[
            //     SocalIcon(
            //       iconSrc: "assets/icons/facebook.svg",
            //       press: () {},
            //     ),
            //     SocalIcon(
            //       iconSrc: "assets/icons/twitter.svg",
            //       press: () {},
            //     ),
            //     SocalIcon(
            //       iconSrc: "assets/icons/google-plus.svg",
            //       press: () {},
            //     ),
            //   ],
            // )
          ],
        ),
      ),
    );
  }
}
