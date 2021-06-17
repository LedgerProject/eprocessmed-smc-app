// import 'package:SmartConsent/models/UserModel.dart';
// import 'package:SmartConsent/pages/AceptarConsent/aceptarConsent.dart';
// import 'package:SmartConsent/pages/NewSmartConsent/components/modal_select_patient.dart';
// import 'package:SmartConsent/pages/NewSmartConsent/components/new_smart_consent_DataTable.dart';
// import 'package:SmartConsent/pages/NewSmartConsent/components/new_smart_consent_card_body.dart';
// import 'package:SmartConsent/pages/home/components/home_screen_body.dart';

// import 'package:SmartConsent/pages/home/home_screen.dart';
// import 'package:SmartConsent/services/post.dart';
// import 'package:SmartConsent/services/rest_api.dart';
// import 'package:SmartConsent/widgets/general_drawer.dart';
// import 'package:SmartConsent/widgets/general_header.dart';
// import 'package:flutter/material.dart';
// // import 'package:SmartConsent/pages/Consent/consent.dart';
// import 'package:SmartConsent/widgets/app_bar.dart';
// import 'package:nb_utils/nb_utils.dart';
// import 'package:lite_rolling_switch/lite_rolling_switch.dart';

// class bodyNewSmartConsentNo extends StatefulWidget {
//   @override
//   bodyNewSmartConsentNoState createState() => bodyNewSmartConsentNoState();
// }

// class bodyNewSmartConsentNoState extends State<bodyNewSmartConsentNo> {
//   var dataUserSelect;
//   bool sort = true;

//   var selected = [];
//   List<user> selectedList = [];
//   List<user> userdetails1 = [
//     user(
//       id: '53',
//       name: '85d15a5fa6c6',
//       dni: 'e7831a0df79eeab5e023',
//     ),
//     user(
//       id: '54',
//       name: 'e7831a0df79eeab5e023',
//       dni: 'e7831a0df79eeab5e023',
//     ),
//     user(
//       id: '55',
//       name: 'e7831a0df79eeab5e023',
//       dni: 'e7831a0df79eeab5e023',
//     ),
//     user(
//       id: '56',
//       name: 'e7831a0df79eeab5e023',
//       dni: 'e7831a0df79eeab5e023',
//     ),
//     user(
//       id: '57',
//       name: '98db455abdccf9b4e125',
//       dni: '97d04157bc89efb4e125c28eaca9ee027b2633af8f',
//     ),
//   ];
//   List<user> userdetails = [
//     user(
//       id: '1',
//       name: 'Daniel',
//       dni: '0940526536',
//     ),
//     user(
//       id: '2',
//       name: 'Yonaider',
//       dni: '0940526544',
//     ),
//     user(
//       id: '3',
//       name: 'Angi',
//       dni: '09584930294',
//     ),
//   ];
//   List<String> listOfCategory = ['Blanqueamiento', 'NONE'];
//   List<String> listOfCategory2 = ['Anestesia Local', 'NONE'];
//   List<String> listOfCategory3 = ['Fecundación In Vitro', 'NONE'];

//   List<String> listEspecialiad = [
//     'NONE',
//     'Odontología',
//     'Anestesiología',
//     'Ginecología'
//   ];

//   void initState() {
//     super.initState();
//     WidgetsBinding.instance.addPostFrameCallback((_) => getData());
//   }

//   void getData() async {
//     // await PostService().getSpecialities().then((value) {
//     //   print('*****valores de retorno***** $value');
//     // });
//     await ProcessProvider().getSpecialities().then((value) {
//       print('*****valores de retorno***** $value');
//     });
//   }

//   onSelectedRow(bool selected, user data) async {
//     setState(() {
//       if (selected) {
//         selectedList.add(data);
//       } else {
//         selectedList.remove(data);
//       }
//     });
//   }

//   onSortColumn(int columnIndex, bool ascending) {
//     if (columnIndex == 1) {
//       if (ascending) {
//         userdetails1.sort((a, b) => a.name.compareTo(b.name));
//       } else {
//         userdetails1.sort((a, b) => b.name.compareTo(a.name));
//       }
//     }
//   }

