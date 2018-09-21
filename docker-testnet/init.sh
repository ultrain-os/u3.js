#!/usr/bin/env bash
sleep 1
rm -rf /mongodb/data
touch /data/log/log1.txt
touch /data/log/log.txt
rm -rf /nodultrain1/data
rm -rf /nodultrain2/data
./nodultrain --config-dir nodultrain2/config/ --data-dir nodultrain2/data/ > /data/log/log.txt 2>&1 &
./nodultrain --config-dir nodultrain1/config/ --data-dir nodultrain1/data/ &
forever start history/bin/www