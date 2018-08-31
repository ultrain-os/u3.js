#! /bin/bash
sleep 1
rm -rf /root/.local/share/ultrainio/nodultrain/data \
&& rm -rf /mongodb/data \
&& touch /data/log/log.txt \
&& chmod 777 /data/log/log.txt \
&& ./nodultrain > /data/log/log.txt 2>&1
