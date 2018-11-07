#!/usr/bin/env bash
docker rm -f inst2
docker build -t registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:2.0.0 .
docker run -itd -p 127.0.0.1:27018:27017 -p 127.0.0.1:8888:8888 -p 127.0.0.1:3000:3000 --name=inst2 -v $HOME/log:/data/log registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:2.0.0
docker exec -itd inst2 bash -c "/init.sh"
sleep 30
docker exec -it inst2 bash -c "/init2.sh"
