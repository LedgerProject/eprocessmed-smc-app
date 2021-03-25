from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Testcovid
from .serializers import TestcovidSerializers
from .models import SmartConsentModel
from .serializers import smartConsentSerializers
import json
from web3 import Web3

@api_view(['GET', 'POST'])
def CovidTestBlockchainView(request):

    # rpc
    rpc= "http://173.212.249.29/rpc"
    web3 = Web3(Web3.HTTPProvider(rpc))

    account = '0x86d523D8ffEB7B2f28d48935852240571576e639'
    private_key = ''

    # abi
    abi = json.loads('[{"constant":false,"inputs":[{"name":"patient","type":"string"},{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"name":"crear","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"string"}],"name":"getCovid","outputs":[{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"covidtest","outputs":[{"name":"patient","type":"string"},{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalCovidtest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"patient","type":"string"},{"indexed":false,"name":"pdf","type":"string"},{"indexed":false,"name":"specialist","type":"string"},{"indexed":false,"name":"pcr","type":"string"},{"indexed":false,"name":"creation_date","type":"string"}],"name":"CovidEvent","type":"event"}]')

    # Direccion Contrato
    address = web3.toChecksumAddress('0x580e7eefa322b86fa004d0caabc2faa5ffb08b77')
    contract = web3.eth.contract(address=address, abi=abi)

    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Testcovid.objects.all()
        serializer = TestcovidSerializers(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TestcovidSerializers(data=request.data)
        if serializer.is_valid():

            #Envio transaccion
            nonce = web3.eth.getTransactionCount(account)
            #Variables y request
            patient = request.data.get("patient")
            pdf = request.data.get("pdf")
            specialist = request.data.get("specialist")
            pcr = request.data.get("pcr")
            creation_date = request.data.get("creation_date")

            data = contract.encodeABI (fn_name='crear', args=[patient, pdf, specialist, pcr, creation_date])
            tx = {
                'nonce': nonce,
                'to': address,
                'value': web3.toWei(0, 'ether'),
                'gas': 2000000,
                'gasPrice': web3.toWei('0', 'gwei'),
                'data': data
            
            }


            #Firmamos la transaccion
            signed_tx = web3.eth.account.signTransaction(tx, private_key)
            tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
            hashResult = web3.toHex(tx_hash)
            alastriaURL = 'https://blkexplorer1.telsius.alastria.io/transaction/'
            print(web3.toHex(tx_hash))
            print(nonce)
            #pacientes = contract.functions.getCovid(patient).call()

            #print('PCIENTES',pacientes)



            #serializer.save()
            return Response({'data':serializer.data, 'hash': alastriaURL+hashResult})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Consulta directa a la cadena
@api_view(['POST'])
def CovidTestBlockchainCall(request):
     # rpc
    rpc= "http://173.212.249.29/rpc"
    web3 = Web3(Web3.HTTPProvider(rpc))

    # abi
    abi = json.loads('[{"constant":false,"inputs":[{"name":"patient","type":"string"},{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"name":"crear","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"string"}],"name":"getCovid","outputs":[{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"covidtest","outputs":[{"name":"patient","type":"string"},{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalCovidtest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"patient","type":"string"},{"indexed":false,"name":"pdf","type":"string"},{"indexed":false,"name":"specialist","type":"string"},{"indexed":false,"name":"pcr","type":"string"},{"indexed":false,"name":"creation_date","type":"string"}],"name":"CovidEvent","type":"event"}]')

    # Direccion Contrato
    address = web3.toChecksumAddress('0x580e7eefa322b86fa004d0caabc2faa5ffb08b77')
    contract = web3.eth.contract(address=address, abi=abi)

    if request.method == 'POST':
            serializer = TestcovidSerializers(data=request.data)
            patient = request.data.get("patient")
            pacientes = contract.functions.getCovid(patient).call()
            print('PCIENTES',pacientes) 
            
            return Response({'pdf':pacientes[0], 'specialist': pacientes[1], 'pcr':  pacientes[2], 'creation_date':  pacientes[3] })



#FUNCIONES PARA JSON


abiJ = json.loads('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"jsondget","outputs":[{"name":"id","type":"string"},{"name":"field1","type":"string"},{"name":"field2","type":"string"},{"name":"field3","type":"string"},{"name":"field4","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalJsonGet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"field1","type":"string"},{"name":"field2","type":"string"},{"name":"field3","type":"string"},{"name":"field4","type":"string"},{"name":"creation_date","type":"string"}],"name":"crear","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"}],"name":"getJson","outputs":[{"name":"field1","type":"string"},{"name":"field2","type":"string"},{"name":"field3","type":"string"},{"name":"field4","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"string"},{"indexed":false,"name":"field1","type":"string"},{"indexed":false,"name":"field2","type":"string"},{"indexed":false,"name":"field3","type":"string"},{"indexed":false,"name":"field4","type":"string"},{"indexed":false,"name":"creation_date","type":"string"}],"name":"CovidEvent","type":"event"}]')

@api_view(['GET', 'POST'])
def SmartConsentBlockchainView(request):

    # rpc
    rpc= "http://173.212.249.29/rpc"
    web3 = Web3(Web3.HTTPProvider(rpc))

    account = '0x86d523D8ffEB7B2f28d48935852240571576e639'
    private_key = ''

    
    # Direccion Contrato
    address = web3.toChecksumAddress('0xe5254466ae82fbee62f830ff18c5c72fa2622b1e')
    contract = web3.eth.contract(address=address, abi=abiJ)

    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = SmartConsentModel.objects.all()
        serializer = smartConsentSerializers(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = smartConsentSerializers(data=request.data)
        if serializer.is_valid():
            #serializer.save()
            #Envio transaccion
            nonce = web3.eth.getTransactionCount(account)
            #Variables y request
            idb = request.data.get("idb")
            field1 = request.data.get("field1")
            field2 = request.data.get("field2")
            field3 = request.data.get("field3")
            field4 = request.data.get("field4")
            creation_date = request.data.get("creation_date")
           

            data = contract.encodeABI (fn_name='crear', args=[idb, field1, field2, field3, field4, creation_date])
            tx = {
                'nonce': nonce,
                'to': address,
                'value': web3.toWei(0, 'ether'),
                'gas': 90000000,
                'gasPrice': web3.toWei('0', 'gwei'),
                'data': data
            
            }


            #Firmamos la transaccion
            signed_tx = web3.eth.account.signTransaction(tx, private_key)
            tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
            hashResult = web3.toHex(tx_hash)
            alastriaURL = 'https://blkexplorer1.telsius.alastria.io/transaction/'
            print(web3.toHex(tx_hash))
            print(nonce)
            #pacientes = contract.functions.getCovid(patient).call()

            #print('PCIENTES',pacientes)



            #serializer.save()
            return Response({'data':serializer.data, 'hash': alastriaURL+hashResult})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Consulta directa a la cadena
@api_view(['POST'])
def SmartConsenttBlockchainCall(request):
     # rpc
    rpc= "http://173.212.249.29/rpc"
    web3 = Web3(Web3.HTTPProvider(rpc))

    # abi
    abiJ = json.loads('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"jsondget","outputs":[{"name":"id","type":"string"},{"name":"field1","type":"string"},{"name":"field2","type":"string"},{"name":"field3","type":"string"},{"name":"field4","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalJsonGet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"field1","type":"string"},{"name":"field2","type":"string"},{"name":"field3","type":"string"},{"name":"field4","type":"string"},{"name":"creation_date","type":"string"}],"name":"crear","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"}],"name":"getJson","outputs":[{"name":"field1","type":"string"},{"name":"field2","type":"string"},{"name":"field3","type":"string"},{"name":"field4","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"string"},{"indexed":false,"name":"field1","type":"string"},{"indexed":false,"name":"field2","type":"string"},{"indexed":false,"name":"field3","type":"string"},{"indexed":false,"name":"field4","type":"string"},{"indexed":false,"name":"creation_date","type":"string"}],"name":"CovidEvent","type":"event"}]')

    # Direccion Contrato
    address = web3.toChecksumAddress('0xe5254466ae82fbee62f830ff18c5c72fa2622b1e')
    contract = web3.eth.contract(address=address, abi=abiJ)

    if request.method == 'POST':
            serializer = smartConsentSerializers(data=request.data)
            idb = request.data.get("idb")
            pacientes = contract.functions.getJson(idb).call()
            #print('JSON: ',pacientes) 
            
          
        
            return Response(pacientes)