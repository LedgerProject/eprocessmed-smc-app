import 'package:SmartConsent/pages/FirmaPaciente/firma_paciente.dart';
import 'package:SmartConsent/pages/auth/Login/components/background.dart';

import 'package:SmartConsent/pages/auth/Login/login_screen.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:SmartConsent/services/rest_api.dart';

import 'package:flutter/material.dart';

import 'package:SmartConsent/pages/home/home_screen.dart';
import 'package:SmartConsent/widgets/already_have_an_account_acheck.dart';
import 'package:SmartConsent/widgets/rounded_button.dart';
import 'package:SmartConsent/widgets/rounded_input_field.dart';
import 'package:SmartConsent/widgets/rounded_password_field.dart';
import 'package:flutter_svg/svg.dart';

BuildContext contextGlobal;

class LoginScreenBody extends StatelessWidget {
  var login;
  var password;
  bool status = false;

  void auth() async {
    final userProvider = new UserProvider();
    if (login != null && password != null) {
      await userProvider.authRequest(login, password).then((value) {
        print('valores de retorno$value');
      });
    } else {
      VoidAlertDialog();
      print('Valores null!!!!!');
    }
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
                // Navigator.push(
                //   context,
                //   MaterialPageRoute(
                //     builder: (context) {
                //       return HomeScreen();
                //     },
                //   ),
                // );
              },
            ),
            SizedBox(height: size.height * 0.03),
            // AlreadyHaveAnAccountCheck(
            //   press: () {
            //     // Navigator.push(
            //     //   context,
            //     //   MaterialPageRoute(
            //     //     builder: (context) {
            //     //       return SignUpScreen();
            //     //     },
            //     //   ),
            //     // );
            //   },
            // ),
          ],
        ),
      ),
    );
  }

  // ignore: non_constant_identifier_names
  Future<Widget> VoidAlertDialog() async {
    return AlertDialog(
      title: const Text('Credentials error'),
      content: SingleChildScrollView(
        child: ListBody(
          children: const <Widget>[
            Text('Incorrect email or password'),
          ],
        ),
      ),
      actions: <Widget>[
        TextButton(
          child: const Text('Ok'),
          onPressed: () {
            // Agregar alguna funcion
          },
        ),
      ],
    );
  }
}
