// import 'dart:convert';
// import 'dart:async';

// import 'package:SmartConsent/models/process_model.dart';
// import 'package:SmartConsent/controllers/Global_Variables.dart';
// import 'package:http/http.dart' as http;

// class ProcessProvider {
//   var url = GlobalVariables.urlServer;
//   String _apiKey = '50b65c1e433dfc2448b8255b215465ca';
//   String _url = 'api.themoviedb.org';
//   String _languaje = 'es-ES';

//   Future<List<Resp>> getEnCines() async {
//       final  = await http.post(Uri.parse(url),
//           headers: {
//             "Content-Type": "application/json",
//             "accept": "application / json"
//           },
//           body: body);
//     final resp = await http.get(response);
//     final decodedData = json.decode(resp.body);
//     // print(decodedData['results']);
//     final response = new Process.formJsonList(decodedData['resp']);
//     print(response.items[1]);
//     return response.items;
//     ;
//   }
// }
