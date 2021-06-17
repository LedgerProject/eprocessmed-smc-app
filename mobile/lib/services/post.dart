import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:SmartConsent/models/UserModel.dart';
import 'package:SmartConsent/models/process_model.dart';
import 'package:SmartConsent/controllers/Global_Variables.dart';
import 'package:SmartConsent/pages/NewSmartConsent/components/body.dart';
import 'package:SmartConsent/pages/auth/Login/components/login_screen_body.dart';
import 'package:SmartConsent/widgets/general_user_data.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:nb_utils/nb_utils.dart';

class UserProvider {
  // ignore: missing_return
  Future<http.Response> authRequest(String name, String pass) async {
    try {
      print("entro a post name: $name y contraseña: $pass");
      var url = "$urlGeneralService/ath-usr";
      Map data = {
        "idUser": null,
        "dni": "",
        "name": "",
        "lastname": "",
        "login": name,
        "password": pass,
        "mail": "",
        "codePhone": "",
        "phone": "",
        "idGoogle": "",
        "idHashAlastria": "",
        "idCatRoluser": "",
        "userStructure": "",
        "idCatAccesstype": {"idCatAccesstype": '0,2,0'},
        "idEstablishment": null,
        "idSpecialist": 0,
        "idCatNotification": "{ idCatNotification: '0,1,0' }",
        "regStatus": "",
        "keyZoom": "",
        "codeOtp": null
      };
      //encode Map to JSON
      var body = json.encode(data);
      print("Paso data");
      final response = await http.post(Uri.parse(url),
          headers: {
            "Content-Type": "application/json",
            "accept": "application / json"
          },
          body: body);
      final decodedData = json.decode(response.body);
      print("Response de login $decodedData");
      print(decodedData['resp']['data']['idEstablishment']);
      idStablishmentGeneral = decodedData['resp']['data']['idEstablishment'];
      mailActualEspecialista = decodedData['resp']['data']['mail'];
      nameSpecialist = decodedData['resp']['data']['name'] +
          ' ' +
          decodedData['resp']['data']['lastname'];

      // mailActualEspecialista =
      if (decodedData['resp']['data']['idUser'] != null) {
        print('User correct');
        LoginScreenBody().correctUser();
        // Body().VoidAlertDialog();
      } else {
        print('User incorrect');
      }
      return response;
    } catch (e) {
      toast('Fail in credentials');
      LoginScreenBody().VoidAlertDialog();
      print('error$e');
    }
  }
}

class UserGetProvider {
  // ignore: missing_return
  Future<http.Response> getUserRequest() async {
    try {
      print("entro a post");
      var url = GlobalVariables.urlServer;
      Map data = {"process": "", "request": "patients"};
      //encode Map to JSON
      var body = json.encode(data);
      final response = await http.post(Uri.parse(url),
          headers: {"Content-Type": "application/json"}, body: body);
      final decodedData = json.decode(response.body);
      // final usr = new Users.fromJsonList(decodedData['answer']);
      // print("${response.statusCode}");
      // print("${response.body}");
      // print("sdsdsdsds ${LoginModel().id_user}");
      print(decodedData);
      final usuarios = new Users.fromJsonList(decodedData[0]['answer']);
      print(usuarios);
      // Map datamap = json.decode()
      return response;
    } catch (e) {
      print('error  en UserGetProvider $e');
    }
  }

  // ignore: missing_return
  Future getConsents(int valuConsultText) async {
    try {
      print("entro a post");
      var url = GlobalVariables.urlServer;
      Map data = {
        "idCatProcess": {"procedures": "0,0,1,0,0", "specialties": "0,0,0"}
      };

      //encode Map to JSON
      var body = json.encode(data);
      final response = await http.post(Uri.parse(url),
          headers: {"Content-Type": "application/json"}, body: body);
      final decodedData = json.decode(response.body);
      final responseData = decodedData['resp'][0]['header'][0]
          ['structure_screens']['order'][valuConsultText]['text'];
      print(decodedData['resp'][0]['header'][0]['structure_screens']['order']
              [valuConsultText]
          ['text']); //Hacer un modelo para recibir estos datos;
      return responseData;
    } catch (e) {
      print('error:$e');
    }
  }
}

class UserGenertaePdf {
  var firmaEspecialista;
  var firmaPaciente;
  var userName = '';
  var userDni = '';

  dataUSerData(
      String name, String lastaname, String din, String dataCreation) {}

  firmaPAciente(String data) {
    firmaPaciente = data;
  }

  firmaEspecialis(String data) {
    firmaEspecialista = data;
    // print('datoespecialista$firmaEspecialista');
  }

