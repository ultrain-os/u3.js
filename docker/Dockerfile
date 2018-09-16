FROM registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:1.0.1
COPY config.ini /root/.local/share/ultrainio/nodultrain/config/
COPY init.sh /
COPY init2.sh /
COPY config.json /history/config.json

EXPOSE 27017
EXPOSE 8888
EXPOSE 3000
ENTRYPOINT ["sh","-c","/mongodb/bin/mongod --bind_ip=0.0.0.0"]
