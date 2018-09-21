#!/usr/bin/env bash
sleep 1
clultrain=./clultrain

# remove default.wallet
DWallet=/root/ultrainio-wallet/default.wallet
if [ -e $DWallet ]; then
    rm $DWallet
fi
# create default wallet
WalletPwd=$($clultrain wallet create | tail -n 1 | sed 's/\"//g')
if test -z $WalletPwd
then
   echo "Wallet password is empty, quit."
   exit 0
fi

ContractPath=/contracts

# The system and user account
sys_acc_arr=(utrio.code ultrio.bpay utrio.msig utrio.names utrio.ram utrio.ramfee utrio.saving utrio.stake utrio.token utrio.vpay exchange)

# Create the system accounts
for account in ${sys_acc_arr[@]};
do
	Keys=($($clultrain create key | awk -F: '{print $2}'))
	PrivKey=${Keys[0]}
	PubKey=${Keys[1]}
	$clultrain wallet import --private-key $PrivKey
	$clultrain create account ultrainio ${account} $PubKey ${PubKey}
done

# Deploy the system contract
$clultrain set contract utrio.token $ContractPath/ultrainio.token/ -p utrio.token
$clultrain push action utrio.token create '[ "ultrainio", "8000000000.0000 SYS"]' -p utrio.token
$clultrain push action utrio.token issue '[ "ultrainio", "1000000000.0000 SYS"]' -p ultrainio
$clultrain set contract ultrainio $ContractPath/ultrainio.system/ -p ultrainio -x 3600
