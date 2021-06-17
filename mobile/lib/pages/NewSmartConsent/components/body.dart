import 'package:SmartConsent/models/UserModel.dart';
import 'package:SmartConsent/pages/AceptarConsent/aceptarConsent.dart';
// import 'package:SmartConsent/pages/home/components/body.dart';
import 'package:SmartConsent/pages/home/home_screen.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:SmartConsent/services/rest_api.dart';
import 'package:SmartConsent/widgets/app_bar.dart';
import 'package:SmartConsent/widgets/general_header.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:flutter/material.dart';
import 'package:footer/footer.dart';
// import 'package:SmartConsent/pages/Consent/consent.dart';
// import 'package:SmartConsent/components/app_bar.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:lite_rolling_switch/lite_rolling_switch.dart';

class bodyNewSmartConsent extends StatefulWidget {
  @override
  _bodyNewSmartConsentState createState() => _bodyNewSmartConsentState();
}

class _bodyNewSmartConsentState extends State<bodyNewSmartConsent> {
  var dataUserSelect;
  bool sort = true;
  bool loadData = false;

  var selected = [];
  List<user> selectedList = [];
  List<user> userdetails1 = [
    user(
      idUser: idUserecrypt,
      name: '$nameecrypt',
      lastname: '$lastnameecrypt',
      dni: '$dniecrypt',
      idSpecialist: 3,
      email: '$emailecrypt',
      phone: '$phoneecrypt',
    )
  ];

  var idUser,
      idSpecialist,
      dni,
      email,
      nameUser,
      lastname,
      phone,
      idstablishment;

  List<String> listOfCategory = ['Blanqueamiento', 'NONE'];
  List<String> listOfCategory2 = ['Anestesia Local', 'NONE'];
  List<String> listOfCategory3 = ['Fecundación In Vitro', 'NONE'];

  List<String> listEspecialiad = [
    'NONE',
    'Odontología',
    'Anestesiología',
    'Ginecología'
  ];

