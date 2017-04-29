#include "Spectrogram.h"
#include <iostream>
#define SAMPLES_PER_FRAME 512

int main(int argc, char** argv)
{
    if (argc < 2)
    {
        std::cout << "Usage: wave_iteration <FILENAME>" << std::endl;
        return 1;
    }

    AquilaSpectrogram::Spectrogram s(argv[1], 1024);
    
    for (int i = 0 ; i < s.getData()->size(); i++ ) {
      std::cout << s.getData()->at(i) << " ";
      std::cout << i << std::endl;
    }
    std::cout << std::endl;
    //std::cout << s.getSamplesPerFrame();
    return 0;
}
