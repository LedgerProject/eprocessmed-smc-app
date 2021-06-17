// import 'package:flutter/material.dart';
// import 'package:flutter/cupertino.dart';
// import 'package:SmartConsent/pages/NewSmartConsent/components/new_smart_consent_body.dart';

// // ignore: non_constant_identifier_names

// class NewSmartConsentCard extends StatefulWidget {
//   NewSmartConsentCard({Key key}) : super(key: key);

//   @override
//   NewSmartConsentCardState createState() => NewSmartConsentCardState();
// }

// class NewSmartConsentCardState extends State<NewSmartConsentCard> {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       child: NewSmartConsentBodyCard(),
//     );
//   }

//   Widget NewSmartConsentBodyCard() {
//     return Padding(
//       padding: const EdgeInsets.all(15.0),
//       child: Container(
//           child: Padding(
//             padding: const EdgeInsets.all(5.0),
//             child: Column(
//               children: <Widget>[
//                 searchbar(),
//                 Container(
//                   margin: const EdgeInsets.only(left: 20.0, right: 20.0),
//                   child: Align(
//                     heightFactor: 1,
//                     alignment: Alignment.bottomLeft,
//                     child: Text(
//                       'Specialty',
//                       style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//                       textAlign: TextAlign.start,
//                     ),
//                   ),
//                 ),
//                 Padding(
//                   padding: const EdgeInsets.all(18.0),
//                   child: Container(
//                     child: Card(
//                         shape: RoundedRectangleBorder(
//                           borderRadius: BorderRadius.circular(8.0),
//                         ),
//                         elevation: 2,
//                         child: DropdownButton(
//                           isExpanded: true,
//                           // dropdownColor: appStore.appBarColor,
//                           value: selectedIndexCategorySpecialist,
//                           // style: boldTextStyle(),
//                           icon: Icon(
//                             Icons.keyboard_arrow_down,
//                             // color: appStore.iconColor,
//                           ),
//                           // underline: 0.height,
//                           onChanged: (newValue) {
//                             setState(() {
//                               // toast(newValue);
//                               selectedIndexCategorySpecialist = newValue;
//                               // print(newValue);
//                               switch (newValue) {
//                                 case 'Odontología':
//                                   selected = listOfCategory;
//                                   break;
//                                 case 'Anestesiología':
//                                   selected = listOfCategory2;
//                                   break;
//                                 case 'Ginecología':
//                                   selected = listOfCategory3;
//                                   break;
//                                 default:
//                               }
//                             });
//                           },
//                           items: listEspecialiad.map((category) {
//                             return DropdownMenuItem(
//                               child: Text(category),
//                               value: category,
//                             );
//                           }).toList(),
//                         )),
//                   ),
//                 ),
//                 Container(
//                   margin: const EdgeInsets.only(left: 20.0, right: 20.0),
//                   child: Align(
//                     heightFactor: 1,
//                     alignment: Alignment.bottomRight,
//                     child: Text(
//                       'Procedure',
//                       style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
//                       textAlign: TextAlign.start,
//                     ),
//                   ),
//                 ),
//                 bodyNewSmartConsentState().selectProcedure(),
//                 Container(
//                   margin: const EdgeInsets.only(left: 20.0, right: 20.0),
//                   child: Align(
//                     heightFactor: 1,
//                     alignment: Alignment.bottomLeft,
//                   ),
//                 ),
//                 bodyNewSmartConsentState().switch_general(),
//               ],
//             ),
//           ),
//           // height: 500.0,
//           decoration: new BoxDecoration(
//             color: Color(0xFFFFFFFF),
//             boxShadow: [new BoxShadow(blurRadius: 1.0)],
//             borderRadius: BorderRadius.vertical(
//               bottom: Radius.circular(20),
//               top: Radius.circular(20),
//             ),
//           )),
//     );
//   }

//   Widget searchbar() {
//     var usernameCont = TextEditingController();
//     var usernameFocus = FocusNode();
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
//             borderRadius: BorderRadius.circular(15.0),
//             borderSide: BorderSide(color: Color(0xFF0083bb)),
//           ),
//           enabledBorder: OutlineInputBorder(
//             borderRadius: BorderRadius.circular(15.0),
//             borderSide: BorderSide(color: Color(0xFF0083bb)),
//           ),
//           labelText: 'Search patient',
//           labelStyle: TextStyle(color: Color(0xFF0083bb)),
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

//   String selectedIndexCategorySpecialist = 'NONE';

//   List<String> listOfCategory = ['Blanqueamiento', 'NONE'];
//   List<String> listOfCategory2 = ['Anestesia Local', 'NONE'];
//   List<String> listOfCategory3 = ['Fecundación In Vitro', 'NONE'];
//   var selected = [];
//   List<String> listEspecialiad = [
//     'NONE',
//     'Odontología',
//     'Anestesiología',
//     'Ginecología'
//   ];

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
// }
