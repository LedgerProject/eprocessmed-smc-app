import 'dart:convert';

import 'package:SmartConsent/Models/UserModel.dart';

import 'network_utils.dart';

Future<List<UserModel>> getUser() async {
  var result = await handleResponse(
      await getRequest('https://api.github.com/users/octocat/followers'));

  Iterable list = result;
  print('datos getUser$list');
  return list.map((model) => UserModel.fromJson(model)).toList();
}

Future createEmployee(Map req) async {
  return handleResponse(
      await postRequest('http://dummy.restapiexample.com/api/v1/create', req));
}

Future loginUser(Map req) async {
  return handleResponse(
      await postRequest('http://192.168.1.102:3000/gen-query', req));
}
