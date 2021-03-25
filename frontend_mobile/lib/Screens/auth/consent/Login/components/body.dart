import 'package:SmartConsent/Screens/FirmaPaciente/firma_paciente.dart';
import 'package:SmartConsent/Screens/auth/consent/Login/login_screen.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:SmartConsent/services/rest_api.dart';

import 'package:flutter/material.dart';
// import 'package:SmartConsent/Screens/Login/components/background.dart';
// import 'package:SmartConsent/Screens/Signup/signup_screen.dart';
import 'package:SmartConsent/Screens/auth/consent/Welcome/components/background.dart';
import 'package:SmartConsent/Screens/home/home_screen.dart';
import 'package:SmartConsent/components/already_have_an_account_acheck.dart';
import 'package:SmartConsent/components/rounded_button.dart';
import 'package:SmartConsent/components/rounded_input_field.dart';
import 'package:SmartConsent/components/rounded_password_field.dart';
import 'package:flutter_svg/svg.dart';
import 'package:nb_utils/nb_utils.dart';

BuildContext contextGlobal;

class Body extends StatelessWidget {
  var login;
  var password;
  bool status = false;

  void auth() async {
    final userProvider = new UserProvider();
    await userProvider.authRequest(login, password).then((value) {
      print('valores de retorno$value');
    });
  }

  void correctUser() async {
    final result = await Navigator.push(
      contextGlobal,
      MaterialPageRoute(builder: (context) => HomeScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "Login",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: size.height * 0.03),
            SvgPicture.asset(
              "assets/images/isoTipo.svg",
              height: size.height * 0.18,
            ),
            SizedBox(height: size.height * 0.03),
            RoundedInputField(
              hintText: "Enter your mail",
              onChanged: (value) {
                login = value;
              },
            ),
            RoundedPasswordField(
              onChanged: (value) {
                password = value;
              },
            ),
            RoundedButton(
              text: "Login",
              press: () {
                contextGlobal = context;
                auth();
              },
            ),
            SizedBox(height: size.height * 0.03),
            // AlreadyHaveAnAccountCheck(
            //   press: () {
            // Navigator.push(
            //   context,
            //   MaterialPageRoute(
            //     builder: (context) {
            //       return SignUpScreen();
            //     },
            //   ),
            // );
            //   },
            // ),
          ],
        ),
      ),
    );
  }
}
