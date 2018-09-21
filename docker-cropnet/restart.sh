#!/usr/bin/env bash
docker restart inst1
docker exec -itd inst1 bash -c "/init.sh"