  //Crear consentimiento
  // ignore: missing_return
  Future<http.Response> generateConsent(idUser, idSpecialist, dni, email, name,
      lastname, phone, idStablishment) async {
    try {
      print("entro a post");
      var url = "$urlGeneralService/send-consent-crt";
      Random random = new Random();
      int randomNumber = random.nextInt(9000);
      //send data to ipfs example
      Map data = {
        "consent": {
          "idConsent": null,
          "idPatient": idUser,
          "idSpecialist": idSpecialist,
          "idCatSpecialty": "{\"specialties\": \"0,0,0\"}",
          "idCatProcess": "{\"procedures\": \"0,0,1,0,0\"}",
          "idCatRisk": "{}",
          "idVideo": 1,
          "showVideo": 1,
          "firmPatient": "",
          "firmRepresentative": "",
          "firmSpecialist": "",
          "firmRevoked": "",
          "hashFpacient": "",
          "hashFrepresentative": "",
          "hashFspecialist": "",
          "hashFrevoked": "",
          "audioAcceptance": 0,
          "reviewDate": 0,
          "acceptanceDate": 0,
          "rejectedDate": 0,
          "urlPdf": "url",
          "urlAudio": "audio",
          "patientCompleted": 0,
          "specialistCompleted": "0",
          "site": 0,
          "homeFirm": 0,
          "infoOtp": 0, //aqui va el codigo otp
          "validFirmHome": 0,
          "idUserCreate": 1,
          "path": "",
          "status": "C",
          "traceability": "{}"
        },
        "pdf": {
          "header": {
            "text1": "",
            "text2": "Documento de prueba y sin valor",
            "text3": "{centro_de_salud.logo}",
            "text4": "Internet",
            "text5": "www.smartconsent.com",
            "text6": "Documento generado por ©SmartConset"
          },
          "body": {
            "text": [
              {
                "order": 2,
                "information":
                    "Dificultades\r\n\r\nPueden aparecer manchas de color blanco en los dientes durante la realización del tratamiento. Estas manchas suelen desaparecer conforme el diente aclara su color. No obstante, en ocasiones pueden permanecer presentes a la finalización del mismo, y ser necesario poner en práctica otras alternativas terapéuticas si se desea eliminarlas.\r\n\r\nLa zona cervical del diente puede ser más rebelde al tratamiento y no llegar a conseguirse el mismo color que en el resto del mismo.\r\n\r\nEn ocasiones los dientes pueden no modificar su color con el tratamiento.\r\n\r\nPara mantener los resultados logrados tras el tratamiento puede ser necesario repetir éste periódicamente cuando el dentista lo juzgue conveniente, o poner en práctica las medidas de mantenimiento que él considere más adecuadas.\r\n\r\nRiesgos probables en condiciones normales\r\n\r\nLos tratamientos que el paciente efectúe en casa pueden dañar las encías o provocar molestias si no se realizan de forma adecuada, o se excede en el tiempo o en el número de veces de aplicación del producto al día, o en la cantidad de aplicación del mismo.\r\n\r\nSi se aplica demasiado gel provocando un contacto con las encías, se debe eliminar con una gasa, ya que se pueden producir irritaciones en las mismas.\r\n\r\nSe pueden alterar las obturaciones de metal si contactan con el producto.\r\n\r\nSi se ingiere accidentalmente se pueden ocasionalmente padecer molestias en la garganta o incluso padecer episodio leve de diarrea.\r\n\r\nDurante el tratamiento se puede tener sensibilidad o molestias en los dientes tras la ingesta de bebidas y/o comidas frías, calientes, ácidas o bebidas con gas, así como de la eventual posibilidad de presentar alergia ante algunos productos blanqueadores. Si esto sucediera, se debe contactar con la clínica. \r\nExiste riesgo de una cierta resorción radicular, sobre todo cuando se realiza en dientes que han sido endodonciados o que han sufrido traumatismos, aunque dicho riesgo es muy bajo.\r\n\r\nCircunstancias particulares del paciente:\r\n\r\nSi es fumador/a, o no tiene una buena higiene oral o se ingieren muchos alimentos o bebidas ricos en colorantes los dientes se volverán a oscurecer más rápido que si no a pesar de que los dientes se oscurecen de forma fisiológica con la edad.\r\n\r\nEn los dientes muy restaurados el blanqueamiento puede no ser muy efectivo al no presentar éstos suficiente estructura dentaria.\r\n\r\nEl tratamiento blanqueador no modifica el color de las obturaciones, carillas, corona y otros materiales colocados en mis dientes. En estos casos existen otras alternativas más indicadas a la hora de modificar el color de los dientes.\r\nSi los dientes tienen bandas o manchas, éstas se pueden seguir notando, aunque más claras.\r\n"
              },
              {
                "order": 1,
                "information":
                    "DECLARACIÓN DE INFORMACIÓN PARA EL CONSENTIMIENTO\r\nSOBRE BLANQUEAMIENTO\r\n\r\n Yo, {paciente.nombre} {paciente.apellido} con NIF/Pasaporte {paciente.dni}, declaro que con fecha {consentimiento.fecha_creacion}, en  {centro_de_salud.nombre}, el/la facultativo {especialista.nombre} {especialista.apellido}  colegiado {especialista.colegiatura} me ha propuesto y presupuestado el siguiente plan de tratamiento:\r\n\r\nPandemia Covid 19\r\n\r\nEl paciente ha sido informado de los protocolos de bioseguridad instaurados en {centro_de_salud.nombre} frente a la nueva situación creada por la PANDEMIA del Covid-19.\r\n\r\nEn la circunstancia excepcional derivada de la PANDEMIA del COVID-19, le informamos que NO es posible asegurar un RIESGO NULO de transmisión del COVID-19 a pesar de que la Clínica Dental Donnay tiene implantados unos estrictos protocolos para velar por la máxima seguridad de pacientes y profesionales.\r\n\r\nINFORMACIÓN SOBRE EL BLANQUEAMIENTO\r\n\r\nFinalidad:\r\n\r\nAclarar el color de los dientes, sean vitales o no, consiguiendo un tono más blanco. El grado de mejoría del tono de los dientes dependerá de cada persona y de sus piezas dentales, siendo más difícil en los casos de tener obturaciones o manchas y bandas intrínsecas, dado que solo se blanqueará el tejido dentario y por igual, no eliminando manchas de modo selectivo.\r\n\r\nNaturaleza del tratamiento:\r\n\r\nConsiste en:\r\n\r\n- Colocación en la consulta de un gel de blanqueamiento sobre la superficie externa de los dientes a blanquear.\r\n\r\n- Colocación en los dientes de unas cubetas de silicona blanda, hechas a medida y que serán entregadas en la consulta.\r\n\r\n- Utilización conjunta de las dos técnicas descritas anteriormente.\r\n\r\n- En la aplicación en consulta de un gel blanqueador en la superficie externa de los dientes.\r\n\r\n- En la aplicación de un gel blanqueador y un protector para mis encías y los ojos, durante un tiempo que el profesional decidirá y aplicando una fuente de luz sobre loa dientes.\r\n\r\n- Cuando el tratamiento se realiza en la consulta de forma exclusiva pueden ser necesarias varias sesiones para conseguir resultados satisfactorios.\r\n\r\n- Antes de iniciar el tratamiento blanqueador en la consulta es necesaria la adecuada protección de las encías y los dientes que no se vayan a blanquear.\r\n"
              },
              {
                "order": 3,
                "information":
                    "El paciente asume que el plan de tratamiento pautado inicialmente es orientativo y que podrá sufrir modificaciones en función de la respuesta de los dientes al mismo.\r\n\r\nSe deben seguir rigurosamente todas las instrucciones y recomendaciones indicadas por el dentista y cumplir con el programa de revisiones pautado.\r\n\r\nDECLARACIÓN DE CONSENTIMIENTO \r\n \r\nPACIENTE\r\n\r\nD/Dña. {paciente.nombre} {paciente.apellido} con DNI {paciente.dni}, o su Representante Legal D/Dña. {paciente.rep_nombre} {paciente.rep_apellido} con DNI {paciente.rep_dni}:\r\n\r\nDeclaro que el facultativo/a Dr./Dra. {especialista.nombre} {especialista.apellido} me ha explicado satisfactoriamente qué es, cómo se realiza y para qué sirve este tratamiento. También me ha explicado los riesgos existentes, las posibles molestias o complicaciones, que éste es el procedimiento, más adecuado para mi situación clínica actual, y las consecuencias previsibles de su no realización.\r\n\r\nHe comprendido perfectamente todo lo anterior, y por todo ello, en fecha consiento que el Dr/Dra {especialista.nombre} {especialista.apellido} y por ende el equipo de ayudantes de la clínica que él/ella designe se me realice el tratamiento antes mencionado reservándome el derecho de revocar en cualquier momento este consentimiento que ahora presto, sin necesidad de dar ninguna explicación.  \r\n\r\nLo que en prueba de lo dicho firmo en {ciudad.nombre} a {consentimiento.fecha_creacion}\r\n"
              },
              {
                "order": 4,
                "information":
                    " FACULTATIVO\r\n\r\n Dr./Dra. {especialista.nombre} {especialista.apellido} Nº Col. {especialista.colegiatura} he informado a este paciente y/ o su representante legal, del propósito y naturaleza del procedimiento descrito, de sus riesgos y alternativas, y las consecuencias previsibles de su no realización, dejando constancia en la historia clínica. Asimismo, se le preguntó sobre sus posibles alergias, la existencia de otras enfermedades o cualquier circunstancia patológica personal que pudiera condicionar la realización del tratamiento. Se incorpora este documento a la historia clínica del paciente.\r\n Lo que en prueba de lo dicho firmo en {ciudad.nombre}  a {consentimiento.fecha_creacion}\r\n\r\nID Audio: {audio.md5}\r\nID Video: {video.hashmd5}\r\nID Firma Paciente: {consentimiento.hash_fpaciente}\r\nID Firma Representante Legal: {consentimiento.hash_frepresentante}\r\nID Firma Especialista: {consentimiento.hash_fespecialista}"
              }
            ],
            "firmas": {
              "firma_p":
                  "<path d='M 264.2722361355294 21.712552769306416 C 263.73298896169894 21.982175499111854 262.0446020687345 21.88299500173615 256.8240485156916 25.371010635483888 C 253.87753302239872 27.44970000757338 246.8409114366661 32.63887704257103 243.51013034526636 35.51800353824713 C 238.76743293429877 39.72115726577439 238.2710140910205 39.9519920076072 235.7771641696633 42.85935257102249 C 233.0098606880725 46.28044592447161 233.24469625396034 45.06603978322385 231.37674939405747 49.40147664238216 C 230.04651870121162 52.98862388342017 229.62453942801227 55.13004734820419 228.79176363407677 60.16450354908704 C 228.08778194790884 64.84300537016844 227.4055537992017 69.5542700495589 227.16146522957598 73.28382836651168 C 226.89715676440792 78.37995343594399 226.657087758516 76.2529935109036 226.9405392300342 82.24144072318241 C 227.15538349316856 85.97298529649838 226.73300734814865 92.97400678892535 227.80474789604293 97.8658415464026 C 229.29873826044786 103.66312400413634 229.43420320400264 103.2913359483117 232.4932041076865 108.95888995341686 C 234.94261571512087 113.33249371208818 238.71080731553718 119.95686913584409 241.45205240053826 123.81290147176931 C 245.26335881381632 129.00457472956455 245.31333213603713 128.96602875612598 249.16301036833687 133.1280528030784 C 252.40669762954482 136.57298197318505 257.58328825107276 140.64852398598117 260.53284390533435 143.9862726723619 C 264.2018139843711 148.30596119962485 264.9617036884898 151.04281054155956 267.33952229355066 153.9662801681192 C 270.2322655641828 157.35231156426812 270.5495216371501 156.2786374120772 274.29907516009854 160.58206627427646 C 276.730201381208 163.46244614754428 282.1560127539185 169.73329715079356 284.5717825444286 173.1846560616122 C 287.7638589869049 177.91605829445052 289.232380842942 180.07063211756108 290.8158770906878 183.5909643742495 C 292.4038778432558 187.4895217213604 293.61242611498506 190.89275310004263 294.2214230990972 194.57600673971473 C 294.6825299111756 198.40663311987106 295.5046445148495 201.10430783285426 294.3998319835775 206.40264157171967 C 293.4578659050878 210.01414110592862 289.83245274606577 219.01122313723545 288.05778656696504 221.98328268225455 C 284.9785698026795 226.4174722970399 284.3104926315528 225.97320989971723 279.1658327690659 229.27101342198966 C 276.2047106542502 231.07961403177623 266.71782160027334 236.08082060751593 263.2090396496704 237.6937534840816 C 257.50128317236573 240.13854597339892 256.1056718623478 239.75596671069485 252.42938407777245 240.5851539824545 C 248.64439545733305 241.3535813074444 246.94396566157525 241.68883560782496 242.3228465101609 242.27710803358016 C 238.5812041788937 242.73647895532315 234.3184788306347 242.62555189796538 230.08227503228022 243.33396182377 C 225.50349609413436 244.1849969737237 222.71591626061058 245.80638248289094 219.02345831491255 246.36695025380385 C 219.02345831491255 246.36695025380385 208.5609814191696 246.65614799620798 208.5609814191696 246.65614799620798 L 208.5609814191696 235.34385200379202 C 208.5609814191696 235.34385200379202 217.3912066825916 235.63304974619615 217.3912066825916 235.63304974619615 C 221.08366462828963 235.07248197528324 223.80236843608012 234.00485768974104 228.38114737422597 233.15382253978734 C 232.61735117258044 232.4454126139827 237.20379879230143 231.91388686511465 240.94544112356863 231.45451594337166 C 245.56656027498298 230.86624351761645 246.34661709468267 231.15905234318714 250.13160571512208 230.39062501819726 C 253.8078934996974 229.5614377464376 252.93689582508446 230.2143920959078 258.64465230238915 227.7695996065905 C 262.1534342529921 226.15666673002482 270.04376536345967 221.4643985059096 273.00488747827535 219.65579789612303 C 278.14954734076224 216.3579943738506 274.81420343881297 220.35328697775824 277.8934202030985 215.9190973629729 C 279.66808638219925 212.9470378179538 281.63383998088165 207.55026496227208 282.57580605937136 203.93876542806314 C 283.68061859064335 198.64043168919773 283.21532175593006 200.3033244810594 282.75421494385165 196.47269810090307 C 282.1452179597395 192.78944446123097 282.2355460683864 192.06370079108274 280.6475453158184 188.16514344397183 C 279.06404906807256 184.6448111872834 279.0593376000529 184.0101518302825 275.8672611575766 179.27874959744418 C 273.4514913670665 175.82739068662553 269.27839260385116 169.95680146244015 266.8472663827417 167.07642158917233 C 263.09771285979326 162.77299272697306 262.9190759971994 163.29775256875615 260.02633272656726 159.91172117260723 C 257.6485141215064 156.9882515460476 256.7214946710979 154.91871503646252 253.05252459206116 150.59902650919958 C 250.10296893779957 147.26127782281884 245.61728798126458 142.8534181395877 242.37360072005663 139.40848896948103 C 238.5239224877569 135.24646492252862 237.35927076018962 134.62261139942038 233.54796434691156 129.43093814162512 C 230.80671926191047 125.57490580569991 225.66352208803275 118.34152512336716 223.21411048059838 113.96792136469584 C 220.15510957691453 108.30036735959068 218.37217835214585 106.0533344338362 216.87818798774092 100.25605197610247 C 215.80644743984664 95.36421721862521 215.20113309866267 86.53891382751986 214.9862888355283 82.80736925420389 C 214.70283736401012 76.81892204192508 214.50105437081848 77.56840452114194 214.76536283598654 72.47227945170964 C 215.00945140561225 68.74272113475685 215.18719056353913 62.709133044771036 215.89117224970707 58.030631223689625 C 216.72394804364257 52.996175022806774 217.48817143332317 47.5758875758249 218.81840212616902 43.98874033478689 C 220.6863489860719 39.65330347562858 222.6750625734734 37.41541598703627 225.4423660550642 33.99432263358715 C 227.9362159764214 31.086962070171865 229.5032968094372 29.00217848456186 234.24599422040478 24.7990247570346 C 237.5767753118045 21.919898261358504 245.54653360213143 14.975949622885306 248.49304909542428 12.897260250795814 C 253.7136026484672 9.409244617048078 257.0422086426997 8.557069960499023 257.58145581653014 8.287447230693584 z'/>",
              "firma_e":
                  "<path d='M 264.2722361355294 21.712552769306416 C 263.73298896169894 21.982175499111854 262.0446020687345 21.88299500173615 256.8240485156916 25.371010635483888 C 253.87753302239872 27.44970000757338 246.8409114366661 32.63887704257103 243.51013034526636 35.51800353824713 C 238.76743293429877 39.72115726577439 238.2710140910205 39.9519920076072 235.7771641696633 42.85935257102249 C 233.0098606880725 46.28044592447161 233.24469625396034 45.06603978322385 231.37674939405747 49.40147664238216 C 230.04651870121162 52.98862388342017 229.62453942801227 55.13004734820419 228.79176363407677 60.16450354908704 C 228.08778194790884 64.84300537016844 227.4055537992017 69.5542700495589 227.16146522957598 73.28382836651168 C 226.89715676440792 78.37995343594399 226.657087758516 76.2529935109036 226.9405392300342 82.24144072318241 C 227.15538349316856 85.97298529649838 226.73300734814865 92.97400678892535 227.80474789604293 97.8658415464026 C 229.29873826044786 103.66312400413634 229.43420320400264 103.2913359483117 232.4932041076865 108.95888995341686 C 234.94261571512087 113.33249371208818 238.71080731553718 119.95686913584409 241.45205240053826 123.81290147176931 C 245.26335881381632 129.00457472956455 245.31333213603713 128.96602875612598 249.16301036833687 133.1280528030784 C 252.40669762954482 136.57298197318505 257.58328825107276 140.64852398598117 260.53284390533435 143.9862726723619 C 264.2018139843711 148.30596119962485 264.9617036884898 151.04281054155956 267.33952229355066 153.9662801681192 C 270.2322655641828 157.35231156426812 270.5495216371501 156.2786374120772 274.29907516009854 160.58206627427646 C 276.730201381208 163.46244614754428 282.1560127539185 169.73329715079356 284.5717825444286 173.1846560616122 C 287.7638589869049 177.91605829445052 289.232380842942 180.07063211756108 290.8158770906878 183.5909643742495 C 292.4038778432558 187.4895217213604 293.61242611498506 190.89275310004263 294.2214230990972 194.57600673971473 C 294.6825299111756 198.40663311987106 295.5046445148495 201.10430783285426 294.3998319835775 206.40264157171967 C 293.4578659050878 210.01414110592862 289.83245274606577 219.01122313723545 288.05778656696504 221.98328268225455 C 284.9785698026795 226.4174722970399 284.3104926315528 225.97320989971723 279.1658327690659 229.27101342198966 C 276.2047106542502 231.07961403177623 266.71782160027334 236.08082060751593 263.2090396496704 237.6937534840816 C 257.50128317236573 240.13854597339892 256.1056718623478 239.75596671069485 252.42938407777245 240.5851539824545 C 248.64439545733305 241.3535813074444 246.94396566157525 241.68883560782496 242.3228465101609 242.27710803358016 C 238.5812041788937 242.73647895532315 234.3184788306347 242.62555189796538 230.08227503228022 243.33396182377 C 225.50349609413436 244.1849969737237 222.71591626061058 245.80638248289094 219.02345831491255 246.36695025380385 C 219.02345831491255 246.36695025380385 208.5609814191696 246.65614799620798 208.5609814191696 246.65614799620798 L 208.5609814191696 235.34385200379202 C 208.5609814191696 235.34385200379202 217.3912066825916 235.63304974619615 217.3912066825916 235.63304974619615 C 221.08366462828963 235.07248197528324 223.80236843608012 234.00485768974104 228.38114737422597 233.15382253978734 C 232.61735117258044 232.4454126139827 237.20379879230143 231.91388686511465 240.94544112356863 231.45451594337166 C 245.56656027498298 230.86624351761645 246.34661709468267 231.15905234318714 250.13160571512208 230.39062501819726 C 253.8078934996974 229.5614377464376 252.93689582508446 230.2143920959078 258.64465230238915 227.7695996065905 C 262.1534342529921 226.15666673002482 270.04376536345967 221.4643985059096 273.00488747827535 219.65579789612303 C 278.14954734076224 216.3579943738506 274.81420343881297 220.35328697775824 277.8934202030985 215.9190973629729 C 279.66808638219925 212.9470378179538 281.63383998088165 207.55026496227208 282.57580605937136 203.93876542806314 C 283.68061859064335 198.64043168919773 283.21532175593006 200.3033244810594 282.75421494385165 196.47269810090307 C 282.1452179597395 192.78944446123097 282.2355460683864 192.06370079108274 280.6475453158184 188.16514344397183 C 279.06404906807256 184.6448111872834 279.0593376000529 184.0101518302825 275.8672611575766 179.27874959744418 C 273.4514913670665 175.82739068662553 269.27839260385116 169.95680146244015 266.8472663827417 167.07642158917233 C 263.09771285979326 162.77299272697306 262.9190759971994 163.29775256875615 260.02633272656726 159.91172117260723 C 257.6485141215064 156.9882515460476 256.7214946710979 154.91871503646252 253.05252459206116 150.59902650919958 C 250.10296893779957 147.26127782281884 245.61728798126458 142.8534181395877 242.37360072005663 139.40848896948103 C 238.5239224877569 135.24646492252862 237.35927076018962 134.62261139942038 233.54796434691156 129.43093814162512 C 230.80671926191047 125.57490580569991 225.66352208803275 118.34152512336716 223.21411048059838 113.96792136469584 C 220.15510957691453 108.30036735959068 218.37217835214585 106.0533344338362 216.87818798774092 100.25605197610247 C 215.80644743984664 95.36421721862521 215.20113309866267 86.53891382751986 214.9862888355283 82.80736925420389 C 214.70283736401012 76.81892204192508 214.50105437081848 77.56840452114194 214.76536283598654 72.47227945170964 C 215.00945140561225 68.74272113475685 215.18719056353913 62.709133044771036 215.89117224970707 58.030631223689625 C 216.72394804364257 52.996175022806774 217.48817143332317 47.5758875758249 218.81840212616902 43.98874033478689 C 220.6863489860719 39.65330347562858 222.6750625734734 37.41541598703627 225.4423660550642 33.99432263358715 C 227.9362159764214 31.086962070171865 229.5032968094372 29.00217848456186 234.24599422040478 24.7990247570346 C 237.5767753118045 21.919898261358504 245.54653360213143 14.975949622885306 248.49304909542428 12.897260250795814 C 253.7136026484672 9.409244617048078 257.0422086426997 8.557069960499023 257.58145581653014 8.287447230693584 z'/>"
            }
          }
        },
        "user": {
          "idUser": null,
          "dni": dni,
          "name": name,
          "lastname": lastname,
          "login": "",
          "password": "",
          "mail": email,
          "codePhone": "{\"codePhone\": \"0,0,0\"}",
          "phone": phone,
          "idGoogle": "",
          "idHashAlastria": "",
          "idCatRoluser": "{\"idCatRoluser\": \"0,5,0\"}",
          "userStructure":
              "{\"userStructure\": [{\"idPatient\": $idUser}, {\"idEspecialist\": $idSpecialist}]}",
          "idCatAccesstype": "{\"idCatAccesstype\": \"0,1,0\"}",
          "idEstablishment": idStablishment,
          "idSpecialist": 1,
          "idCatNotification": "{\"idCatNotification\": \"0,0,0\"}",
          "keyZoom": "",
          "regStatus": "",
          "codeOtp": 0,
          "status": "1"
        }
      };
      //encode Map to JSON
      var body = json.encode(data);
      print("Data crate consent firs********************$data");
      final response = await http.post(Uri.parse(url),
          headers: {"Content-Type": "application/json"}, body: body);
      final decodedData = json.decode(response.body);

      print(decodedData);
      idConsentGeneral = decodedData['resp']['idConsent'];
      hashInitGeneral = decodedData['resp']['hashInit'];
      timeInitGeneral = decodedData['resp']['timeInit'];

      return response;
    } catch (e) {
      print('error al generar consentimiento$e');
    }
  }

