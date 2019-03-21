FROM registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:2.0.0
COPY init.sh /
COPY init2.sh /
COPY node1 /node1/
COPY node2 /node2/

EXPOSE 27017
EXPOSE 8888
EXPOSE 3000
ENTRYPOINT ["sh","-c","/mongodb/bin/mongod --bind_ip=0.0.0.0"]