//   String selectedIndexCategory = 'NONE';
//   String selectedIndexCategorySpecialist = 'NONE';
//   var textBtn = 'Present Smart Consent';
//   var patientSelect;
//   var patientId;
//   var patientDni; //seleccionar indice de la list de arriba
//   var usernameCont = TextEditingController();
//   var usernameFocus = FocusNode();
//   List<bool> isSelected = List.generate(2, (_) => false);
//   @override
//   Widget build(BuildContext context) {
//     Widget userList(List<UserModel> data) {
//       return ListView.builder(
//         itemCount: data.length,
//         shrinkWrap: true,
//         padding: EdgeInsets.fromLTRB(8, 8, 8, 70),
//         itemBuilder: (context, index) {
//           return Container(
//             margin: EdgeInsets.all(8),
//             padding: EdgeInsets.all(8),
//             // decoration: boxDecorationRoundedWithShadow(8, backgroundColor: appStore.appBarColor),
//             child: Row(
//               children: [
//                 // NetworkImage(data[index].avatar_url,  ).cornerRadiusWithClipRRect(50),
//                 // 10.width,
//                 Text(data[index].login),
//               ],
//             ),
//           );
//         },
//       );
//     }

//     return Scaffold(
//       appBar: appBar(context, 'New Consent'),
//       // drawer: drawerGeneral(context),
//       body: Container(
//         // padding: EdgeInsets.all(2),
//         child: ListView(
//           children: <Widget>[
//             general_header("assets/images/new_smartConsent.png", 120,
//                 'Texto en ingles explicativo de la pantalla Texto en ingles explicativo de la pantalla Texto en ingles explicativo de la pantalla'),
//             NewSmartConsentCardState().NewSmartConsentBodyCard(),
//             NewSmartConsentTableData(context),
//             Padding(
//               padding: const EdgeInsets.all(18.0),
//               child: ElevatedButton(
//                 onPressed: () {
//                   Navigator.push(
//                     context,
//                     MaterialPageRoute(
//                       builder: (context) {
//                         return Consent();
//                       },
//                     ),
//                   );
//                 },
//                 child: const Text('Present New Consent'),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   // Widget _NormalText() {
//   //   ;
//   // }

//   Widget cardBody() {
//     return Center(
//         child: Padding(
//       padding: const EdgeInsets.all(20.0),
//       child: Row(
//         children: [
//           searchbar(),
//           Container(
//             margin: const EdgeInsets.only(left: 20.0, right: 20.0),
//             child: Align(
//               heightFactor: 2,
//               alignment: Alignment.bottomLeft,
//               child: Text(
//                 'Specialty',
//                 style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//                 textAlign: TextAlign.start,
//               ),
//             ),
//           ),
//           selectSpecialist(),
//           Divider(),
//           Container(
//             margin: const EdgeInsets.only(left: 20.0, right: 20.0),
//             child: Align(
//               heightFactor: 2,
//               alignment: Alignment.bottomRight,
//               child: Text(
//                 'Procedure',
//                 style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//                 textAlign: TextAlign.start,
//               ),
//             ),
//           ),
//           selectProcedure()
//         ],
//       ),
//     ));
//   }

//   Future<void> _showMyDialog() async {
//     return showDialog<void>(
//       context: context,
//       barrierDismissible: false, // user must tap button!
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: const Text('Signature at home'),
//           content: SingleChildScrollView(
//             child: ListBody(
//               children: const <Widget>[
//                 Text('The patient will be notified to make a signature'),
//                 Text('You´re sure?'),
//               ],
//             ),
//           ),
//           actions: <Widget>[
//             TextButton(
//               child: const Text('Continue'),
//               onPressed: () {
//                 Navigator.of(context).pop();
//                 if (dataUserSelect == null) {
//                   toast('choose a patient');
//                   return bodyNewSmartConsentNo();
//                 } else {
//                   SendFirma().generarFirma();
//                   _showMyDialogConfirmation();
//                 }
//               },
//             ),
//             TextButton(
//               child: const Text('Cancel'),
//               onPressed: () {
//                 Navigator.of(context).pop();
//               },
//             ),
//           ],
//         );
//       },
//     );
//   }

