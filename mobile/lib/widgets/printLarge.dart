void printWrapped(String text) {
  final pattern = RegExp('.{100,900}'); // 800 is the size of each chunk
  pattern.allMatches(text).forEach((match) => print(match.group(0)));
}
