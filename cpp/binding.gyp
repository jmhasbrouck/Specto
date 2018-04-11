{
  "targets": [
    {
      "target_name": "SPG", 
      "sources": [
        "Main.cpp", "SpectrogramGenerator.cpp", "window.cpp"
      ],
      'libraries': ['-lfftw3', '-lm'],
      "cflags!": [ "-fno-exceptions", "-fopenmp"],
      "cflags": [ "-std=c++11", "-fopenmp"],
      "cflags_cc!": [ "-fno-exceptions", "-fopenmp"]
    }
  ]
}