  static get id => null;

  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => getData());
  }

  void getData() async {
    GetPatients().getUserRequest().then((value) {
      print('*****valores de retorno*****  getUserRequest$value');
      if (value == null) {
        loadData = false;
        getData();
      } else {
        // Navigator.pushReplacement(context,
        //     MaterialPageRoute(builder: (BuildContext context) => super.widget));
        loadData = true;
      }
    });
    GetPantallasYConsentimientos().getPantallasYConsents().then((value) {
      print('*****valores de retorno getPantallasYConsents***** $value');
    });
    ProcessProvider().getSpecialities().then((value) {
      print('*****valores de retorno getSpecialities GetPatients ***** $value');
    });

    // setState(() {});
  }

  onSelectedRow(bool selected, user data) async {
    setState(() {
      if (selected) {
        selectedList.add(data);
      } else {
        selectedList.remove(data);
      }
    });
  }

  onSortColumn(int columnIndex, bool ascending) {
    if (columnIndex == 1) {
      if (ascending) {
        userdetails1.sort((a, b) => a.name.compareTo(b.name));
      } else {
        userdetails1.sort((a, b) => b.name.compareTo(a.name));
      }
    }
  }

  String selectedIndexCategory = 'NONE';
  String selectedIndexCategorySpecialist = 'NONE';
  var textBtn = 'Present Smart Consent';
  var patientSelect;
  var patientId;
  var patientDni; //seleccionar indice de la list de arriba
  var usernameCont = TextEditingController();
  var usernameFocus = FocusNode();
  List<bool> isSelected = List.generate(2, (_) => false);
  @override
  Widget build(BuildContext context) {
    Widget mHeading(var value) {
      return Text(value);
    }

    Widget userList(List<UserModel> data) {
      return ListView.builder(
        itemCount: data.length,
        shrinkWrap: true,
        padding: EdgeInsets.fromLTRB(8, 8, 8, 70),
        itemBuilder: (context, index) {
          return Container(
            margin: EdgeInsets.all(8),
            padding: EdgeInsets.all(8),
            // decoration: boxDecorationRoundedWithShadow(8, backgroundColor: appStore.appBarColor),
            child: Row(
              children: [
                // NetworkImage(data[index].avatar_url,  ).cornerRadiusWithClipRRect(50),
                // 10.width,
                Text(data[index].login),
              ],
            ),
          );
        },
      );
    }

    Widget WidgetSelect() {
      if (loadData == true) {
        return DataTable(
          // sortAscending: sort,
          sortColumnIndex: 1,
          columns: <DataColumn>[
            DataColumn(label: mHeading('ID'), tooltip: 'ID'),
            DataColumn(
              label: mHeading('Name'),
              onSort: (columnIndex, ascending) {
                setState(() {
                  sort = !sort;
                });
                onSortColumn(columnIndex, ascending);
              },
            ),
            DataColumn(label: mHeading('DNI')),
          ],

          rows: userdetails1
              .map(
                (data) => DataRow(
                  cells: [
                    DataCell(
                      Text(
                        data.idUser.toString(),
                      ),
                      // ignore: sdk_version_set_literal
                      onTap: () => {
                        idUser = data.idUser,
                        nameUser = data.name,
                        lastname = data.lastname,
                        phone = data.phone,
                        dni = data.dni,
                        email = data.email,
                        idSpecialist = data.idSpecialist,
                        dataUserSelect = data,
                        patientSelect = data.name,

                        print(data.idUser),
                        // toastLong(
                        //     'selected patient $patientSelect'),
                      },
                    ),
                    DataCell(
                        Text(
                          data.name,
                        ),
                        // ignore: sdk_version_set_literal
                        onTap: () => {
                              idUser = data.idUser,
                              nameUser = data.name,
                              lastname = data.lastname,
                              phone = data.phone,
                              dni = data.dni,
                              email = data.email,
                              idSpecialist = data.idSpecialist,
                              dataUserSelect = data,
                              patientSelect = data.name,
                              print(data.idUser),
                              toastLong('selected patient $patientSelect'),
                            }),
                    DataCell(
                        Text(
                          data.dni,
                        ),
                        // ignore: sdk_version_set_literal
                        onTap: () => {
                              idUser = data.idUser,
                              nameUser = data.name,
                              lastname = data.lastname,
                              phone = data.phone,
                              dni = data.dni,
                              email = data.email,
                              idSpecialist = data.idSpecialist,
                              dataUserSelect = data,
                              patientSelect = data.name,
                              print(data.idUser),
                              toastLong('selected patient $patientSelect')
                            }),
                  ],
                ),
              )
              .toList(),
        );
      } else {
        return CircularProgressIndicator(
          semanticsLabel: 'Linear progress indicator',
        );
      }
    }

    return Scaffold(
      appBar: appBar(context, 'New Consent'),
      body: ListView(
        children: [
          general_header("assets/images/new_smartConsent.png", 120,
              'Texto en ingles explicativo de la pantalla Texto en ingles explicativo de la pantalla Texto en ingles explicativo de la pantalla'),
          Container(
            // padding: EdgeInsets.all(2),
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(22.0),
                child: Column(
                  children: [
                    Align(
                      heightFactor: 2,
                      alignment: Alignment.bottomLeft,
                      child: Text(
                        'Specialty',
                        style:
                            TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                        textAlign: TextAlign.start,
                      ),
                    ),
                    Card(
                        elevation: 4,
                        child: DropdownButton(
                          isExpanded: true,
                          // dropdownColor: appStore.appBarColor,
                          value: selectedIndexCategorySpecialist,
                          // style: boldTextStyle(),
                          icon: Icon(
                            Icons.keyboard_arrow_down,
                            // color: appStore.iconColor,
                          ),
                          // underline: 0.height,
                          onChanged: (newValue) {
                            setState(() {
                              // toast(newValue);
                              selectedIndexCategorySpecialist = newValue;
                              // print(newValue);
                              switch (newValue) {
                                case 'Odontología':
                                  selected = listOfCategory;
                                  break;
                                case 'Anestesiología':
                                  selected = listOfCategory2;
                                  break;
                                case 'Ginecología':
                                  selected = listOfCategory3;
                                  break;
                                default:
                              }
                            });
                          },
                          items: listEspecialiad.map((category) {
                            return DropdownMenuItem(
                              child: Text(category),
                              value: category,
                            );
                          }).toList(),
                        )),
                    Align(
                      heightFactor: 2,
                      alignment: Alignment.bottomRight,
                      child: Text(
                        'Procedure',
                        style:
                            TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                        textAlign: TextAlign.start,
                      ),
                    ),
                    Card(
                        elevation: 4,
                        child: DropdownButton(
                          isExpanded: true,
                          // dropdownColor: appStore.appBarColor,
                          value: selectedIndexCategory,
                          // style: boldTextStyle(),
                          icon: Icon(
                            Icons.keyboard_arrow_down,
                            // color: appStore.iconColor,
                          ),
                          // underline: 0.height,
                          onChanged: (newValue) {
                            setState(() {
                              // toast(newValue);
                              selectedIndexCategory = newValue;
                            });
                          },
                          items: selected.map((category) {
                            return DropdownMenuItem(
                              child: Text(category),
                              value: category,
                            );
                          }).toList(),
                        )),
                    // Align(
                    //   heightFactor: 2,
                    //   alignment: Alignment.bottomLeft,
                    //   child: Text(
                    //     'Mostrar video',
                    //     style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                    //     textAlign: TextAlign.start,
                    //   ),
                    // ),
                    // Card(
                    //     elevation: 4,
                    //     child: DropdownButton(
                    //       isExpanded: true,
                    //       // dropdownColor: appStore.appBarColor,
                    //       value: selectedIndexCategory,
                    //       // style: boldTextStyle(),
                    //       icon: Icon(
                    //         Icons.keyboard_arrow_down,
                    //         // color: appStore.iconColor,
                    //       ),
                    //       // underline: 0.height,
                    //       onChanged: (newValue) {
                    //         setState(() {
                    //           // toast(newValue);
                    //           selectedIndexCategory = newValue;
                    //         });
                    //       },
                    //       items: listOfCategory.map((category) {
                    //         return DropdownMenuItem(
                    //           child: Text(category),
                    //           value: category,
                    //         );
                    //       }).toList(),
                    //     )),
                    Align(
                      heightFactor: 2,
                      alignment: Alignment.center,
                      child: Text(
                        'Patients',
                        style:
                            TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                        textAlign: TextAlign.start,
                      ),
                    ), // FutureBuilder<List<UserModel>>(
                    //   // future: getUser(),
                    //   builder: (context, snapshot) {
                    //     if (snapshot.hasError) return Text(snapshot.error);
                    //     if (snapshot.hasData) return userList(snapshot.data);
                    //     return loadingWidgetMaker();
                    //   },
                    // ),
                    TextFormField(
                      controller: usernameCont,
                      focusNode: usernameFocus,
                      // style: primaryTextStyle(),
                      decoration: InputDecoration(
                        prefixIcon: Icon(
                          Icons.search,
                          color: Color(0xFF0083bb),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(25.0),
                          borderSide: BorderSide(color: Color(0xFF0083bb)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(25.0),
                          borderSide: BorderSide(color: Color(0xFF0083bb)),
                        ),
                        labelText: 'Search patient',
                        // labelStyle: primaryTextStyle(sty),
                      ),
                      cursorColor: Color(0xFF0083bb),
                      keyboardType: TextInputType.name,
                      validator: (s) {
                        if (s.trim().isEmpty) return 'Search fail';
                        // if (!s.trim().isAlpha()) return 'Username is not valid';
                        return null;
                      },
                    ),

                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Container(
                        padding: EdgeInsets.all(10),
                        child: WidgetSelect(),
                      ),
                    ),
                    Text('Sign home'),
                    Divider(),

                    LiteRollingSwitch(
                      //initial value
                      value: false,
                      textOn: 'Sí',
                      textOff: 'No',
                      colorOn: Colors.greenAccent[700],
                      colorOff: Colors.redAccent[700],
                      iconOn: Icons.done,
                      iconOff: Icons.remove_circle_outline,
                      textSize: 16.0,
                      onChanged: (bool state) {
                        //Use it to manage the different states
                        print('Current State of SWITCH IS: $state');
                        if (state == true) {
                          this.textBtn = 'Sign home';
                          _showMyDialog();
                        } else {
                          this.textBtn = 'Present Smart Consent';
                        }
                      },
                    ),
                    Divider(),
                    Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(50),
                        gradient: LinearGradient(colors: [
                          Color(0xFF0083bb),
                          Color(0xFF0083bb),
                        ]),
                      ),
                      child: MaterialButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) {
                                  if (dataUserSelect == null) {
                                    toast('choose a patient');
                                    return bodyNewSmartConsent();
                                  } else {
                                    UserGenertaePdf().generateConsent(
                                        idUser,
                                        idSpecialist,
                                        dni,
                                        email,
                                        nameUser,
                                        lastname,
                                        phone,
                                        idstablishment);

                                    userNameGeneral = nameUser;
                                    emailGeneral = email;
                                    dniGeneral = dni;
                                    userLastnameGeneral = lastname;
                                    phoneGeneral = phone;
                                    idUserGeneral = idUser;
                                    idSpecialistGeneral = idSpecialist;
                                    // idStablishmentGeneral = idstablishment;

                                    return Consent();
                                  }
                                },
                              ),
                            );
                            // toast('Gradient Material button');
                          },
                          splashColor: Colors.transparent,
                          child: Text(
                            textBtn,
                            style: TextStyle(color: Color(0xFFFFFFFF)),
                            // style: primaryTextStyle(color: Colors.white),
                          )),
                    )
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _NormalText() {}
  // Widget SnackBar() {
  //   return ElevatedButton(
  //     onPressed: () {
  //       final snackBar = SnackBar(
  //         content: Text('Yay! A SnackBar!'),
  //         action: SnackBarAction(
  //           label: 'Undo',
  //           onPressed: () {
  //             // Some code to undo the change.
  //           },
  //         ),
  //       );

  //       // Find the ScaffoldMessenger in the widget tree
  //       // and use it to show a SnackBar.
  //       ScaffoldMessenger.of(context).showSnackBar(snackBar);
  //     },
  //     child: Text('Show SnackBar'),
  //   );
  // }

  Future<void> _showMyDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Sign home'),
          content: SingleChildScrollView(
            child: ListBody(
              children: const <Widget>[
                Text('The patient will be notified to make a signature'),
                Text('You´re sure?'),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Continue'),
              onPressed: () {
                Navigator.of(context).pop();
                if (dataUserSelect == null) {
                  toast('choose a patient');
                  return bodyNewSmartConsent();
                } else {
                  SendFirma().generarFirma(idUser, idSpecialist, dni, email,
                      nameUser, lastname, phone, idstablishment);
                  _showMyDialogConfirmation();
                }
              },
            ),
            TextButton(
              child: const Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> _showMyDialogConfirmation() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Sign home'),
          content: SingleChildScrollView(
            child: ListBody(
              children: const <Widget>[
                Text('Is done '),
                Icon(
                  Icons.check_circle,
                  color: Colors.green,
                )
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Continue'),
              onPressed: () {
                Navigator.of(context).pop();
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) {
                    return HomeScreen();
                  }),
                );
              },
            ),
          ],
        );
      },
    );
  }
}

class user {
  int idUser, idSpecialist, idStablishment;
  String dni, email, name, lastname, phone;

  user(
      {this.idUser,
      this.idSpecialist,
      this.dni,
      this.email,
      this.name,
      this.lastname,
      this.phone,
      this.idStablishment});
}

Widget loadingWidgetMaker() {
  return Container(
    alignment: Alignment.center,
    child: Card(
      semanticContainer: true,
      clipBehavior: Clip.antiAliasWithSaveLayer,
      elevation: 4,
      margin: EdgeInsets.all(4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50.0)),
      child: Container(
        width: 45,
        height: 45,
        padding: EdgeInsets.all(8.0),
        child: CircularProgressIndicator(strokeWidth: 3),
      ),
    ),
  );
}
