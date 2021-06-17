import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:SmartConsent/pages/NewSmartConsent/components/new_smart_consent_body.dart';

// ignore: non_constant_identifier_names
Widget InfoBodyCard() {
  return Padding(
    padding: const EdgeInsets.all(15.0),
    child: Container(
        child: Padding(
          padding: const EdgeInsets.all(5.0),
          child: Column(
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(left: 30.0, right: 20.0),
                child: Align(
                  heightFactor: 1,
                  alignment: Alignment.bottomLeft,
                  child: Text(
                    'PERSONAL DATA PROTECTION',
                    style: TextStyle(color: Color(0xFF0083bb), fontSize: 20),
                    textAlign: TextAlign.start,
                  ),
                ),
              ),
              Container(
                margin: const EdgeInsets.only(top: 15, left: 20.0, right: 20.0),
                child: Align(
                  heightFactor: 1,
                  alignment: Alignment.bottomLeft,
                  child: Text(
                    "   In accordance with the provisions of the General Data Protection Regulation, we inform you of the treatment that        We make your personal data: Responsible for the treatment: [centro_de_salud.nombre], with CIF no.        [centro_de_salud.id], and address at [centro_de_salud.direccion], of [city.name]. Contact details of        Data Protection Officer: Vitoria-Gasteiz, Álava email: dpo@e-processmed.com Purpose of the        treatment: the personal data that we have about you, including health data, and those that you will provide us        with        occasion of this informed consent through this computer application, consisting of your signature        biometric and voice recording, will be used in order to manage the provision of consent        reported in electronic format in accordance with the provisions of Law 41/2002, of November 14, basic        regulating patient autonomy and rights and obligations regarding information and documentation        clinical and concordant regulations. Personal data provided by the patient: the personal data that we        ha        provided and those that you will provide us with below, are those necessary for your provision of consent        from        in such a way that he is obliged to provide them so, otherwise, we will not be able to process it. Recipients        from        the data: your personal data will not be communicated to third parties unless it is necessary for compliance        from        legal obligations. Likewise, we use third-party services that, acting as data managers,        may have access to your personal data, having signed with them the corresponding contract of        treatment        of data in accordance with the provisions of article 28.3 of the RGPD. In this sense, we inform you that this        application called Smart Consent has been developed by E PROCESS MED, S.L., with CIF no. B01564764 and        address at calle Albert Einstein, nº 15 - Of. 207 BIC Araba, C.P. 01510 from Vitoria (Álava), acting as        in charge of the treatment in order to manage the provision of informed consent and services        required        for it. Legitimation of the treatment: the legal or legal basis for the treatment of your personal data is        the application of pre-contractual measures through you and, where appropriate, the execution of the contract in        which you.        it is        part. Likewise, the legal basis for the provision of informed consent is compliance with the        Obligations contemplated in Law 41/2002, of November 14, basic regulating the autonomy of the patient        Y        of rights and obligations regarding information and clinical documentation. Period of conservation of the        data:        We will keep your personal data for the period in which the treatment is provided and, once it is finished,        during the periods necessary to comply with legal obligations. In this sense and, in relation to its        story        clinic, it will be kept for a minimum period of five years from discharge, as established by Law 41/2002,        of November 14, basic regulation of the autonomy of the patient and of rights and obligations regarding        information and clinical documentation. Rights of the interested party regarding the processing of their data:        you can        request access to your personal data or, where appropriate, its rectification, deletion, limitation of        treatment, your opposition to it, as well as your right to the portability of personal data, for which        You must send a written request addressed to [centro_de_salud.nombre], with CIF number [centro_de_salud.id], and        Address at [centro_de_salud.direccion], of [city.nombre], accompanying in any case a photocopy of your ID. On        In any case, you can file a claim with the Spanish Data Protection Agency, either through your        electronic office or at his address, at calle Jorge Juan, nº 6, C.P. 28001 of Madrid.",
                    style: TextStyle(color: Color(0xFF000000), fontSize: 14),
                    textAlign: TextAlign.start,
                  ),
                ),
              ),
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
