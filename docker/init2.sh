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

$clultrain wallet import --private-key '5JPpd8k9p8tzt7X1xffP3eiiW1cemZHyqBtm43g59NLn6VPLu39'

if test -z $WalletPwd
then
   echo "Wallet password is empty, quit."
   exit 0
fi

ContractPath=/contracts

# The system and user account
sys_acc_arr=(utrio.code ultrio.bpay utrio.msig utrio.names utrio.ram utrio.ramfee utrio.saving utrio.stake utrio.token utrio.vpay utrio.fee  exchange)

# Create the system accounts
for account in ${sys_acc_arr[@]};
do
	Keys=($($clultrain create key | awk -F: '{print $2}'))
	PrivKey=${Keys[0]}
	PubKey=${Keys[1]}
	$clultrain wallet import --private-key $PrivKey
	$clultrain create account ultrainio ${account} $PubKey ${PubKey}
done


test_acc_arr=(ben john tony jack bob tom jerry alice)

test_acc_pri_arr=(
5JbedY3jGfNK7HcLXcqGqSYrmX2n8wQWqZAuq6K7Gcf4Dj62UfL
5JxipaPk9qvM4xZ4ggRBGbntXatnwmGQ1ZHMaF9RSPLhyg17ALW
5KbHvFfDXovPvo2ACNd23yAE9kJF7Mxaws7srp6VapjMr7TrHZB
5JC2uWa7Pba5V8Qmn1pQPWKDPgwmRSYeZzAxK48jje6GP5iMqmM
5JoQtsKQuH8hC9MyvfJAqo6qmKLm8ePYNucs7tPu2YxG12trzBt
5KXYYEWSFRWfNVrMPaVcxiRTjD9PzHjBSzxhA9MeQKHPMxWP8kU
5JFz7EbcsCNHrDLuf9VpHtnLdepL4CcAEXu7AtSUYfcoiszursr
5J9bWm2ThenDm3tjvmUgHtWCVMUdjRR1pxnRtnJjvKA4b2ut5WK
)

test_acc_pub_arr=(
UTR6ujHgxt2hUz7BfvJz6epfvWzhXEp1ChVKEFZxf1Ld5ea83WE6V
UTR5CGbtir6mr6AbPfow6rgYYEo3WnMEctNL3mMWehXbDwvomqHQG
UTR6oPKRu3MyNhNN9YdXgxfGMTM2j2EhBAqYaQALmHZ7kcQmD9uE4
UTR6rBwNTWJSNMYu4ZLgEigyV5gM8hHiNinqejXT1dNGZa5xsbpCB
UTR5VE6Dgy9FUmd1mFotXwF88HkQN1KysCWLPqpVnDMjRvGRi1YrM
UTR5p48ox7N8NfR8YR9H8ojgR3ewV3gCk6Z16BrUEGFSgonKUs1KR
UTR8Mz4buVKZiUXVxAhr4Bm4qM3V7bPJLWwqQ1eN4BxxcFJ3LosY9
UTR7zsqi7QUAjTAdyynd6DVe8uv4K8gCTRHnAoMN9w9CA1xLCTDVv
)

for pri in ${test_acc_pri_arr[@]};
do
	$clultrain wallet import --private-key $pri
done

accounts_l=${#test_acc_arr[*]}
for ((i=0;i<$accounts_l;i++))
do
    echo ${test_acc_arr[$i]}
	$clultrain create account ultrainio ${test_acc_arr[$i]} ${test_acc_pub_arr[$i]} ${test_acc_pub_arr[$i]}
done

sleep 15

# Deploy the system contract
$clultrain set contract utrio.token $ContractPath/ultrainio.token/ -p utrio.token
$clultrain push action utrio.token create '[ "ultrainio", "8000000000.0000 UGAS"]' -p utrio.token
$clultrain push action utrio.token issue '[ "ultrainio", "1000000000.0000 UGAS"]' -p ultrainio
$clultrain set contract ultrainio $ContractPath/ultrainio.system/ -p ultrainio -x 3600

sleep 15

for ((i=0;i<$accounts_l;i++))
do
    echo ${test_acc_arr[$i]}
    $clultrain transfer -f ultrainio ${test_acc_arr[$i]} "1000.0000 UGAS"
done