//   Future<void> _showMyDialogConfirmation() async {
//     return showDialog<void>(
//       context: context,
//       barrierDismissible: false, // user must tap button!
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: const Text('Signature at home'),
//           content: SingleChildScrollView(
//             child: ListBody(
//               children: const <Widget>[
//                 Text('Is done '),
//                 Icon(
//                   Icons.check_circle,
//                   color: Colors.green,
//                 )
//               ],
//             ),
//           ),
//           actions: <Widget>[
//             TextButton(
//               child: const Text('Continue'),
//               onPressed: () {
//                 Navigator.of(context).pop();
//                 Navigator.push(
//                   context,
//                   MaterialPageRoute(builder: (context) {
//                     return HomeScreenBody();
//                   }),
//                 );
//               },
//             ),
//           ],
//         );
//       },
//     );
//   }

//   Widget searchbar() {
//     return Padding(
//       padding: const EdgeInsets.all(22.0),
//       child: TextFormField(
//         controller: usernameCont,
//         focusNode: usernameFocus,
//         // style: primaryTextStyle(),
//         decoration: InputDecoration(
//           prefixIcon: Icon(
//             Icons.search,
//             color: Color(0xFF0083bb),
//           ),
//           focusedBorder: OutlineInputBorder(
//             borderRadius: BorderRadius.circular(55.0),
//             borderSide: BorderSide(color: Color(0xFF0083bb)),
//           ),
//           enabledBorder: OutlineInputBorder(
//             borderRadius: BorderRadius.circular(55.0),
//             borderSide: BorderSide(color: Color(0xFF0083bb)),
//           ),
//           labelText: 'Search patient',
//           // labelStyle: primaryTextStyle(sty),
//         ),
//         cursorColor: Color(0xFF0083bb),
//         keyboardType: TextInputType.name,
//         validator: (s) {
//           if (s.trim().isEmpty) return 'Search fail';
//           // if (!s.trim().isAlpha()) return 'Username is not valid';
//           return null;
//         },
//       ),
//     );
//   }

//   Widget selectSpecialist() {
//     return Padding(
//       padding: const EdgeInsets.all(18.0),
//       child: Container(
//         child: Card(
//             shape: RoundedRectangleBorder(
//               borderRadius: BorderRadius.circular(8.0),
//             ),
//             elevation: 2,
//             child: DropdownButton(
//               isExpanded: true,
//               // dropdownColor: appStore.appBarColor,
//               value: selectedIndexCategorySpecialist,
//               // style: boldTextStyle(),
//               icon: Icon(
//                 Icons.keyboard_arrow_down,
//                 // color: appStore.iconColor,
//               ),
//               // underline: 0.height,
//               onChanged: (newValue) {
//                 setState(() {
//                   // toast(newValue);
//                   selectedIndexCategorySpecialist = newValue;
//                   // print(newValue);
//                   switch (newValue) {
//                     case 'Odontología':
//                       selected = listOfCategory;
//                       break;
//                     case 'Anestesiología':
//                       selected = listOfCategory2;
//                       break;
//                     case 'Ginecología':
//                       selected = listOfCategory3;
//                       break;
//                     default:
//                   }
//                 });
//               },
//               items: listEspecialiad.map((category) {
//                 return DropdownMenuItem(
//                   child: Text(category),
//                   value: category,
//                 );
//               }).toList(),
//             )),
//       ),
//     );
//   }

//   Widget selectProcedure() {
//     return Padding(
//       padding: const EdgeInsets.all(18.0),
//       child: Container(
//         child: Card(
//             shape: RoundedRectangleBorder(
//               borderRadius: BorderRadius.circular(8.0),
//             ),
//             elevation: 3,
//             child: DropdownButton(
//               isExpanded: true,
//               // dropdownColor: appStore.appBarColor,
//               value: selectedIndexCategory,
//               // style: boldTextStyle(),
//               icon: Icon(
//                 Icons.keyboard_arrow_down,
//                 // color: appStore.iconColor,
//               ),
//               // underline: 0.height,
//               onChanged: (newValue) {
//                 setState(() {
//                   // toast(newValue);
//                   selectedIndexCategory = newValue;
//                 });
//               },
//               items: selected.map((category) {
//                 return DropdownMenuItem(
//                   child: Text(category),
//                   value: category,
//                 );
//               }).toList(),
//             )),
//       ),
//     );
//   }

//   Widget patientsTable() {
//     Widget mHeading(var value) {
//       return Text(value);
//     }

