#include "Spectrogram.h"

Spectrogram::Spectrogram(std::string file)
{ 
  fileName = file;
  frames = 0;
  samplerate = 0;
  freqres = 0;
}

void Spectrogram::getData(char* data,
			  size_t dataOffset,
			  size_t height,
			  size_t width,
			  double minDb) {
  this->data = data;
  this->height = height;
  this->width = width;
  this->minDb = minDb;
  MY_INFO info = getSpecData(data, fileName.c_str(), 0, height, width, minDb);
  this->frames = (double)info.frames;
  this->samplerate = (double)info.samplerate;
  int speclen =  height * (info.samplerate / 20 / height + 1);
  speclen += 0x40 - (speclen & 0x3f) ;
  this->freqres = (double)speclen;
}
// returns audio length in seconds
double Spectrogram::getAudioLength() {
  if (0.0 >= samplerate) {
    return 0.0;
  }
  return (double)frames/(double)samplerate;
}
double Spectrogram::getFrequencyResolution() {
  if (0.0 >= freqres) {
    return 0.0;
  }
  return freqres;
}

