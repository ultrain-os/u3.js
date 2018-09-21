FROM registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:2.0.0
COPY init.sh /
COPY init2.sh /
COPY config.ini1 /
COPY config.ini2 /

RUN rm -rf nodultrain1 && mkdir nodultrain1 && cd nodultrain1 && mkdir config && mkdir data \
  && rm -rf nodultrain2 && mkdir nodultrain2 && cd nodultrain2 && mkdir config && mkdir data \
  && mv /config.ini1 /nodultrain1/config/config.ini \
  && mv /config.ini2 /nodultrain2/config/config.ini

EXPOSE 27017
EXPOSE 8888
EXPOSE 3000
ENTRYPOINT ["sh","-c","/mongodb/bin/mongod --bind_ip=0.0.0.0"]
