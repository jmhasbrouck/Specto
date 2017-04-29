#include <string>
#include <iostream>
#include <sndfile.h>
#include "SndFile.h"

extern "C" {
  
  typedef struct
  {
    size_t frames, samplerate;
  } MY_INFO;
  extern MY_INFO getSpecData(char* data, const char* fileName,int dataOffset, int height, int width, double minDb);
}
class Spectrogram {
 public:
  Spectrogram(std::string file);
  void getData(  char* data,
		 size_t dataOffset,
		 size_t height,
		 size_t width,
		 double minDb);
  ~Spectrogram() {
  }
  // returns audio length in seconds
  double getAudioLength();
  double getFrequencyResolution();
 private:
  char* data;
  double frames;
  double samplerate;
  double freqres;
  double height;
  double width;
  double minDb;
  std::string fileName;
};