//     SingleChildScrollView(
//       scrollDirection: Axis.horizontal,
//       child: DataTable(
//         // sortAscending: sort,
//         sortColumnIndex: 1,
//         columns: <DataColumn>[
//           DataColumn(label: mHeading('ID'), tooltip: 'ID'),
//           DataColumn(
//             label: mHeading('Name'),
//             onSort: (columnIndex, ascending) {
//               setState(() {
//                 sort = !sort;
//               });
//               onSortColumn(columnIndex, ascending);
//             },
//           ),
//           DataColumn(label: mHeading('DNI')),
//         ],
//         rows: userdetails1
//             .map(
//               (data) => DataRow(
//                 cells: [
//                   DataCell(
//                     Text(
//                       data.id,
//                     ),
//                     onTap: () => {
//                       dataUserSelect = data,
//                       patientSelect = data.name,
//                       print(data.id),
//                       toastLong('selected patient $patientSelect'),
//                     },
//                   ),
//                   DataCell(
//                       Text(
//                         data.name,
//                       ),
//                       onTap: () => {
//                             dataUserSelect = data,
//                             patientSelect = data.name,
//                             print(data.id),
//                             toastLong('selected patient $patientSelect')
//                           }),
//                   DataCell(
//                       Text(
//                         data.dni,
//                       ),
//                       onTap: () => {
//                             dataUserSelect = data,
//                             patientSelect = data.name,
//                             print(data.id),
//                             toastLong('selected patient $patientSelect')
//                           }),
//                 ],
//               ),
//             )
//             .toList(),
//       ),
//     );
//   }

//   Widget borrar() {
//     return Padding(
//       padding: const EdgeInsets.all(22.0),
//       child: Column(
//         children: [
//           TextFormField(
//             controller: usernameCont,
//             focusNode: usernameFocus,
//             // style: primaryTextStyle(),
//             decoration: InputDecoration(
//               prefixIcon: Icon(
//                 Icons.search,
//                 color: Color(0xFF0083bb),
//               ),
//               focusedBorder: OutlineInputBorder(
//                 borderRadius: BorderRadius.circular(25.0),
//                 borderSide: BorderSide(color: Color(0xFF0083bb)),
//               ),
//               enabledBorder: OutlineInputBorder(
//                 borderRadius: BorderRadius.circular(25.0),
//                 borderSide: BorderSide(color: Color(0xFF0083bb)),
//               ),
//               labelText: 'Search patient',
//               // labelStyle: primaryTextStyle(sty),
//             ),
//             cursorColor: Color(0xFF0083bb),
//             keyboardType: TextInputType.name,
//             validator: (s) {
//               if (s.trim().isEmpty) return 'Search fail';
//               // if (!s.trim().isAlpha()) return 'Username is not valid';
//               return null;
//             },
//           ),
//           Align(
//             heightFactor: 2,
//             alignment: Alignment.bottomLeft,
//             child: Text(
//               'Specialty',
//               style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//               textAlign: TextAlign.start,
//             ),
//           ),

