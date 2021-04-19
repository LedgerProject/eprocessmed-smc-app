class LoginModel {
  String login;
  String password;
  String rol;

  LoginModel({this.login, this.rol});

  factory LoginModel.fromJson(Map<String, dynamic> json) {
    return LoginModel(
      login: json['login'],
      rol: json['avatar_url'],
    );
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['login'] = this.login;
    data['avatar_url'] = this.login;
    return data;
  }
}
