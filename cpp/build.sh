#!/bin/bash
if [ "$1" = "debug" ]; then
    echo "debug"
    node-gyp rebuild --debug --target=v9.8.0
else
    echo "release"
    node-gyp rebuild --target="1.8.4" --arch=x64 --dist-url=https://atom.io/download/electron
fi