//           Card(
//               elevation: 4,
//               child: DropdownButton(
//                 isExpanded: true,
//                 // dropdownColor: appStore.appBarColor,
//                 value: selectedIndexCategorySpecialist,
//                 // style: boldTextStyle(),
//                 icon: Icon(
//                   Icons.keyboard_arrow_down,
//                   // color: appStore.iconColor,
//                 ),
//                 // underline: 0.height,
//                 onChanged: (newValue) {
//                   setState(() {
//                     // toast(newValue);
//                     selectedIndexCategorySpecialist = newValue;
//                     // print(newValue);
//                     switch (newValue) {
//                       case 'Odontología':
//                         selected = listOfCategory;
//                         break;
//                       case 'Anestesiología':
//                         selected = listOfCategory2;
//                         break;
//                       case 'Ginecología':
//                         selected = listOfCategory3;
//                         break;
//                       default:
//                     }
//                   });
//                 },
//                 items: listEspecialiad.map((category) {
//                   return DropdownMenuItem(
//                     child: Text(category),
//                     value: category,
//                   );
//                 }).toList(),
//               )),
//           Align(
//             heightFactor: 2,
//             alignment: Alignment.bottomRight,
//             child: Text(
//               'Procedure',
//               style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//               textAlign: TextAlign.start,
//             ),
//           ),
//           Card(
//               elevation: 4,
//               child: DropdownButton(
//                 isExpanded: true,
//                 // dropdownColor: appStore.appBarColor,
//                 value: selectedIndexCategory,
//                 // style: boldTextStyle(),
//                 icon: Icon(
//                   Icons.keyboard_arrow_down,
//                   // color: appStore.iconColor,
//                 ),
//                 // underline: 0.height,
//                 onChanged: (newValue) {
//                   setState(() {
//                     // toast(newValue);
//                     selectedIndexCategory = newValue;
//                   });
//                 },
//                 items: selected.map((category) {
//                   return DropdownMenuItem(
//                     child: Text(category),
//                     value: category,
//                   );
//                 }).toList(),
//               )),
//           // Align(
//           //   heightFactor: 2,
//           //   alignment: Alignment.bottomLeft,
//           //   child: Text(
//           //     'Mostrar video',
//           //     style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//           //     textAlign: TextAlign.start,
//           //   ),
//           // ),
//           // Card(
//           //     elevation: 4,
//           //     child: DropdownButton(
//           //       isExpanded: true,
//           //       // dropdownColor: appStore.appBarColor,
//           //       value: selectedIndexCategory,
//           //       // style: boldTextStyle(),
//           //       icon: Icon(
//           //         Icons.keyboard_arrow_down,
//           //         // color: appStore.iconColor,
//           //       ),
//           //       // underline: 0.height,
//           //       onChanged: (newValue) {
//           //         setState(() {
//           //           // toast(newValue);
//           //           selectedIndexCategory = newValue;
//           //         });
//           //       },
//           //       items: listOfCategory.map((category) {
//           //         return DropdownMenuItem(
//           //           child: Text(category),
//           //           value: category,
//           //         );
//           //       }).toList(),
//           //     )),
//           Align(
//             heightFactor: 2,
//             alignment: Alignment.center,
//             child: Text(
//               'Patients',
//               style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//               textAlign: TextAlign.start,
//             ),
//           ), // FutureBuilder<List<UserModel>>(
//           //   // future: getUser(),
//           //   builder: (context, snapshot) {
//           //     if (snapshot.hasError) return Text(snapshot.error);
//           //     if (snapshot.hasData) return userList(snapshot.data);
//           //     return loadingWidgetMaker();
//           //   },
//           // ),
//           // SingleChildScrollView(
//           //   scrollDirection: Axis.horizontal,
//           //   child: DataTable(
//           //     // sortAscending: sort,
//           //     sortColumnIndex: 1,
//           //     columns: <DataColumn>[
//           //       DataColumn(label: mHeading('ID'), tooltip: 'ID'),
//           //       DataColumn(
//           //         label: mHeading('Name'),
//           //         onSort: (columnIndex, ascending) {
//           //           setState(() {
//           //             sort = !sort;
//           //           });
//           //           onSortColumn(columnIndex, ascending);
//           //         },
//           //       ),
//           //       DataColumn(label: mHeading('DNI')),
//           //     ],
//           //     rows: userdetails1
//           //         .map(
//           //           (data) => DataRow(
//           //             cells: [
//           //               DataCell(
//           //                 Text(
//           //                   data.id,
//           //                 ),
//           //                 onTap: () => {
//           //                   dataUserSelect = data,
//           //                   patientSelect = data.name,
//           //                   print(data.id),
//           //                   toastLong('selected patient $patientSelect'),
//           //                 },
//           //               ),
//           //               DataCell(
//           //                   Text(
//           //                     data.name,
//           //                   ),
//           //                   onTap: () => {
//           //                         dataUserSelect = data,
//           //                         patientSelect = data.name,
//           //                         print(data.id),
//           //                         toastLong(
//           //                             'selected patient $patientSelect')
//           //                       }),
//           //               DataCell(
//           //                   Text(
//           //                     data.dni,
//           //                   ),
//           //                   onTap: () => {
//           //                         dataUserSelect = data,
//           //                         patientSelect = data.name,
//           //                         print(data.id),
//           //                         toastLong(
//           //                             'selected patient $patientSelect')
//           //                       }),
//           //             ],
//           //           ),
//           //         )
//           //         .toList(),
//           //   ),
//           // ),
//           Text('Signature house'),
//           Divider(),
//           LiteRollingSwitch(
//             //initial value
//             value: false,
//             textOn: 'Sí',
//             textOff: 'No',
//             colorOn: Colors.greenAccent[700],
//             colorOff: Colors.redAccent[700],
//             iconOn: Icons.done,
//             iconOff: Icons.remove_circle_outline,
//             textSize: 16.0,
//             onChanged: (bool state) {
//               //Use it to manage the different states
//               print('Current State of SWITCH IS: $state');
//               if (state == true) {
//                 this.textBtn = 'Signature House';
//                 _showMyDialog();
//               } else {
//                 this.textBtn = 'Present Smart Consent';
//               }
//             },
//           ),
//           Divider(),
//           Container(
//             decoration: BoxDecoration(
//               borderRadius: BorderRadius.circular(50),
//               gradient: LinearGradient(colors: [
//                 Color(0xFF0083bb),
//                 Color(0xFF0083bb),
//               ]),
//             ),
//             child: MaterialButton(
//                 onPressed: () {
//                   Navigator.push(
//                     context,
//                     MaterialPageRoute(
//                       builder: (context) {
//                         if (dataUserSelect == null) {
//                           toast('choose a patient');
//                           return bodyNewSmartConsentNo();
//                         } else {
//                           UserGenertaePdf().dataUSerData(dataUserSelect.name,
//                               'lastaname', dataUserSelect.dni, 'time');

