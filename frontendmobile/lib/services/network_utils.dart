import 'dart:convert';

import 'package:http/http.dart';
import 'package:nb_utils/nb_utils.dart';

import 'config.dart';
import 'dart:io';

Map buildHeader() {
  return {
    'Content-Type': 'application/json',
  };
}

Future<Response> postRequest(String endPoint, body) async {
  try {
    if (!await isNetworkAvailable()) throw noInternetMsg;

    String url = "$baseURL$endPoint";

    print('URL: $url');

    String myJSON =
        '{"process": "", "request": "get-login", "data": {"login":"doctor 1","password":"12345"}}';
    print('Request: $myJSON');

    var json = jsonDecode(myJSON);
    var nameJson = json['request'];

    Response response = await post(Uri.parse(url), body: jsonEncode(nameJson))
        .timeout(Duration(seconds: timeoutDuration),
            onTimeout: () => throw "Please try again");

    print('Status: ${response.statusCode} $url $body');
    print(response?.body);
    return response;
  } catch (e) {
    print('error :::::::::::::::::::::::::::::::::::$e');
    if (!await isNetworkAvailable()) {
      throw noInternetMsg;
    } else {
      throw "Please try again";
    }
  }
}

Future<Response> getRequest(String endPoint) async {
  try {
    if (!await isNetworkAvailable()) throw noInternetMsg;

    String url = '$baseURL$endPoint';

    Response response = await get(Uri.parse(url)).timeout(
        Duration(seconds: timeoutDuration),
        onTimeout: () => throw "Please try again");

    print('Code: ${response.statusCode} $url');
    print(response?.body);
    return response;
  } catch (e) {
    print(e);
    if (!await isNetworkAvailable()) {
      throw noInternetMsg;
    } else {
      throw "Please try again";
    }
  }
}

Future handleResponse(Response response) async {
  if (response.statusCode.isSuccessful()) {
    return jsonDecode(response.body);
  } else {
    if (response.body.isJson()) {
      throw jsonDecode(response.body);
    } else {
      if (!await isNetworkAvailable()) {
        throw noInternetMsg;
      } else {
        throw 'Por favor intentelo de nuevo';
      }
    }
  }
}

class Album {
  final int id;
  final String title;

  Album({this.id, this.title});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      id: json['id'],
      title: json['title'],
    );
  }
}
