import 'package:SmartConsent/Models/UserModel.dart';
import 'package:SmartConsent/Screens/AceptarConsent/aceptarConsent.dart';
import 'package:SmartConsent/services/post.dart';
import 'package:SmartConsent/services/rest_api.dart';
import 'package:flutter/material.dart';
// import 'package:SmartConsent/Screens/Consent/consent.dart';
import 'package:SmartConsent/components/app_bar.dart';
import 'package:nb_utils/nb_utils.dart';

class bodyNewSmartConsent extends StatefulWidget {
  @override
  _bodyNewSmartConsentState createState() => _bodyNewSmartConsentState();
}

class _bodyNewSmartConsentState extends State<bodyNewSmartConsent> {
  var dataUserSelect;
  bool sort = true;
  List<user> selectedList = [];
  List<user> userdetails1 = [
    user(
      id: '1',
      name: 'Daniel',
      dni: '0940526536',
    ),
    user(
      id: '2',
      name: 'Yonaider',
      dni: '0940526544',
    ),
    user(
      id: '3',
      name: 'Angi',
      dni: '09584930294',
    ),
  ];
  List<user> userdetails = [
    user(
      id: '1',
      name: 'Daniel',
      dni: '0940526536',
    ),
    user(
      id: '2',
      name: 'Yonaider',
      dni: '0940526544',
    ),
    user(
      id: '3',
      name: 'Angi',
      dni: '09584930294',
    ),
  ];
  List<String> listOfCategory = [
    'DENTAL IMPLANT PLACEMENT',
    'WHITENING',
    'SURGERY-PROSTHESIS',
    'PERIAPICAL SURGERY',
    'COVID 19 CONSENT',
    'CONSENT TO USE OF IMAGES',
    'BRUXIST CROWN',
    'UNITARY CROWN',
    'IMPLANTOLOGICAL SURGERY INFORMATION STATEMENT',
    'CONSCIOUS SEDATION INFORMATION STATEMENT',
    'DECEMENTED',
    'ELEVATION OF THE SINUS FLOOR',
    'ENDODONTICS',
    'EXODONTICS',
    'EXODONCIA OF CORDALES',
    'EXTRACTION',
    'PERIODONTITIS BRIDGE FIXATION',
    'SEDATION INSTRUCTIONS',
    'SEALINGS-RECONSTRUCTIONS',
    'CONSERVATIVE DENTISTRY',
    'DENTISTRY (PULPOTOMY)',
    'ORTHODONTICS',
    'INVISIBLE ORTHODONTICS',
    'FRACTURED PARTS',
    'DISCHARGE PLATE',
    'ADVANCE PROSTHESIS',
    'FIXED DENTAL PROSTHESIS',
    'NONE'
  ];

  List<String> listEspecialiad = [
    'ONTOLOGY DEMO - DENTISTRY',
  ];

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
  var patientSelect;
  var patientId;
  var patientDni; //seleccionar indice de la list de arriba
  var usernameCont = TextEditingController();
  var usernameFocus = FocusNode();
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

    return Scaffold(
      appBar: appBar(context, 'New Consent'),
      body: Container(
        // padding: EdgeInsets.all(2),
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(22.0),
            child: Column(
              children: [
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
                Align(
                  heightFactor: 2,
                  alignment: Alignment.bottomLeft,
                  child: Text(
                    'Specialista - Specialty',
                    style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                    textAlign: TextAlign.start,
                  ),
                ),
                Card(
                    elevation: 4,
                    child: DropdownButton(
                      isExpanded: true,
                      // dropdownColor: appStore.appBarColor,
                      value: 'ONTOLOGY DEMO - DENTISTRY',
                      // style: boldTextStyle(),
                      icon: Icon(
                        Icons.keyboard_arrow_down,
                        // color: appStore.iconColor,
                      ),
                      // underline: 0.height,
                      // onChanged: (newValue) {
                      //   setState(() {
                      //     // toast(newValue);
                      //     selectedIndexCategory = newValue;
                      //   });
                      // },
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
                    style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
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
                      items: listOfCategory.map((category) {
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
                    style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                    textAlign: TextAlign.start,
                  ),
                ),
                Divider(),
                // FutureBuilder<List<UserModel>>(
                //   // future: getUser(),
                //   builder: (context, snapshot) {
                //     if (snapshot.hasError) return Text(snapshot.error);
                //     if (snapshot.hasData) return userList(snapshot.data);
                //     return loadingWidgetMaker();
                //   },
                // ),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: DataTable(
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
                                  data.id,
                                ),
                                onTap: () => {
                                  dataUserSelect = data,
                                  patientSelect = data.name,
                                  print(data.id),
                                  toastLong('selected patient $patientSelect'),
                                },
                              ),
                              DataCell(
                                  Text(
                                    data.name,
                                  ),
                                  onTap: () => {
                                        dataUserSelect = data,
                                        patientSelect = data.name,
                                        print(data.id),
                                        toastLong(
                                            'selected patient $patientSelect')
                                      }),
                              DataCell(
                                  Text(
                                    data.dni,
                                  ),
                                  onTap: () => {
                                        dataUserSelect = data,
                                        patientSelect = data.name,
                                        print(data.id),
                                        toastLong(
                                            'selected patient $patientSelect')
                                      }),
                            ],
                          ),
                        )
                        .toList(),
                  ),
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
                              UserGenertaePdf().dataUSerData(
                                  dataUserSelect.name,
                                  'lastaname',
                                  dataUserSelect.dni,
                                  'time');
                              return Consent();
                            }
                          },
                        ),
                      );
                      // toast('Gradient Material button');
                    },
                    splashColor: Colors.transparent,
                    child: Text(
                      'Present Smart Consent',
                      style: TextStyle(color: Color(0xFFFFFFFF)),
                      // style: primaryTextStyle(color: Colors.white),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class user {
  String id;
  String name;
  String dni;

  user({
    this.id,
    this.name,
    this.dni,
  });
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
