#!/usr/bin/env bash
rm -rf ../scratch
docker rm -f inst1
docker build -t registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:1.0.1 .
docker run -itd -p 127.0.0.1:27018:27017 -p 127.0.0.1:8888:8888 -p 127.0.0.1:3000:3000 --name=inst1 -v $HOME/log:/data/log registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:1.0.1
docker exec -itd inst1 bash -c "/init.sh"
sleep 1
docker exec -it inst1 bash -c "/init2.sh"