  Future<http.Response> generateConsentReady() async {
    try {
      print("entro a post");
      var url = "$urlGeneralService/send-consent-crt";
      //send data to ipfs example
      Map data = {
        "consent": {
          "idConsent": idConsentGeneral,
          "idPatient": idUserGeneral,
          "idSpecialist": idSpecialistGeneral,
          "idCatSpecialty": "{\"specialties\": \"0,0,0\"}",
          "idCatProcess": "{\"procedures\": \"0,0,1,0,0\"}",
          "idCatRisk": "{}",
          "idVideo": 1,
          "showVideo": 1,
          "firmPatient": "$firmPacienteGeneral",
          "firmRepresentative": "",
          "firmSpecialist": "$firmaEspecialistaGeneral",
          "firmRevoked": "",
          "hashFpacient": "",
          "hashFrepresentative": "",
          "hashFspecialist": "",
          "hashFrevoked": "",
          "audioAcceptance": 0,
          "reviewDate": 0,
          "acceptanceDate": 0,
          "rejectedDate": 0,
          "urlPdf": "url",
          "urlAudio": "audio",
          "patientCompleted": 0,
          "specialistCompleted": "0",
          "site": 0,
          "homeFirm": 0,
          "infoOtp": 0, //aqui va el codigo otp
          "validFirmHome": 0,
          "idUserCreate": 1,
          "path": "",
          "status": "C",
          "traceability": {
            "time_init": "$timeInitGeneral",
            "hash_init": "$hashInitGeneral",
            "time_final": "",
            "hash_final": "",
            "accept_time_process": "$acceptTimeProcessGeneral",
            "accept_time_personalDate": "$acceptTimePersonalDateGeneral",
            "accept_time_consent_accept": "$acceptTimeConsentAcceptGeneral",
            "accept_decline_process": "$acceptDeclineProcessGeneral",
            "accept_video": ""
          }
        },
        "pdf": {
          "header": {
            "text1": "",
            "text2": "Documento de prueba y sin valor",
            "text3": "{centro_de_salud.logo}",
            "text4": "Internet",
            "text5": "www.smartconsent.com",
            "text6": "Documento generado por ©SmartConset"
          },
          "body": {
            "text": [
              {
                "order": 2,
                "information":
                    "Dificultades\r\n\r\nPueden aparecer manchas de color blanco en los dientes durante la realización del tratamiento. Estas manchas suelen desaparecer conforme el diente aclara su color. No obstante, en ocasiones pueden permanecer presentes a la finalización del mismo, y ser necesario poner en práctica otras alternativas terapéuticas si se desea eliminarlas.\r\n\r\nLa zona cervical del diente puede ser más rebelde al tratamiento y no llegar a conseguirse el mismo color que en el resto del mismo.\r\n\r\nEn ocasiones los dientes pueden no modificar su color con el tratamiento.\r\n\r\nPara mantener los resultados logrados tras el tratamiento puede ser necesario repetir éste periódicamente cuando el dentista lo juzgue conveniente, o poner en práctica las medidas de mantenimiento que él considere más adecuadas.\r\n\r\nRiesgos probables en condiciones normales\r\n\r\nLos tratamientos que el paciente efectúe en casa pueden dañar las encías o provocar molestias si no se realizan de forma adecuada, o se excede en el tiempo o en el número de veces de aplicación del producto al día, o en la cantidad de aplicación del mismo.\r\n\r\nSi se aplica demasiado gel provocando un contacto con las encías, se debe eliminar con una gasa, ya que se pueden producir irritaciones en las mismas.\r\n\r\nSe pueden alterar las obturaciones de metal si contactan con el producto.\r\n\r\nSi se ingiere accidentalmente se pueden ocasionalmente padecer molestias en la garganta o incluso padecer episodio leve de diarrea.\r\n\r\nDurante el tratamiento se puede tener sensibilidad o molestias en los dientes tras la ingesta de bebidas y/o comidas frías, calientes, ácidas o bebidas con gas, así como de la eventual posibilidad de presentar alergia ante algunos productos blanqueadores. Si esto sucediera, se debe contactar con la clínica. \r\nExiste riesgo de una cierta resorción radicular, sobre todo cuando se realiza en dientes que han sido endodonciados o que han sufrido traumatismos, aunque dicho riesgo es muy bajo.\r\n\r\nCircunstancias particulares del paciente:\r\n\r\nSi es fumador/a, o no tiene una buena higiene oral o se ingieren muchos alimentos o bebidas ricos en colorantes los dientes se volverán a oscurecer más rápido que si no a pesar de que los dientes se oscurecen de forma fisiológica con la edad.\r\n\r\nEn los dientes muy restaurados el blanqueamiento puede no ser muy efectivo al no presentar éstos suficiente estructura dentaria.\r\n\r\nEl tratamiento blanqueador no modifica el color de las obturaciones, carillas, corona y otros materiales colocados en mis dientes. En estos casos existen otras alternativas más indicadas a la hora de modificar el color de los dientes.\r\nSi los dientes tienen bandas o manchas, éstas se pueden seguir notando, aunque más claras.\r\n"
              },
              {
                "order": 1,
                "information":
                    "DECLARACIÓN DE INFORMACIÓN PARA EL CONSENTIMIENTO\r\nSOBRE BLANQUEAMIENTO\r\n\r\n Yo, {paciente.nombre} {paciente.apellido} con NIF/Pasaporte {paciente.dni}, declaro que con fecha {consentimiento.fecha_creacion}, en  {centro_de_salud.nombre}, el/la facultativo {especialista.nombre} {especialista.apellido}  colegiado {especialista.colegiatura} me ha propuesto y presupuestado el siguiente plan de tratamiento:\r\n\r\nPandemia Covid 19\r\n\r\nEl paciente ha sido informado de los protocolos de bioseguridad instaurados en {centro_de_salud.nombre} frente a la nueva situación creada por la PANDEMIA del Covid-19.\r\n\r\nEn la circunstancia excepcional derivada de la PANDEMIA del COVID-19, le informamos que NO es posible asegurar un RIESGO NULO de transmisión del COVID-19 a pesar de que la Clínica Dental Donnay tiene implantados unos estrictos protocolos para velar por la máxima seguridad de pacientes y profesionales.\r\n\r\nINFORMACIÓN SOBRE EL BLANQUEAMIENTO\r\n\r\nFinalidad:\r\n\r\nAclarar el color de los dientes, sean vitales o no, consiguiendo un tono más blanco. El grado de mejoría del tono de los dientes dependerá de cada persona y de sus piezas dentales, siendo más difícil en los casos de tener obturaciones o manchas y bandas intrínsecas, dado que solo se blanqueará el tejido dentario y por igual, no eliminando manchas de modo selectivo.\r\n\r\nNaturaleza del tratamiento:\r\n\r\nConsiste en:\r\n\r\n- Colocación en la consulta de un gel de blanqueamiento sobre la superficie externa de los dientes a blanquear.\r\n\r\n- Colocación en los dientes de unas cubetas de silicona blanda, hechas a medida y que serán entregadas en la consulta.\r\n\r\n- Utilización conjunta de las dos técnicas descritas anteriormente.\r\n\r\n- En la aplicación en consulta de un gel blanqueador en la superficie externa de los dientes.\r\n\r\n- En la aplicación de un gel blanqueador y un protector para mis encías y los ojos, durante un tiempo que el profesional decidirá y aplicando una fuente de luz sobre loa dientes.\r\n\r\n- Cuando el tratamiento se realiza en la consulta de forma exclusiva pueden ser necesarias varias sesiones para conseguir resultados satisfactorios.\r\n\r\n- Antes de iniciar el tratamiento blanqueador en la consulta es necesaria la adecuada protección de las encías y los dientes que no se vayan a blanquear.\r\n"
              },
              {
                "order": 3,
                "information":
                    "El paciente asume que el plan de tratamiento pautado inicialmente es orientativo y que podrá sufrir modificaciones en función de la respuesta de los dientes al mismo.\r\n\r\nSe deben seguir rigurosamente todas las instrucciones y recomendaciones indicadas por el dentista y cumplir con el programa de revisiones pautado.\r\n\r\nDECLARACIÓN DE CONSENTIMIENTO \r\n \r\nPACIENTE\r\n\r\nD/Dña. {paciente.nombre} {paciente.apellido} con DNI {paciente.dni}, o su Representante Legal D/Dña. {paciente.rep_nombre} {paciente.rep_apellido} con DNI {paciente.rep_dni}:\r\n\r\nDeclaro que el facultativo/a Dr./Dra. {especialista.nombre} {especialista.apellido} me ha explicado satisfactoriamente qué es, cómo se realiza y para qué sirve este tratamiento. También me ha explicado los riesgos existentes, las posibles molestias o complicaciones, que éste es el procedimiento, más adecuado para mi situación clínica actual, y las consecuencias previsibles de su no realización.\r\n\r\nHe comprendido perfectamente todo lo anterior, y por todo ello, en fecha consiento que el Dr/Dra {especialista.nombre} {especialista.apellido} y por ende el equipo de ayudantes de la clínica que él/ella designe se me realice el tratamiento antes mencionado reservándome el derecho de revocar en cualquier momento este consentimiento que ahora presto, sin necesidad de dar ninguna explicación.  \r\n\r\nLo que en prueba de lo dicho firmo en {ciudad.nombre} a {consentimiento.fecha_creacion}\r\n"
              },
              {
                "order": 4,
                "information":
                    " FACULTATIVO\r\n\r\n Dr./Dra. {especialista.nombre} {especialista.apellido} Nº Col. {especialista.colegiatura} he informado a este paciente y/ o su representante legal, del propósito y naturaleza del procedimiento descrito, de sus riesgos y alternativas, y las consecuencias previsibles de su no realización, dejando constancia en la historia clínica. Asimismo, se le preguntó sobre sus posibles alergias, la existencia de otras enfermedades o cualquier circunstancia patológica personal que pudiera condicionar la realización del tratamiento. Se incorpora este documento a la historia clínica del paciente.\r\n Lo que en prueba de lo dicho firmo en {ciudad.nombre}  a {consentimiento.fecha_creacion}\r\n\r\nID Audio: {audio.md5}\r\nID Video: {video.hashmd5}\r\nID Firma Paciente: {consentimiento.hash_fpaciente}\r\nID Firma Representante Legal: {consentimiento.hash_frepresentante}\r\nID Firma Especialista: {consentimiento.hash_fespecialista}"
              }
            ],
            "firmas": {
              "firma_p": "$firmPacienteGeneral",
              "firma_e": "$firmaEspecialistaGeneral"
            }
          }
        },
        "user": {
          "idEstablishment": idStablishmentGeneral,
        },
      };
      //encode Map to JSON

      print(
          "***************************************************************************$data");
      var body = json.encode(data);
      final response = await http.post(Uri.parse(url),
          headers: {"Content-Type": "application/json"}, body: body);
      final decodedData = json.decode(response.body);

      print(decodedData);
      urlPdfGeneral = decodedData['resp']['urlipfs'];

      return response;
    } catch (e) {
      print('error al generar  consentimiento$e');
    }
  }
}

