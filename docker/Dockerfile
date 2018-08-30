FROM registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:1.0.0
COPY config.ini /root/.local/share/ultrainio/nodultrain/config/

#COPY contracts/ /contracts/
#RUN ls -la /contracts/*
#COPY nodultrain /
#COPY clultrain /
#COPY kultraind /
#COPY init.sh /
#COPY init2.sh /
#RUN mkdir -p /data/db

USER root
EXPOSE 27017
EXPOSE 8888
ENTRYPOINT ["sh","-c","chmod 777 init.sh && chmod 777 init2.sh && /mongodb/bin/mongod --bind_ip=0.0.0.0"]
