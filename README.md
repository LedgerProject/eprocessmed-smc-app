# The Smart Consent Project

![](./smart-consent/src/assets/img/logo.png)

eHealth startup focused exclusively on the digitization of medical processes, has technologically advanced the medical informed consent in security and communication.


## The Technology

Use of API-REST in express with Nodejs and Blockchain API Alastria. And Angular


###  Repository 

 - In "smart-consent" is the new frontend structure 
 - In "api_df_middleware" is a business middle layer
 - In "api_df_back" contains the data models
 - In "apiblockchain" It contains an api that gives access 
   to the frontend to interact with the Alastria blockchain.


## Links

Application link: [E-processmed](https://e-processmed.com/)



![](./smart-consent/src/assets/img/1.jpg)

Login screen, access to the system, with user and password

![](./smart-consent/src/assets/img/2.jpg)

Screen for the creation of consents, a list of registered patients is presented, the specialty of the doctor who accesses the system is selected, and the procedure with which the consent will be generated. When creating consent, a modal is shown with the data that will be sent to the block chain and be able to generate the hash of the record. In addition, it allows you to view the pdf with the consent generated.

![](./smart-consent/src/assets/img/3.jpg)

It lists the consents generated by the specialist, it also shows a button that redirects to the Alastria registry that is generated when the consent is created.

![](./smart-consent/src/assets/img/4.jpg)

![](./smart-consent/src/assets/img/5.jpg)

Screen that lists the procedures loaded in the database, it also contains a Button that allows the creation of new procedures using a modal that allows the entry of information.

![](./smart-consent/src/assets/img/6.jpg)

![](./smart-consent/src/assets/img/7.jpg)

Screen that lists the patients loaded into the database, also contains a Button that allows the creation of new ones, using a modal that allows the entry of their respective data.

![](./smart-consent/src/assets/img/8.jpg)

![](./smart-consent/src/assets/img/9.jpg)

Screen that lists the patients loaded into the database, also contains a Button that allows the creation of new ones, using a modal that allows the entry of their respective data.


# BlockChain
  API REST NodeJS  / 
  access to the Alastria blockchain

#Command
  npm run test
