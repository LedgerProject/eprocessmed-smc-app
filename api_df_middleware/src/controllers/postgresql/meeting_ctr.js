const request = require("request");
const bcrypt = require("bcrypt");
const { urlSrv, urls, rootOtp, mailSrv, zoomSrv, shortSrv, rootShort, rootDocs, nSalt} = require('../../global/global_data');
const meetingCtr = {};

const urlServerOtp = rootOtp+urls.scriptOtpSrv;
const urlQyr = urlSrv+urls.qyrUsrSrv;
const urlCrtMeet = urlSrv+urls.crtMeetingSrv;
const urlUpMeet = urlSrv+urls.updMeetingSrv;
const urlUpDtaFrm = urlSrv+urls.updDtaFrmSrv;

meetingCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.meetingSrv}`;
  request({
    url: url,
    json: true,
    method: 'GET'
    },  (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    })
};

meetingCtr.create = (req, res) => {
  const { body } = req;
  const url = `${urlSrv}${urls.crtMeetingSrv}`;
  let dataMeeting = {
    request: body,
  }

  switch (body.appointment) {
    case 'zoom':
        const startTime = `${body.date}T${body.time}:00Z`; // var date_test = new Date("2011-07-14 11:23:00".replace(/-/g,"/"));
        const tokenZoom = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImVGVVFhcndnVGoteWVQd1JLVlRnTEEiLCJleHAiOjI1NTU1OTMyMDAsImlhdCI6MTYwNjMyNTc4OX0.ddDOjiSQkVQPNbUCbdL7MWMg8cjqy4lX5NbuoZOLaa4';
        const requestZoom = {
          "topic": "Cita Médica",
          "type": 1,
          "start_time": startTime,
          "duration": 60,
          "timezone": "Europe/Madrid",
          "password": "",
          "agenda": "Covid-19",
          "settings": {
            "host_video": 1,
            "participant_video": 1,
            "cn_meeting": 1,
            "in_meeting": 1,
            "join_before_host": 1,
            "mute_upon_entry": 1,
            "watermark": 1,
            "use_pmi": 1,
            "approval_type": 1,
            "registration_type":1,
            "audio": "ss",
            "auto_recording": "ss",
            "enforce_login": 1,
            "registrants_email_notification": 1
          }
        }; 

        const options = {
          'method': 'POST',
          'url': zoomSrv,
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenZoom}`,
            'Cookie': '_zm_mtk_guid=77a89430cd93458d8edbb1dfef35d0fc; cred=657B07B1C874608CEB1E6C6B0E5A8E2B'
          },
          body: JSON.stringify(requestZoom)
        };

        request(options, (error, response, body) => {
          if (!error ) {
            dataMeeting['answerApiZoom'] = body;
            const dataQry = {
              type: 'params', 
              item: 'usr_id', 
              value: dataMeeting.request.resp_id
            }

            // Guardar reunion en meeting urlCrtMeet
            request({
              url: urlCrtMeet,
              json: true,
              method: 'POST',
              body: dataMeeting
            }, (error, response, body) => {         
              if (!error && response.statusCode === 200) {
                const salt = bcrypt.genSaltSync(nSalt);
                const meentingId = body.resp.mt_id;// para construir la ruta de confirmación

                // Hash creadom con el id
                let confirmationKey = bcrypt.hashSync(meentingId.toString(), salt);
                  let confirmationKeyEdit = confirmationKey.replace('/', '|').toString();
                  console.log('resultado'+ confirmationKeyEdit)
                const dataMeetingUp = {
                  id: meentingId,
                  type: 'data_confirmation',
                  key: confirmationKeyEdit.toString()
                }

                request({
                  url: urlUpMeet,
                  json: true,
                  method: 'PUT',
                  body: dataMeetingUp
                }, (error, response, body) => {

                  if (!error && response.statusCode === 200) {
                    const dataFormD = {
                      id: dataMeeting.request.dfh_id,
                      type: 'status',
                      data: {
                        status: 'aforementioned' 
                      }
                    }

                    // Cambiar ststus en forms_data a aforementioned urlUpDtaFrm PUT
                    request({
                      url: urlUpDtaFrm,
                      json: true,
                      method: 'PUT',
                      body: dataFormD
                    }, (error, response, body) => {
                      if (!error && response.statusCode === 200) {

                        // Consultar si el usuario tiene correo o teléfono  
                        request({
                          url: urlQyr,
                          json: true,
                          method: 'POST',
                          body: dataQry
                        }, (error, response, body) => {
                          if (!error && response.statusCode === 200) {
                            const answerQyr = body.resp[0];
                            const answer = {
                              correct: true,
                              resp: [
                                {
                                  msg: 'Ok'
                                }
                              ]
                            }                
        
                            // Acortador link conf
                            const optionsLinkConf = {
                              method: 'POST',
                              url: shortSrv,
                              headers: { 
                                'cache-control': 'no-cache',
                                'content-type': 'multipart/form-data;'
                              },
                              formData: {
                                url: rootShort + confirmationKey.toString()
                              }
                            };

                            console.log('optionsLinkConf');
                            console.log(optionsLinkConf);
                            
                            request(optionsLinkConf, (error, response, body) => {
                              let shorResp = `${body}`;
                              const arrClean = shorResp.split(" ");
                              const strClean = arrClean[1].replace('"{', "{").replace('}"', "}");
                              const data = JSON.parse(`${strClean}`);
                              
                              console.log(data);

                              if (!error && response.statusCode === 200) {
                                const answerApiZoom = JSON.parse(dataMeeting['answerApiZoom']);

                                // Acortador link conf
                                const optionsLinkZoom = {
                                  method: 'POST',
                                  url: shortSrv,
                                  headers: { 
                                    'cache-control': 'no-cache',
                                    'content-type': 'multipart/form-data;'
                                  },
                                  formData: {
                                    url:answerApiZoom.join_url
                                  }
                                };
                                
                                request(optionsLinkZoom, (error, response, body) => {                               
                                  let shorRespZoom = `${body}`;
                                  const arrClean = shorRespZoom.split(" ");
                                  const strCleanZoom = arrClean[1].replace('"{', "{").replace('}"', "}");
                                  const dataZoom = JSON.parse(`${strCleanZoom}`);
                                  
                                  // Enviar link de reunion por OTP
                                  if (answerQyr.phone !== 'null') {
                                    //Envio link opt
                                    const paramsOtpSend = {
                                      name: answerQyr.name,
                                      key: data.link,
                                      meeting: dataZoom.link,
                                      type :'scheduled',
                                      number : answerQyr.phone
                                    };

                                    // Enviar code Otp
                                    request({
                                        url: urlServerOtp,
                                        headers: {'content-type' : 'application/x-www-form-urlencoded'},
                                        method: 'POST',
                                        form: paramsOtpSend
                                    }, (error, response, body) => {
                                      res.send(body);
                                    });                        

                                  } else {
                                    const paramsMailSend = {
                                      nombre: answerQyr.name,
                                      msg: 'E PROCESS MED informa. Estimad@ '+answerQyr.name +  ', su enlace para confirmar la cita es:' + data.link + ' y el acceso online es: ' +dataZoom.link,
                                      correo: answerQyr.email                   
                                    }; 
                                  
                                    // Envio link correo
                                    const optionsMail = {
                                      method: 'POST',
                                      url: mailSrv,
                                      headers: {
                                        'cache-control': 'no-cache',
                                        'content-type': 'multipart/form-data;' 
                                      },
                                      formData: paramsMailSend 
                                    };

                                    request(optionsMail, (error, response, body) => {
                                      if (error) throw new Error(error);
                                      res.send(answer);
                                    });

                                  }

                                });             

                              } else {
                                  res.send(body);
                              }

                            });                       
                          }                     
                        })
                      }
                    })                      
                  }
                });
              }
            })
          } else {
            console.log(error);
          }
        });
      break;
        case 'face-to-face':
        const startTimef = `${body.date}T${body.time}:00Z`; // var date_test = new Date("2011-07-14 11:23:00".replace(/-/g,"/"));
        const tokenZoomf = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImVGVVFhcndnVGoteWVQd1JLVlRnTEEiLCJleHAiOjI1NTU1OTMyMDAsImlhdCI6MTYwNjMyNTc4OX0.ddDOjiSQkVQPNbUCbdL7MWMg8cjqy4lX5NbuoZOLaa4';
        const requestZoomf = {
          "topic": "Cita Médica",
          "type": 1,
          "start_time": startTimef,
          "duration": 60,
          "timezone": "Europe/Madrid",
          "password": "",
          "agenda": "Covid-19",
          "settings": {
            "host_video": 1,
            "participant_video": 1,
            "cn_meeting": 1,
            "in_meeting": 1,
            "join_before_host": 1,
            "mute_upon_entry": 1,
            "watermark": 1,
            "use_pmi": 1,
            "approval_type": 1,
            "registration_type":1,
            "audio": "ss",
            "auto_recording": "ss",
            "enforce_login": 1,
            "registrants_email_notification": 1
          }
        }; 

        const optionsf = {
          'method': 'POST',
          'url': zoomSrv,
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenZoomf}`,
            'Cookie': '_zm_mtk_guid=77a89430cd93458d8edbb1dfef35d0fc; cred=657B07B1C874608CEB1E6C6B0E5A8E2B'
          },
          body: JSON.stringify(requestZoomf)
        };

        request(optionsf, (error, response, body) => {
          if (!error ) {
            dataMeeting['answerApiZoom'] = body;
            const dataQry = {
              type: 'params', 
              item: 'usr_id', 
              value: dataMeeting.request.resp_id
            }

            // Guardar reunion en meeting urlCrtMeet
            request({
              url: urlCrtMeet,
              json: true,
              method: 'POST',
              body: dataMeeting
            }, (error, response, body) => {         
              if (!error && response.statusCode === 200) {
                const salt = bcrypt.genSaltSync(nSalt);
                const meentingId = body.resp.mt_id;// para construir la ruta de confirmación

                // Hash creadom con el id
                const confirmationKey = bcrypt.hashSync(meentingId.toString(), salt);
                const dataMeetingUp = {
                  id: meentingId,
                  type: 'data_confirmation',
                  key: confirmationKey,
                  status:'rescheduled'
                }

                request({
                  url: urlUpMeet,
                  json: true,
                  method: 'PUT',
                  body: dataMeetingUp
                }, (error, response, body) => {

                  if (!error && response.statusCode === 200) {
                    const dataFormD = {
                      id: dataMeeting.request.dfh_id,
                      type: 'status',
                      data: {
                        status: 'aforementioned' 
                      }
                    }

                    // Cambiar ststus en forms_data a aforementioned urlUpDtaFrm PUT
                    request({
                      url: urlUpDtaFrm,
                      json: true,
                      method: 'PUT',
                      body: dataFormD
                    }, (error, response, body) => {
                      if (!error && response.statusCode === 200) {

                        // Consultar si el usuario tiene correo o teléfono  
                        request({
                          url: urlQyr,
                          json: true,
                          method: 'POST',
                          body: dataQry
                        }, (error, response, body) => {
                          if (!error && response.statusCode === 200) {
                            const answerQyr = body.resp[0];             
                            
                            const answer = {
                              correct: true,
                              resp: [
                                {
                                  msg: 'Ok'
                                }
                              ]
                            }                
        
                            // Acortador link conf
                            const optionsLinkConf = {
                              method: 'POST',
                              url: shortSrv,
                              headers: { 
                                'cache-control': 'no-cache',
                                'content-type': 'multipart/form-data;'
                              },
                              formData: {
                                url: rootShort + confirmationKey.toString()
                              }
                            };

                            console.log('optionsLinkConf');
                            console.log(optionsLinkConf);
                            
                            request(optionsLinkConf, (error, response, body) => {
                              let shorResp = `${body}`;
                              const arrClean = shorResp.split(" ");
                              const strClean = arrClean[1].replace('"{', "{").replace('}"', "}");
                              const data = JSON.parse(`${strClean}`);
                              
                              console.log(data);

                              if (!error && response.statusCode === 200) {
                                const answerApiZoom = JSON.parse(dataMeeting['answerApiZoom']);
                                // Acortador link conf
                                const optionsLinkZoom = {
                                  method: 'POST',
                                  url: shortSrv,
                                  headers: { 
                                    'cache-control': 'no-cache',
                                    'content-type': 'multipart/form-data;'
                                  },
                                  formData: {
                                    url:answerApiZoom.join_url
                                  }
                                };
                               
                                request(optionsLinkZoom, (error, response, body) => {                               
                                  let shorRespZoom = `${body}`;
                                  console.log('shorRespZoom');
                                  console.log(shorRespZoom);
                                  const arrClean = shorRespZoom.split(" ");
                                  console.log(shorRespZoom)
                                  const strCleanZoom = arrClean[1].replace('"{', "{").replace('}"', "}");
                                  const dataZoom = JSON.parse(`${strCleanZoom}`);

                                  // Enviar link de reunion por OTP
                                  if (answerQyr.phone !== 'null') {
                                    //Envio link opt
                                    const paramsOtpSend = {
                                      name: answerQyr.name,
                                      key: data.link,
                                      meeting: dataZoom.link,
                                      type :'scheduled',
                                      number : answerQyr.phone
                                    };

                                    // Enviar code Otp
                                    request({
                                        url: urlServerOtp,
                                        headers: {'content-type' : 'application/x-www-form-urlencoded'},
                                        method: 'POST',
                                        form: paramsOtpSend
                                    }, (error, response, body) => {
                                      console.log(body);
                                      res.send(body);
                                    });                        

                                  } else {
                                    const paramsMailSend = {
                                      nombre: answerQyr.name,
                                      msg: 'E PROCESS MED informa. Estimad@ '+answerQyr.name + ', su enlace para confirmar la cita es:' + data.link,
                                      correo: answerQyr.email                 
                                    }; 
                                  
                                    // Envio link correo
                                    const optionsMail = {
                                      method: 'POST',
                                      url: mailSrv,
                                      headers: {
                                        'cache-control': 'no-cache',
                                        'content-type': 'multipart/form-data;' 
                                      },
                                      formData: paramsMailSend 
                                    };

                                    request(optionsMail, (error, response, body) => {
                                      if (error) throw new Error(error);
                                      console.log(body);
                                      res.send(answer);
                                    });

                                  }

                                });             

                              } else {
                                  res.send(body);
                              }

                            });                       
                          }                     
                        })
                      }
                    })                      
                  }
                                        
              });
              }
            })
          } else {
            console.log(error);
          }
        });
      break;
  }
};

meetingCtr.getById = (req, res) => {
  const { id } = req.params;
  const url = `${urlSrv}${urls.getMeetingSrv}/${id}`;
  request({
    url: url,
    json: true,
    method: 'GET'
    },  (error, response, body) => {
      let data = {forms:body.resp};
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
};

meetingCtr.getByKey = (req, res) => {
  const { key } = req.params;
  const url = `${urlSrv}${urls.getKeyMeetingSrv}/${key}`;
  request({
    url: url,
    json: true,
    method: 'GET'
    },  (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
  })
};

meetingCtr.upDate = (req, res) => {
  const url = `${urlSrv}${urls.updMeetingSrv}`;
  request({
  url: url,
  json: true,
  method: 'PUT',
  body: req.body
  },  (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
};
meetingCtr.delete = (req, res) => {
  let { id } = req.params;
  let url = `${urlSrv}${urls.dltMeetingSrv}/${$id}`;

  request({
  url: url,
  json: true,
  method: 'DELETE'
  },  (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
}

module.exports = meetingCtr;