//                           return Consent();
//                         }
//                       },
//                     ),
//                   );
//                   // toast('Gradient Material button');
//                 },
//                 splashColor: Colors.transparent,
//                 child: Text(
//                   textBtn,
//                   style: TextStyle(color: Color(0xFFFFFFFF)),
//                   // style: primaryTextStyle(color: Colors.white),
//                 )),
//           )
//         ],
//       ),
//     );
//   }

//   Widget switch_general() {
//     return Center(
//       child: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Row(
//           children: [
//             Expanded(
//                 flex: 2,
//                 child: Container(
//                   child: Text(
//                     'Signature House',
//                     style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//                     textAlign: TextAlign.start,
//                   ),
//                 )),
//             Expanded(
//                 flex: 2,
//                 child: Container(
//                   child: LiteRollingSwitch(
//                     //initial value
//                     value: false,
//                     textOn: 'Sí',
//                     textOff: 'No',
//                     colorOn: Colors.greenAccent[700],
//                     colorOff: Colors.redAccent[700],
//                     iconOn: Icons.done,
//                     iconOff: Icons.remove_circle_outline,
//                     textSize: 16.0,
//                     onChanged: (bool state) {
//                       //Use it to manage the different states
//                       print('Current State of SWITCH IS: $state');
//                       if (state == true) {
//                         this.textBtn = 'Signature House';
//                         _showMyDialog();
//                       } else {
//                         this.textBtn = 'Present Smart Consent';
//                       }
//                     },
//                   ),
//                 ))
//           ],
//         ),
//       ),
//     );
//     // return Container(
//     //   width: 100,
//     // LiteRollingSwitch(
//     //   //initial value
//     //   value: false,
//     //   textOn: 'Sí',
//     //   textOff: 'No',
//     //   colorOn: Colors.greenAccent[700],
//     //   colorOff: Colors.redAccent[700],
//     //   iconOn: Icons.done,
//     //   iconOff: Icons.remove_circle_outline,
//     //   textSize: 16.0,
//     //   onChanged: (bool state) {
//     //     //Use it to manage the different states
//     //     print('Current State of SWITCH IS: $state');
//     //     if (state == true) {
//     //       this.textBtn = 'Signature House';
//     //       _showMyDialog();
//     //     } else {
//     //       this.textBtn = 'Present Smart Consent';
//     //     }
//     //   },
//     // ),
//     // );
//   }
// }

// class user {
//   String id;
//   String name;
//   String dni;

//   user({
//     this.id,
//     this.name,
//     this.dni,
//   });
// }

// Widget loadingWidgetMaker() {
//   return Container(
//     alignment: Alignment.center,
//     child: Card(
//       semanticContainer: true,
//       clipBehavior: Clip.antiAliasWithSaveLayer,
//       elevation: 4,
//       margin: EdgeInsets.all(4),
//       shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50.0)),
//       child: Container(
//         width: 45,
//         height: 45,
//         padding: EdgeInsets.all(8.0),
//         child: CircularProgressIndicator(strokeWidth: 3),
//       ),
//     ),
//   );
// }
