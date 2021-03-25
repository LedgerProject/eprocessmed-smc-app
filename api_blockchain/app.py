import sys
import json
from web3 import Web3

# rpc
rpc= "http://173.212.249.29/rpc"
web3 = Web3(Web3.HTTPProvider(rpc))

account = '0x86d523D8ffEB7B2f28d48935852240571576e639'
private_key = '51ffa335abcda56f4f5bdcc537574bdee7b05a85b7d03cb51e5f5d9d081996f0'

# abi
abi = json.loads('[{"constant":false,"inputs":[{"name":"patient","type":"string"},{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"name":"crear","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"string"}],"name":"getCovid","outputs":[{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"covidtest","outputs":[{"name":"patient","type":"string"},{"name":"pdf","type":"string"},{"name":"specialist","type":"string"},{"name":"pcr","type":"string"},{"name":"creation_date","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalCovidtest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"patient","type":"string"},{"indexed":false,"name":"pdf","type":"string"},{"indexed":false,"name":"specialist","type":"string"},{"indexed":false,"name":"pcr","type":"string"},{"indexed":false,"name":"creation_date","type":"string"}],"name":"CovidEvent","type":"event"}]')

# Direccion Contrato
address = web3.toChecksumAddress('0x580e7eefa322b86fa004d0caabc2faa5ffb08b77')
contract = web3.eth.contract(address=address, abi=abi)

nonce = web3.eth.getTransactionCount(account)

#Variable
patient = '8100769816'
pdf = 'esteesmi.pdf2'
specialist = 'Dr Carlitos 2'
pcr = 'NEGATIVO'
creation_date = '28012021'

#Envio transaccion
data = contract.encodeABI (fn_name='crear', args=[patient, pdf, specialist, pcr, creation_date])
tx = {
    'nonce': nonce,
    'to': address,
    'value': web3.toWei(0, 'ether'),
    'gas': 2000000,
    'gasPrice': web3.toWei('0', 'gwei'),
    'data': data
   
}



signed_tx = web3.eth.account.signTransaction(tx, private_key)
tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
print(web3.toHex(tx_hash))
print(nonce)
pacientes = contract.functions.getCovid('10076981OT').call()

print('PCIENTES',pacientes)