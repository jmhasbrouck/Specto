{
  "targets": [
    {
      "target_name": "SPG", 
      "sources": [
        "Main.cpp", "SpectrogramGenerator.cpp", "window.cpp"
      ],
      'libraries': ['-lfftw3'],
      "cflags!": [ "-fno-exceptions", "-O1" ],
      "cflags": [ "-std=c++11", "-O1" ],
      "cflags_cc!": [ "-fno-exceptions", "-O1" ]
    }
  ]
}
