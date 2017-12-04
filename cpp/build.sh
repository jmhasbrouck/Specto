#!/bin/bash
cd ./lib
cmake .
make
cd ./src
cp ./Spectrogram.h SndFile.h ../../
cp ./SndFile.h ../../
cd ../..
node-gyp rebuild -v --target=1.4.15 --arch=x64 --dist-url=https://atom.io/download/electron