class ProcessProvider {
  var url = GlobalVariables.urlServer;

  Future<List<Resp>> getSpecialities() async {
    try {
      print("obteniendo Especialidades y procedmientos ");
      var url = GlobalVariables.urlServer;
      Map data = {
        "process": "",
        "request":
            "catl-by-id", // hacer una funcion global para neviar de manera dinámica el request
        "data": {"idCatalog": "1"}
      };
      //encode Map to JSON
      var body = json.encode(data);
      final response = await http.post(Uri.parse(url),
          headers: {
            "Content-Type": "application/json",
            "accept": "application / json"
          },
          body: body);
      final decodedData = json.decode(response.body);
      print('decodedDataaaa $decodedData');

      final responsee =
          new Process.formJsonList(decodedData[0]['answer']['resp']);
      // decodedData[0]['answer']['resp'][0]['id_user']
      print("**********datos especialidades********** $responsee");
      return responsee.items;
    } catch (e) {}
  }
}

class SendFirma {
  var firmaEspecialista;
  var firmaPaciente;
  var userName = '';
  var userDni = '';

  dataUSerData(
      String name, String lastaname, String din, String dataCreation) {}

  firmaPAciente(String data) {
    firmaPaciente = data;
  }

  firmaEspecialis(String data) {
    firmaEspecialista = data;
    // print('datoespecialista$firmaEspecialista');
  }

