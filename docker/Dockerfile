FROM registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:1.0.1
COPY config.ini /root/.local/share/ultrainio/nodultrain/config/
COPY init.sh /
COPY init2.sh /
USER root

#COPY ultrain-rest-api /history/
#RUN ls -la /history/*
#RUN apt-get install --yes \
#    curl \
##    sudo
#RUN curl --silent --location https://deb.nodesource.com/setup_8.x | sudo bash -
#RUN apt-get install --yes \
#   nodejs \
#   build-essential
#RUN cd /history; npm install

EXPOSE 27017
EXPOSE 8888
EXPOSE 3000
ENTRYPOINT ["sh","-c","chmod 777 init.sh && chmod 777 init2.sh && /mongodb/bin/mongod --bind_ip=0.0.0.0"]
