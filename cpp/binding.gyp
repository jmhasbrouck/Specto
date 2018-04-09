{
  "targets": [
    {
      "target_name": "SPG", 
      "sources": [
        "Main.cpp", "SpectrogramGenerator.cpp" 
      ],
      'libraries': ['-lfftw3'],
      "cflags!": [ "-fno-exceptions" ],
      "cflags": [ "-std=c++11" ],
      "cflags_cc!": [ "-fno-exceptions" ]
    }
  ]
}