  // ignore: missing_return
  // SE GENERA LA FIRMA EN CASA ********
  // ignore: missing_return
  Future<http.Response> generarFirma(idUser, idSpecialist, dni, email, name,
      lastname, phone, idStablishment) async {
    Random random = new Random();
    int randomNumber = random.nextInt(9000);
    print("ramdom$randomNumber");
    try {
      print("entro a post");
      var url = "$urlGeneralService/send-consent-crt";
      //send data to ipfs example
      Map data = {
        "consent": {
          "idConsent": null,
          "idPatient": idUser,
          "idSpecialist": 7,
          "idCatSpecialty": "{\"specialties\": \"0,0,0\"}",
          "idCatProcess": "{\"procedures\": \"0,0,1,0,0\"}",
          "idCatRisk": "{}",
          "idVideo": 1,
          "showVideo": 1,
          "firmPatient": "",
          "firmRepresentative": "",
          "firmSpecialist": "",
          "firmRevoked": "",
          "hashFpacient": "",
          "hashFrepresentative": "",
          "hashFspecialist": "",
          "hashFrevoked": "",
          "audioAcceptance": 0,
          "reviewDate": 0,
          "acceptanceDate": 0,
          "rejectedDate": 0,
          "urlPdf": "url",
          "urlAudio": "audio",
          "patientCompleted": 0,
          "specialistCompleted": "0",
          "site": 1,
          "homeFirm": 1,
          "infoOtp": randomNumber, //aqui va el codigo otp
          "validFirmHome": 0,
          "idUserCreate": 1,
          "path": "",
          "status": "P",
          "traceability": "{}"
        },
        "pdf": {
          "header": {
            "text1": "",
            "text2": "Documento de prueba y sin valor",
            "text3": "{centro_de_salud.logo}",
            "text4": "Internet",
            "text5": "www.smartconsent.com",
            "text6": "Documento generado por ©SmartConset"
          },
          "body": {
            "text": [
              {
                "order": 2,
                "information":
                    "Dificultades\r\n\r\nPueden aparecer manchas de color blanco en los dientes durante la realización del tratamiento. Estas manchas suelen desaparecer conforme el diente aclara su color. No obstante, en ocasiones pueden permanecer presentes a la finalización del mismo, y ser necesario poner en práctica otras alternativas terapéuticas si se desea eliminarlas.\r\n\r\nLa zona cervical del diente puede ser más rebelde al tratamiento y no llegar a conseguirse el mismo color que en el resto del mismo.\r\n\r\nEn ocasiones los dientes pueden no modificar su color con el tratamiento.\r\n\r\nPara mantener los resultados logrados tras el tratamiento puede ser necesario repetir éste periódicamente cuando el dentista lo juzgue conveniente, o poner en práctica las medidas de mantenimiento que él considere más adecuadas.\r\n\r\nRiesgos probables en condiciones normales\r\n\r\nLos tratamientos que el paciente efectúe en casa pueden dañar las encías o provocar molestias si no se realizan de forma adecuada, o se excede en el tiempo o en el número de veces de aplicación del producto al día, o en la cantidad de aplicación del mismo.\r\n\r\nSi se aplica demasiado gel provocando un contacto con las encías, se debe eliminar con una gasa, ya que se pueden producir irritaciones en las mismas.\r\n\r\nSe pueden alterar las obturaciones de metal si contactan con el producto.\r\n\r\nSi se ingiere accidentalmente se pueden ocasionalmente padecer molestias en la garganta o incluso padecer episodio leve de diarrea.\r\n\r\nDurante el tratamiento se puede tener sensibilidad o molestias en los dientes tras la ingesta de bebidas y/o comidas frías, calientes, ácidas o bebidas con gas, así como de la eventual posibilidad de presentar alergia ante algunos productos blanqueadores. Si esto sucediera, se debe contactar con la clínica. \r\nExiste riesgo de una cierta resorción radicular, sobre todo cuando se realiza en dientes que han sido endodonciados o que han sufrido traumatismos, aunque dicho riesgo es muy bajo.\r\n\r\nCircunstancias particulares del paciente:\r\n\r\nSi es fumador/a, o no tiene una buena higiene oral o se ingieren muchos alimentos o bebidas ricos en colorantes los dientes se volverán a oscurecer más rápido que si no a pesar de que los dientes se oscurecen de forma fisiológica con la edad.\r\n\r\nEn los dientes muy restaurados el blanqueamiento puede no ser muy efectivo al no presentar éstos suficiente estructura dentaria.\r\n\r\nEl tratamiento blanqueador no modifica el color de las obturaciones, carillas, corona y otros materiales colocados en mis dientes. En estos casos existen otras alternativas más indicadas a la hora de modificar el color de los dientes.\r\nSi los dientes tienen bandas o manchas, éstas se pueden seguir notando, aunque más claras.\r\n"
              },
              {
                "order": 1,
                "information":
                    "DECLARACIÓN DE INFORMACIÓN PARA EL CONSENTIMIENTO\r\nSOBRE BLANQUEAMIENTO\r\n\r\n Yo, {paciente.nombre} {paciente.apellido} con NIF/Pasaporte {paciente.dni}, declaro que con fecha {consentimiento.fecha_creacion}, en  {centro_de_salud.nombre}, el/la facultativo {especialista.nombre} {especialista.apellido}  colegiado {especialista.colegiatura} me ha propuesto y presupuestado el siguiente plan de tratamiento:\r\n\r\nPandemia Covid 19\r\n\r\nEl paciente ha sido informado de los protocolos de bioseguridad instaurados en {centro_de_salud.nombre} frente a la nueva situación creada por la PANDEMIA del Covid-19.\r\n\r\nEn la circunstancia excepcional derivada de la PANDEMIA del COVID-19, le informamos que NO es posible asegurar un RIESGO NULO de transmisión del COVID-19 a pesar de que la Clínica Dental Donnay tiene implantados unos estrictos protocolos para velar por la máxima seguridad de pacientes y profesionales.\r\n\r\nINFORMACIÓN SOBRE EL BLANQUEAMIENTO\r\n\r\nFinalidad:\r\n\r\nAclarar el color de los dientes, sean vitales o no, consiguiendo un tono más blanco. El grado de mejoría del tono de los dientes dependerá de cada persona y de sus piezas dentales, siendo más difícil en los casos de tener obturaciones o manchas y bandas intrínsecas, dado que solo se blanqueará el tejido dentario y por igual, no eliminando manchas de modo selectivo.\r\n\r\nNaturaleza del tratamiento:\r\n\r\nConsiste en:\r\n\r\n- Colocación en la consulta de un gel de blanqueamiento sobre la superficie externa de los dientes a blanquear.\r\n\r\n- Colocación en los dientes de unas cubetas de silicona blanda, hechas a medida y que serán entregadas en la consulta.\r\n\r\n- Utilización conjunta de las dos técnicas descritas anteriormente.\r\n\r\n- En la aplicación en consulta de un gel blanqueador en la superficie externa de los dientes.\r\n\r\n- En la aplicación de un gel blanqueador y un protector para mis encías y los ojos, durante un tiempo que el profesional decidirá y aplicando una fuente de luz sobre loa dientes.\r\n\r\n- Cuando el tratamiento se realiza en la consulta de forma exclusiva pueden ser necesarias varias sesiones para conseguir resultados satisfactorios.\r\n\r\n- Antes de iniciar el tratamiento blanqueador en la consulta es necesaria la adecuada protección de las encías y los dientes que no se vayan a blanquear.\r\n"
              },
              {
                "order": 3,
                "information":
                    "El paciente asume que el plan de tratamiento pautado inicialmente es orientativo y que podrá sufrir modificaciones en función de la respuesta de los dientes al mismo.\r\n\r\nSe deben seguir rigurosamente todas las instrucciones y recomendaciones indicadas por el dentista y cumplir con el programa de revisiones pautado.\r\n\r\nDECLARACIÓN DE CONSENTIMIENTO \r\n \r\nPACIENTE\r\n\r\nD/Dña. {paciente.nombre} {paciente.apellido} con DNI {paciente.dni}, o su Representante Legal D/Dña. {paciente.rep_nombre} {paciente.rep_apellido} con DNI {paciente.rep_dni}:\r\n\r\nDeclaro que el facultativo/a Dr./Dra. {especialista.nombre} {especialista.apellido} me ha explicado satisfactoriamente qué es, cómo se realiza y para qué sirve este tratamiento. También me ha explicado los riesgos existentes, las posibles molestias o complicaciones, que éste es el procedimiento, más adecuado para mi situación clínica actual, y las consecuencias previsibles de su no realización.\r\n\r\nHe comprendido perfectamente todo lo anterior, y por todo ello, en fecha consiento que el Dr/Dra {especialista.nombre} {especialista.apellido} y por ende el equipo de ayudantes de la clínica que él/ella designe se me realice el tratamiento antes mencionado reservándome el derecho de revocar en cualquier momento este consentimiento que ahora presto, sin necesidad de dar ninguna explicación.  \r\n\r\nLo que en prueba de lo dicho firmo en {ciudad.nombre} a {consentimiento.fecha_creacion}\r\n"
              },
              {
                "order": 4,
                "information":
                    " FACULTATIVO\r\n\r\n Dr./Dra. {especialista.nombre} {especialista.apellido} Nº Col. {especialista.colegiatura} he informado a este paciente y/ o su representante legal, del propósito y naturaleza del procedimiento descrito, de sus riesgos y alternativas, y las consecuencias previsibles de su no realización, dejando constancia en la historia clínica. Asimismo, se le preguntó sobre sus posibles alergias, la existencia de otras enfermedades o cualquier circunstancia patológica personal que pudiera condicionar la realización del tratamiento. Se incorpora este documento a la historia clínica del paciente.\r\n Lo que en prueba de lo dicho firmo en {ciudad.nombre}  a {consentimiento.fecha_creacion}\r\n\r\nID Audio: {audio.md5}\r\nID Video: {video.hashmd5}\r\nID Firma Paciente: {consentimiento.hash_fpaciente}\r\nID Firma Representante Legal: {consentimiento.hash_frepresentante}\r\nID Firma Especialista: {consentimiento.hash_fespecialista}"
              }
            ],
            "firmas": {
              "firma_p": "",
              "firma_e": "",
            }
          }
        },
        "user": {
          "idUser": 0,
          "dni": dni,
          "name": name,
          "lastname": lastname,
          "login": "",
          "password": "",
          "mail": email,
          "codePhone": "{\"codePhone\": \"0,0,0\"}",
          "phone": phone,
          "idGoogle": "",
          "idHashAlastria": "",
          "idCatRoluser": "{\"idCatRoluser\": \"0,5,0\"}",
          "userStructure":
              "{\"userStructure\": [{\"idPatient\": $idUser}, {\"idEspecialist\": $idSpecialist}]}",
          "idCatAccesstype": "{\"idCatAccesstype\": \"0,1,0\"}",
          "idEstablishment": 2,
          "idSpecialist": 1,
          "idCatNotification": "{\"idCatNotification\": \"0,0,0\"}",
          "keyZoom": "",
          "regStatus": "",
          "codeOtp": 0,
          "status": "1"
        }
      };

      //encode Map to JSON
      var body = json.encode(data);
      print("*********datos de envio**********$dni");
      final response = await http.post(Uri.parse(url),
          headers: {"Content-Type": "application/json"}, body: body);
      final decodedData = json.decode(response.body);

      print(decodedData);

      return response;
    } catch (e) {
      print('error al enviar firma$e');
    }
  }
}

