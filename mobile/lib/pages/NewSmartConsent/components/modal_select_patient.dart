import 'package:flutter/material.dart';

Widget ModalSelectpatient(context) {
  showModalBottomSheet(
      context: context,
      builder: (context) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[dataTable(context)],
        );
      });
}

Widget dataTable(BuildContext context) {
  return DataTable(
    columns: const <DataColumn>[
      DataColumn(
        label: Text(
          'DNI',
          style: TextStyle(fontStyle: FontStyle.italic),
        ),
      ),
      DataColumn(
        label: Text(
          'Name',
          style: TextStyle(fontStyle: FontStyle.italic),
        ),
      ),
      DataColumn(
        label: Text(
          'Last name',
          style: TextStyle(fontStyle: FontStyle.italic),
        ),
      ),
    ],
    rows: const <DataRow>[
      DataRow(
        cells: <DataCell>[
          DataCell(Text('444444444')),
          DataCell(Text('444444444')),
          DataCell(Text('444444444')),
        ],
      )
    ],
  );
}
