#!/usr/bin/env bash
sleep 1
rm -rf /mongodb/data
touch /data/log/log1.txt
touch /data/log/log2.txt
./nodultrain --config-dir node2/config/ --data-dir node2/data/ > /data/log/log2.txt 2>&1 &
./nodultrain --config-dir node1/config/ --data-dir node1/data/ > /data/log/log1.txt 2>&1 &
cd history; pm2 start bin/www