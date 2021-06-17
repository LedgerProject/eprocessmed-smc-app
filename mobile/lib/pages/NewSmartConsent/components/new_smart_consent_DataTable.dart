import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:SmartConsent/pages/NewSmartConsent/components/new_smart_consent_body.dart';

// ignore: non_constant_identifier_names
Widget NewSmartConsentTableData(context) {
  return Padding(
    padding: const EdgeInsets.all(15.0),
    child: Container(
        child: Padding(
          padding: const EdgeInsets.all(5.0),
          child: Column(
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(left: 20.0, right: 20.0),
                child: Align(
                  heightFactor: 1,
                  alignment: Alignment.bottomLeft,
                  child: Text(
                    'Patients',
                    style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                    textAlign: TextAlign.start,
                  ),
                ),
              ),
              dataTablePatients(context)
            ],
          ),
        ),
        // height: 500.0,
        decoration: new BoxDecoration(
          color: Color(0xFFFFFFFF),
          boxShadow: [new BoxShadow(blurRadius: 1.0)],
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(20),
            top: Radius.circular(20),
          ),
        )),
  );
}

Widget dataTablePatients(BuildContext context) {
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
