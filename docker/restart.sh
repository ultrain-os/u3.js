#!/usr/bin/env bash
docker restart inst2
docker exec -it inst2 bash -c "/init.sh"
