#! /bin/bash
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

# create a pair key and accounts
# for ubuntu
# readarray -t Keys < <($clultrain create key | awk -F: '{print $2}')

# The system and user account
sys_acc_arr=(utrio.code ultrio.bpay utrio.msig utrio.names utrio.ram utrio.ramfee utrio.saving utrio.stake utrio.token utrio.vpay exchange)
#user_acc_arr=(jack)
user_acc_arr=(jack tony bechham rose tom jerry test1 test2 test3 test4 nft)


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

# Deploy the sysmte contract twice

$clultrain set contract ultrainio $ContractPath/ultrainio.system/ -p ultrainio -x 3600
#$clultrain set contract ultrainio $ContractPath/ultrainio.system/ -p ultrainio -x 3600

for account in ${user_acc_arr[@]};
do
	Keys=($($clultrain create key | awk -F: '{print $2}'))
    PrivKey=${Keys[0]}
	PubKey=${Keys[1]}
	$clultrain wallet import --private-key $PrivKey
	$clultrain system newaccount ultrainio ${account} -u ${PubKey} ${PubKey} --stake-net "1000.0000 SYS" --stake-cpu "1000.0000 SYS" --buy-ram-kbytes 1024

    if [ "$account" == "test1" ]; then
        echo "test1 PubKey is: " ${PubKey}
        echo "test1 PriKey is: " ${PrivKey}
        $clultrain set account permission test1 active '{"threshold": 1,"keys": [{"key":"'${PubKey}'","weight": 1}],"accounts": [{"permission":{"actor":"test1","permission":"utrio.code"},"weight":1}]}' owner -p test1    
    fi
done

# call utr.token issue
for account in ${user_acc_arr[@]}
do
	$clultrain push action utrio.token issue '[ "'${account}'", "100000000.0000 SYS", "memo" ]' -p ultrainio
done
##
printf 'The internel user account:'
for account in ${user_acc_arr[@]}
do
	printf '%s ' ${account}
done
printf '\n'

echo "Password for wallet default, please save it safely : " $WalletPwd
