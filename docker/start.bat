docker build -t registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:2.0.0 .

docker run -itd -p 127.0.0.1:27018:27017 -p 127.0.0.1:8888:8888 -p 127.0.0.1:3000:3000 --name=inst2 -v %Log%:/data/log registry.cn-hangzhou.aliyuncs.com/ultrain/ultraind:2.0.0
docker exec -d inst2 bash -c "cd history && pm2 start bin/www &"
docker exec -d inst2 bash -c "/init.sh"
docker exec -d inst2 bash -c "/init2.sh > /data/log/init2.txt 2>&1 &"