class GetPatients {
  // ignore: missing_return
  Future<http.Response> getUserRequest() async {
    try {
      print("entro a get users");
      var url = "$urlGeneralService/get-patient-stb";
      Map data = {"idEstablishment": "$idStablishmentGeneral"};
      //encode Map to JSON
      var body = json.encode(data);
      final response = await http.post(Uri.parse(url),
          headers: {"Content-Type": "application/json"}, body: body);
      final decodedData = json.decode(response.body);

      idUserecrypt = decodedData[0]["id_patient"];
      nameecrypt = decodedData[0]["name_patient"];
      lastnameecrypt = decodedData[0]["lastname"];
      dniecrypt = decodedData[0]["dni"];
      emailecrypt = decodedData[0]["mail"];
      phoneecrypt = decodedData[0]["phone"];
      idStablishmentecrypt = int.parse(decodedData[0]["id_establishment"]);

      var testLenght = decodedData.toList().length;
      print("Datos $testLenght");

      List<user> patientsGeneral = [];
      // for (var i = 0; i < testLenght; i++) {
      //   patientsGeneral.add(user(
      //       idUser: decodedData[i]["id_patient"],
      //       idSpecialist: idSpecialistGeneral,
      //       idStablishment: idStablishmentGeneral,
      //       dni: decodedData[i]["dni"],
      //       email: decodedData[i]["mail"],
      //       name: decodedData[i]["name_patient"],
      //       lastname: decodedData[i]["lastname"],
      //       phone: decodedData[i]["phone"]));
      // }

      print("get users decrypts$decodedData");
      // final usuarios = new Users.fromJsonList(decodedData[0]['answer']);
      // print("Usuarios obtenidos$usuarios");
      // Map datamap = json.decode()
      return response;
    } catch (e) {
      print('error  en UserGetProvider $e');
    }
  }
}

class GetPantallasYConsentimientos {
  // ignore: missing_return
  Future<http.Response> getPantallasYConsents() async {
    try {
      print("entro a post");
      var url = "$urlGeneralService/get-process-detail-crt";
      Map data = {
        "idCatProcess": {"procedures": "0,0,1,0,0", "specialties": "0,0,0"}
      };
      //encode Map to JSON
      var body = json.encode(data);
      final response = await http.post(Uri.parse(url),
          headers: {"Content-Type": "application/json"}, body: body);
      final decodedData = json.decode(response.body);
      // List<String> stringList = (jsonDecode(response) as List<dynamic>).cast<String>();
      // final usr = new Users.fromJsonList(decodedData['answer']);
      // print("${response.statusCode}");
      // print("${response.body}");
      // print("sdsdsdsds ${LoginModel().id_user}");

      // ['header'][0]["structure_screens"][0]["order"]
      var pantallas = decodedData['resp'][0]['header'][0]["structure_screens"]
          ["order"][3]["text"];

      consentDocumentGeneral = decodedData['resp'][0]['header'][0]
              ["structure_screens"]["order"][3]["text"]
          .toString();
      print("Pantallas $pantallas");

      // Map datamap = json.decode()
      return response;
    } catch (e) {
      print('error  en UserGetProvider $e');
    }
  }
}
